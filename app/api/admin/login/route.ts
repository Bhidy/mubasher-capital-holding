import { cookies } from "next/headers";
import { checkCredentials, createSessionToken, sessionCookieName } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  const user = typeof body?.username === "string" ? body.username : "";
  const pass = typeof body?.password === "string" ? body.password : "";

  if (!checkCredentials(user, pass)) {
    // Blunt brute-force damper: constant response with a small fixed delay.
    await new Promise((r) => setTimeout(r, 800));
    return Response.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const { token, maxAge } = createSessionToken();
  const store = await cookies();
  store.set(sessionCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return Response.json({ ok: true });
}
