"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import bundledFunds from "@/data/funds.json";

type LangRec = Record<string, string>;
type Fund = { key: string; logo: string; logoVersion: string; knowMoreUrl: string; en: LangRec; ar: LangRec };
type FundsDoc = { updatedAt: string; funds: Fund[] };

const FIELD_ROWS: { key: string; label: string }[] = [
  { key: "inception", label: "Inception Date" },
  { key: "nominal", label: "Nominal Unit Value" },
  { key: "subscription", label: "Subscription" },
  { key: "redemption", label: "Redemption" },
  { key: "subFees", label: "Subscription Fees" },
  { key: "redFees", label: "Redemption Fees" },
  { key: "minSub", label: "Minimum Subscription" },
  { key: "maxSub", label: "Maximum Subscription" },
  { key: "distributions", label: "Distributions" },
];

const inputCls =
  "w-full h-11 px-4 rounded-xl border border-border/60 bg-secondary/20 font-sans text-[14px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all";
const microLabel = "block font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground/70 mb-1.5";

export default function AdminClient() {
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [doc, setDoc] = useState<FundsDoc>(bundledFunds as FundsDoc);
  const [activeKey, setActiveKey] = useState("gold");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [pendingLogos, setPendingLogos] = useState<Record<string, File>>({});
  const [logoPreviews, setLogoPreviews] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
    document.body.classList.remove("lang-ar");
    fetch("/api/admin/me").then((r) => { setAuthed(r.ok); setChecked(true); }).catch(() => setChecked(true));
    fetch("/api/funds").then((r) => r.json()).then((d) => { if (d?.funds?.length) setDoc(d); }).catch(() => {});
  }, []);

  const fund = doc.funds.find((f) => f.key === activeKey)!;

  function patchFund(key: string, patch: Partial<Fund>) {
    setDoc((d) => ({ ...d, funds: d.funds.map((f) => (f.key === key ? { ...f, ...patch } : f)) }));
    setDirty(true);
    setStatus(null);
  }
  function setField(key: string, lang: "en" | "ar", field: string, value: string) {
    setDoc((d) => ({
      ...d,
      funds: d.funds.map((f) => (f.key === key ? { ...f, [lang]: { ...f[lang], [field]: value } } : f)),
    }));
    setDirty(true);
    setStatus(null);
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    const data = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: data.get("username"), password: data.get("password") }),
    }).catch(() => null);
    setLoggingIn(false);
    if (res?.ok) setAuthed(true);
    else setLoginError("Invalid username or password.");
  }

  function onPickLogo(file: File | null) {
    if (!file) return;
    if (file.type !== "image/png") { setStatus({ kind: "err", text: "Logo must be a PNG file." }); return; }
    setPendingLogos((p) => ({ ...p, [activeKey]: file }));
    setLogoPreviews((p) => ({ ...p, [activeKey]: URL.createObjectURL(file) }));
    setDirty(true);
    setStatus(null);
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    try {
      let next = doc;
      for (const [key, file] of Object.entries(pendingLogos)) {
        const form = new FormData();
        form.set("key", key);
        form.set("file", file);
        const res = await fetch("/api/admin/logo", { method: "POST", body: form });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(body?.error || "Logo upload failed");
        next = { ...next, funds: next.funds.map((f) => (f.key === key ? { ...f, logo: body.logo, logoVersion: body.logoVersion } : f)) };
      }
      const res = await fetch("/api/admin/funds", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.error || "Save failed");
      setDoc({ ...next, updatedAt: body.updatedAt || next.updatedAt });
      setPendingLogos({});
      setDirty(false);
      setStatus({
        kind: "ok",
        text: Object.keys(pendingLogos).length
          ? "Saved. Text changes are live now; new logo files finish deploying in ~2 minutes."
          : "Saved. Changes are live on the website now.",
      });
    } catch (e: any) {
      setStatus({ kind: "err", text: e?.message || "Save failed — nothing was changed." });
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    setAuthed(false);
  }

  if (!checked) {
    return <div className="min-h-screen bg-background flex items-center justify-center font-sans text-muted-foreground">Loading…</div>;
  }

  /* ── Login ── */
  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-8">
            <Image src="/images/logo.png" alt="Mubasher Holding" width={400} height={174} className="h-12 w-auto dark:brightness-110" />
          </div>
          <form onSubmit={handleLogin} className="premium-card rounded-3xl p-8 space-y-5">
            <div>
              <h1 className="font-heading text-xl font-extrabold tracking-tight">Funds Admin</h1>
              <p className="font-sans text-[13px] text-muted-foreground mt-1">Sign in to manage the funds section.</p>
            </div>
            <div>
              <label htmlFor="username" className={microLabel}>Username</label>
              <input id="username" name="username" autoComplete="username" required className={inputCls} />
            </div>
            <div>
              <label htmlFor="password" className={microLabel}>Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className={inputCls} />
            </div>
            {loginError && <p role="alert" className="font-sans text-[13px] font-semibold text-red-600">{loginError}</p>}
            <button type="submit" disabled={loggingIn} className="btn-primary w-full h-12 flex items-center justify-center text-[15px] disabled:opacity-60">
              {loggingIn ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── Editor ── */
  const logoSrc = logoPreviews[activeKey] || `${fund.logo}${fund.logoVersion ? `?v=${fund.logoVersion}` : ""}`;

  return (
    <div className="min-h-screen bg-background text-foreground pb-32">
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Image src="/images/logo.png" alt="Mubasher Holding" width={400} height={174} className="h-8 w-auto dark:brightness-110 shrink-0" />
            <div className="h-6 w-px bg-border/60" />
            <h1 className="font-heading text-[15px] font-extrabold tracking-tight truncate">Funds Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block font-sans text-[11px] text-muted-foreground/70">
              Last saved: {new Date(doc.updatedAt).toLocaleString("en-GB")}
            </span>
            <button onClick={handleLogout} className="font-sans text-[13px] font-bold text-muted-foreground hover:text-red-600 transition-colors">
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-8">
        {/* Fund tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {doc.funds.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveKey(f.key)}
              aria-pressed={f.key === activeKey}
              className={`flex items-center gap-2.5 h-11 ps-2 pe-4 rounded-full border font-sans text-[13px] font-bold transition-all ${
                f.key === activeKey
                  ? "border-blue-600 bg-blue-500/10 text-blue-700 dark:text-blue-300"
                  : "border-border/60 bg-secondary/20 text-muted-foreground hover:border-blue-400/60 hover:text-foreground"
              }`}
            >
              <span className="w-7 h-7 rounded-lg bg-white p-0.5 border border-border/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoPreviews[f.key] || f.logo} alt="" className="w-full h-full object-contain" />
              </span>
              {f.en.name}
              {pendingLogos[f.key] && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Logo pending save" />}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6 items-start">
          {/* Identity panel */}
          <div className="space-y-6">
            <section className="premium-card rounded-3xl p-6">
              <h2 className="font-heading text-[13px] font-black tracking-[0.2em] uppercase text-muted-foreground/70 mb-5">Identity & Logo</h2>
              <div className="flex items-center gap-4 mb-5">
                <span className="w-20 h-20 rounded-2xl bg-white border border-border/50 p-2 flex items-center justify-center shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoSrc} alt="" className="w-full h-full object-contain" />
                </span>
                <div>
                  <button type="button" onClick={() => fileRef.current?.click()} className="font-sans text-[13px] font-bold text-blue-600 hover:underline underline-offset-4">
                    Replace logo…
                  </button>
                  <p className="font-sans text-[11px] text-muted-foreground mt-1">PNG, square, up to 2MB.</p>
                  <input ref={fileRef} type="file" accept="image/png" className="hidden" onChange={(e) => onPickLogo(e.target.files?.[0] ?? null)} />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={microLabel}>Name — English</label>
                  <input className={inputCls} value={fund.en.name} onChange={(e) => setField(fund.key, "en", "name", e.target.value)} />
                </div>
                <div>
                  <label className={microLabel}>Name — Arabic</label>
                  <input dir="rtl" className={inputCls} value={fund.ar.name} onChange={(e) => setField(fund.key, "ar", "name", e.target.value)} />
                </div>
                <div>
                  <label className={microLabel}>Know More link (https://…)</label>
                  <input dir="ltr" placeholder="Empty = link to Contact section" className={inputCls} value={fund.knowMoreUrl} onChange={(e) => patchFund(fund.key, { knowMoreUrl: e.target.value })} />
                </div>
              </div>
            </section>

            {/* Unit price panel */}
            <section className="rounded-3xl border-2 border-blue-500/40 bg-blue-500/[0.06] p-6">
              <h2 className="font-heading text-[13px] font-black tracking-[0.2em] uppercase text-blue-700 dark:text-blue-300 mb-1">
                Unit Price — سعر الوثيقة
              </h2>
              <p className="font-sans text-[11.5px] text-muted-foreground mb-5">Leave both fields empty to hide the price row on the website.</p>
              <div className="space-y-4">
                <div>
                  <label className={microLabel}>English (e.g. EGP 12.85)</label>
                  <input dir="ltr" className={inputCls} value={fund.en.unitPrice} onChange={(e) => setField(fund.key, "en", "unitPrice", e.target.value)} />
                </div>
                <div>
                  <label className={microLabel}>Arabic</label>
                  <input dir="rtl" className={inputCls} value={fund.ar.unitPrice} onChange={(e) => setField(fund.key, "ar", "unitPrice", e.target.value)} />
                </div>
              </div>
            </section>
          </div>

          {/* Fields table */}
          <section className="premium-card rounded-3xl p-6">
            <div className="grid grid-cols-[1fr_2fr_2fr] gap-3 items-center pb-3 mb-1 border-b border-border/50">
              <span className={microLabel + " !mb-0"}>Field</span>
              <span className={microLabel + " !mb-0"}>English</span>
              <span className={microLabel + " !mb-0"}>Arabic</span>
            </div>
            <div className="divide-y divide-border/30">
              {FIELD_ROWS.map((row) => (
                <div key={row.key} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_2fr] gap-3 py-3 items-center">
                  <span className="font-sans text-[13px] font-semibold text-foreground/80">{row.label}</span>
                  <input className={inputCls} value={fund.en[row.key] ?? ""} onChange={(e) => setField(fund.key, "en", row.key, e.target.value)} />
                  <input dir="rtl" className={inputCls} value={fund.ar[row.key] ?? ""} onChange={(e) => setField(fund.key, "ar", row.key, e.target.value)} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Save bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-background/90 backdrop-blur-xl border-t border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <div className="font-sans text-[13px] min-w-0 truncate">
            {status ? (
              <span className={status.kind === "ok" ? "text-emerald-600 font-bold" : "text-red-600 font-bold"} role="status">
                {status.text}
              </span>
            ) : dirty ? (
              <span className="text-amber-600 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> Unsaved changes
              </span>
            ) : (
              <span className="text-muted-foreground/70">All changes saved</span>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={!dirty || saving}
            className="btn-primary h-12 px-10 flex items-center justify-center text-[15px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save & Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
