import { readFundsFromGitHub } from "@/lib/admin";
import bundledFunds from "@/data/funds.json";

export const dynamic = "force-dynamic";

/* Public: live funds content. Reads the repo (the content store) so admin
   saves are visible immediately; falls back to the build-time copy. */
export async function GET() {
  try {
    const doc = await readFundsFromGitHub();
    if (doc) {
      return Response.json(doc, { headers: { "Cache-Control": "no-store" } });
    }
  } catch {
    // fall through to the bundled copy
  }
  return Response.json(bundledFunds, { headers: { "Cache-Control": "no-store" } });
}
