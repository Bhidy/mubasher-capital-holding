/* Server-side helpers for the funds admin: session cookie signing and the
   GitHub-backed content store. The repo is the database — every save is a
   commit on GITHUB_BRANCH, giving a full audit trail of content changes. */

import { createHmac, timingSafeEqual, createHash } from "node:crypto";

const SESSION_COOKIE = "mch_admin";
const SESSION_TTL_S = 12 * 60 * 60; // 12 hours

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not configured");
  return s;
}

export function sessionCookieName() {
  return SESSION_COOKIE;
}

export function createSessionToken(): { token: string; maxAge: number } {
  const exp = String(Math.floor(Date.now() / 1000) + SESSION_TTL_S);
  const sig = createHmac("sha256", secret()).update(exp).digest("hex");
  return { token: `${exp}.${sig}`, maxAge: SESSION_TTL_S };
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Math.floor(Date.now() / 1000)) return false;
  const expected = createHmac("sha256", secret()).update(exp).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/* Constant-time credential check: compare SHA-256 digests so lengths match. */
export function checkCredentials(user: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) return false;
  const h = (v: string) => createHash("sha256").update(v).digest();
  const userOk = timingSafeEqual(h(user), h(expectedUser));
  const passOk = timingSafeEqual(h(password), h(expectedPass));
  return userOk && passOk;
}

/* ── GitHub content store ── */

const FUNDS_PATH = "src/data/funds.json";

function ghConfig() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not configured");
  const repo = process.env.GITHUB_REPO || "Bhidy/mubasher-capital-holding";
  const branch = process.env.GITHUB_BRANCH || "main";
  return { token, repo, branch };
}

function ghHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "mubasher-funds-admin",
  };
}

export async function ghReadFile(path: string): Promise<{ contentBase64: string; sha: string } | null> {
  const { token, repo, branch } = ghConfig();
  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`,
    { headers: ghHeaders(token), cache: "no-store" }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub read failed (${res.status})`);
  const body = await res.json();
  return { contentBase64: (body.content || "").replace(/\n/g, ""), sha: body.sha };
}

export async function ghWriteFile(path: string, contentBase64: string, message: string): Promise<void> {
  const { token, repo, branch } = ghConfig();
  const existing = await ghReadFile(path);
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: { ...ghHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      branch,
      content: contentBase64,
      ...(existing ? { sha: existing.sha } : {}),
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub write failed (${res.status}): ${text.slice(0, 200)}`);
  }
}

export async function readFundsFromGitHub(): Promise<unknown | null> {
  const file = await ghReadFile(FUNDS_PATH);
  if (!file) return null;
  return JSON.parse(Buffer.from(file.contentBase64, "base64").toString("utf8"));
}

export async function writeFundsToGitHub(doc: unknown): Promise<void> {
  const json = JSON.stringify(doc, null, 2) + "\n";
  await ghWriteFile(FUNDS_PATH, Buffer.from(json, "utf8").toString("base64"), "cms: update funds content");
}

/* ── Validation ── */

export const FUND_KEYS = ["gold", "silver", "dollar", "cash", "equity"] as const;
export const FIELD_KEYS = [
  "name", "unitPrice", "inception", "nominal", "subscription", "redemption",
  "subFees", "redFees", "minSub", "maxSub", "distributions",
] as const;

function cleanString(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const s = v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  return s.length <= max ? s : null;
}

/* Returns a normalized funds document, or null if the payload is invalid. */
export function validateFundsDoc(input: any): { updatedAt: string; funds: any[] } | null {
  if (!input || !Array.isArray(input.funds) || input.funds.length !== FUND_KEYS.length) return null;
  const seen = new Set<string>();
  const funds = [];
  for (const f of input.funds) {
    if (!f || !FUND_KEYS.includes(f.key) || seen.has(f.key)) return null;
    seen.add(f.key);
    const logo = cleanString(f.logo, 200);
    if (logo === null || !/^\/images\/funds\/[a-z0-9-]+\.(png|webp|jpg|jpeg)$/i.test(logo)) return null;
    const logoVersion = cleanString(f.logoVersion ?? "", 64);
    const knowMoreUrl = cleanString(f.knowMoreUrl ?? "", 300);
    if (logoVersion === null || knowMoreUrl === null) return null;
    if (knowMoreUrl !== "" && !/^https:\/\/[^\s]+$/i.test(knowMoreUrl)) return null;
    const langs: Record<string, Record<string, string>> = {};
    for (const lang of ["en", "ar"] as const) {
      const rec = f[lang];
      if (!rec || typeof rec !== "object") return null;
      const out: Record<string, string> = {};
      for (const field of FIELD_KEYS) {
        const v = cleanString(rec[field] ?? "", 200);
        if (v === null) return null;
        out[field] = v;
      }
      if (!out.name) return null;
      langs[lang] = out;
    }
    funds.push({ key: f.key, logo, logoVersion, knowMoreUrl, en: langs.en, ar: langs.ar });
  }
  return { updatedAt: new Date().toISOString(), funds };
}
