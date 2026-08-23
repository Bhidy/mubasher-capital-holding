import { cookies } from "next/headers";
import { sessionCookieName, verifySessionToken, validateFundsDoc, writeFundsToGitHub } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  const store = await cookies();
  if (!verifySessionToken(store.get(sessionCookieName())?.value)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const doc = validateFundsDoc(body);
  if (!doc) {
    return Response.json({ error: "Payload failed validation — no changes were saved" }, { status: 422 });
  }

  try {
    await writeFundsToGitHub(doc);
  } catch (e: any) {
    return Response.json({ error: `Save failed: ${e?.message || "unknown error"}` }, { status: 502 });
  }
  return Response.json({ ok: true, updatedAt: doc.updatedAt });
}
