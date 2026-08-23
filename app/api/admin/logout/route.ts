import { cookies } from "next/headers";
import { sessionCookieName } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function POST() {
  const store = await cookies();
  store.set(sessionCookieName(), "", { httpOnly: true, path: "/", maxAge: 0 });
  return Response.json({ ok: true });
}
