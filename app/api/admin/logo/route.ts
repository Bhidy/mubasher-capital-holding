import { cookies } from "next/headers";
import { FUND_KEYS, ghWriteFile, sessionCookieName, verifySessionToken } from "@/lib/admin";

export const dynamic = "force-dynamic";

const MAX_BYTES = 2 * 1024 * 1024; // 2MB

/* Uploads a fund logo: commits the PNG to public/images/funds/<key>.png.
   The new file is served after the automatic redeploy (~2 minutes). */
export async function POST(request: Request) {
  const store = await cookies();
  if (!verifySessionToken(store.get(sessionCookieName())?.value)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const key = form.get("key");
  const file = form.get("file");

  if (typeof key !== "string" || !(FUND_KEYS as readonly string[]).includes(key)) {
    return Response.json({ error: "Unknown fund" }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return Response.json({ error: "Missing file" }, { status: 400 });
  }
  if (file.type !== "image/png") {
    return Response.json({ error: "Logo must be a PNG image" }, { status: 415 });
  }
  if (file.size === 0 || file.size > MAX_BYTES) {
    return Response.json({ error: "Logo must be between 1 byte and 2MB" }, { status: 413 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  // PNG magic number check — don't trust the declared MIME type alone.
  if (!(bytes.length > 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47)) {
    return Response.json({ error: "File is not a valid PNG" }, { status: 415 });
  }

  const path = `public/images/funds/${key}.png`;
  try {
    await ghWriteFile(path, bytes.toString("base64"), `cms: update ${key} fund logo`);
  } catch (e: any) {
    return Response.json({ error: `Upload failed: ${e?.message || "unknown error"}` }, { status: 502 });
  }
  const version = Date.now().toString(36);
  return Response.json({ ok: true, logo: `/images/funds/${key}.png`, logoVersion: version });
}
