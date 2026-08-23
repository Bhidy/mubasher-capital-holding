import { cookies } from "next/headers";
import { sessionCookieName, verifySessionToken } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = await cookies();
  const ok = verifySessionToken(store.get(sessionCookieName())?.value);
  return Response.json({ authenticated: ok }, { status: ok ? 200 : 401 });
}
