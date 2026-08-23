"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer, translations } from "../page";
import { legalContent, type LegalBlock, type LegalSlug } from "./content";

const num2 = (n: number) => String(n + 1).padStart(2, "0");

function Blocks({ blocks, lang }: { blocks: LegalBlock[]; lang: string }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="font-sans text-muted-foreground text-[16px] lg:text-[17px] leading-[1.85] [text-wrap:pretty]">
                {b.text}
              </p>
            );
          case "note":
            return (
              <div key={i} className="rounded-xl border-s-2 border-blue-600 bg-blue-500/5 px-5 py-4">
                <p className="font-sans text-foreground/85 text-[15px] lg:text-[16px] leading-relaxed font-medium [text-wrap:pretty]">{b.text}</p>
              </div>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-3.5">
                {b.items.map((item) => (
                  <li key={item.slice(0, 40)} className="flex items-start gap-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-[0.72em] shrink-0" />
                    <span className="font-sans text-muted-foreground text-[15px] lg:text-[16px] leading-[1.8] [text-wrap:pretty]">{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "kv":
            return (
              <dl key={i} className="rounded-2xl border border-border/60 bg-secondary/15 divide-y divide-border/50 overflow-hidden">
                {b.rows.map((row) => (
                  <div key={row.k} className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-8 px-5 lg:px-7 py-4">
                    <dt className="sm:w-52 shrink-0 font-sans text-[11px] font-bold tracking-[0.14em] uppercase text-muted-foreground/70">{row.k}</dt>
                    <dd className="font-sans text-[15px] lg:text-[16px] font-medium text-foreground leading-relaxed">
                      {row.href ? (
                        <a href={row.href} target="_blank" rel="noopener noreferrer" dir={row.ltr ? "ltr" : undefined} className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 break-all">
                          {row.v}
                        </a>
                      ) : (
                        <span dir={row.ltr ? "ltr" : undefined} className="inline-block">{row.v}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            );
          case "table":
            return (
              <div key={i} className="rounded-2xl border border-border/60 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] border-collapse text-start">
                    <thead>
                      <tr className="bg-secondary/50">
                        {b.head.map((h) => (
                          <th key={h} scope="col" className="text-start font-sans text-[11px] font-bold tracking-[0.14em] uppercase text-muted-foreground px-5 lg:px-6 py-4">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row, ri) => (
                        <tr key={ri} className="border-t border-border/50 align-top">
                          {row.map((cell, ci) => (
                            <td key={ci} className={`px-5 lg:px-6 py-4 font-sans text-[14px] lg:text-[15px] leading-relaxed ${ci === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          case "sub":
            return (
              <div key={i} className="space-y-5 pt-2">
                <h3 className="flex items-center gap-3 font-heading text-lg lg:text-xl font-bold text-foreground">
                  <span className="w-6 h-[3px] rounded-full bg-blue-600 shrink-0" />
                  {b.title}
                </h3>
                <div className="space-y-5 ps-9">
                  <Blocks blocks={b.blocks} lang={lang} />
                </div>
              </div>
            );
          case "cards":
            return (
              <div key={i} className="grid sm:grid-cols-2 gap-4">
                {b.items.map((card, ci) => (
                  <div key={card.title} className="rounded-2xl border border-border/60 bg-secondary/15 p-6 hover:border-blue-500/40 transition-colors duration-300">
                    <span className="inline-flex w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 items-center justify-center font-heading text-xs font-black mb-4" dir="ltr">
                      {num2(ci)}
                    </span>
                    <h4 className="font-heading text-[15px] lg:text-base font-bold text-foreground mb-2 leading-snug">{card.title}</h4>
                    <p className="font-sans text-muted-foreground text-[13.5px] lg:text-[14px] leading-relaxed [text-wrap:pretty]">{card.text}</p>
                  </div>
                ))}
              </div>
            );
          case "links":
            return (
              <div key={i} className="space-y-3">
                {b.items.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-secondary/15 px-5 lg:px-6 py-4 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
                  >
                    <span className="font-sans text-[15px] font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{link.label}</span>
                    <ArrowUpRight className={`w-5 h-5 shrink-0 text-muted-foreground group-hover:text-blue-500 transition-all duration-300 group-hover:-translate-y-0.5 ${lang === "ar" ? "-scale-x-100" : ""}`} />
                  </a>
                ))}
              </div>
            );
        }
      })}
    </>
  );
}

export default function LegalPage({ slug }: { slug: LegalSlug }) {
  const [lang, setLang] = useState("ar");
  const [active, setActive] = useState<string>("");
  const reduceMotion = useReducedMotion();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const doc = legalContent[slug][lang as "en" | "ar"];
  const t = translations[lang as keyof typeof translations];

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "en" || q === "ar") setLang(q);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("lang-ar", lang === "ar");
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  const homeHref = lang === "en" ? "/?lang=en" : "/";
  const enterAnim = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
      {/* ── Minimal header ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between gap-4">
          <a href={homeHref} className="group flex items-center no-underline outline-none shrink-0">
            <Image
              src="/images/logo.png"
              alt="Mubasher Holding"
              width={400}
              height={174}
              loading="eager"
              className="h-9 md:h-11 w-auto group-hover:scale-105 transition-transform duration-500 dark:brightness-110"
            />
          </a>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              aria-label={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
              className="w-9 h-9 rounded-full border border-border/50 bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300 font-heading"
            >
              {lang === "en" ? <span className="text-base font-bold leading-none relative -top-[1px]">ع</span> : <span className="text-[10px] font-black tracking-widest">EN</span>}
            </button>
            <ThemeToggle />
            <a
              href={homeHref}
              className="hidden sm:flex items-center gap-2 h-10 px-5 rounded-full border border-border/60 bg-secondary/30 font-sans text-[13px] font-bold text-foreground hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
            >
              <ArrowRight className={`w-4 h-4 ${lang === "ar" ? "" : "rotate-180"}`} />
              {doc.backHome}
            </a>
          </div>
        </div>
      </header>

      {/* ── Prospectus hero ── */}
      <section className="relative bg-blue-950 dark:bg-blue-950/60 overflow-hidden pt-32 md:pt-44 pb-16 md:pb-24 px-6">
        <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />
        <div className="absolute -top-40 -end-40 w-[480px] h-[480px] bg-blue-500/20 blur-[140px] rounded-full pointer-events-none" />
        <motion.div className="max-w-7xl mx-auto relative" {...enterAnim}>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-sans text-[12px] font-bold tracking-wide text-blue-200/60 mb-8">
            <a href={homeHref} className="hover:text-white transition-colors">{doc.breadcrumbHome}</a>
            <span aria-hidden="true" className="opacity-50">/</span>
            <span className="text-blue-100/90">{doc.title}</span>
          </nav>
          <span className="section-label">{doc.eyebrow}</span>
          <h1 className={`font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mt-5 mb-7 leading-[1.15] [text-wrap:balance] ${lang === "ar" ? "" : "tracking-tight"}`}>
            {doc.title}
          </h1>
          <p className="font-sans text-blue-100/75 text-base lg:text-lg leading-relaxed max-w-3xl [text-wrap:pretty]">{doc.intro}</p>
          <div className="flex flex-wrap gap-3 mt-9">
            {doc.meta.map((chip) => (
              <span key={chip} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-sans text-[12px] font-bold text-blue-50/90">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                {chip}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Document body ── */}
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-20">
        {/* TOC — desktop sidebar */}
        <aside className="hidden lg:block">
          <nav aria-label={doc.tocTitle} className="sticky top-32">
            <h2 className="font-heading text-[11px] font-black tracking-[0.3em] uppercase text-muted-foreground/60 mb-6">{doc.tocTitle}</h2>
            <ol className="space-y-1 border-s border-border/60">
              {doc.sections.map((s, i) => {
                const isActive = active === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative flex items-baseline gap-3 py-2 ps-5 -ms-px border-s-2 transition-all duration-300 ${
                        isActive
                          ? "border-blue-600 text-blue-600 dark:text-blue-400"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="font-heading text-[10px] font-black tabular-nums opacity-60" dir="ltr">{num2(i)}</span>
                      <span className={`font-sans text-[13px] leading-snug ${isActive ? "font-bold" : "font-medium"}`}>{s.title}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        {/* Content */}
        <main className="max-w-[74ch]">
          {/* TOC — mobile */}
          <details className="lg:hidden mb-10 rounded-2xl border border-border/60 bg-secondary/15 open:pb-3">
            <summary className="cursor-pointer list-none px-5 py-4 font-heading text-[11px] font-black tracking-[0.25em] uppercase text-muted-foreground flex items-center justify-between">
              {doc.tocTitle}
              <span aria-hidden="true" className="text-blue-500">+</span>
            </summary>
            <ol className="px-5 space-y-1">
              {doc.sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex items-baseline gap-3 py-1.5 text-muted-foreground hover:text-blue-600">
                    <span className="font-heading text-[10px] font-black tabular-nums opacity-60" dir="ltr">{num2(i)}</span>
                    <span className="font-sans text-[13.5px] font-medium leading-snug">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </details>

          <div className="space-y-16 md:space-y-20">
            {doc.sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                ref={(el) => { sectionRefs.current[s.id] = el; }}
                className="scroll-mt-32"
                aria-labelledby={`${s.id}-h`}
              >
                <div className="flex items-baseline gap-4 mb-7 pb-5 border-b border-border/50">
                  <span aria-hidden="true" className="font-heading text-4xl lg:text-5xl font-black leading-none text-foreground/[0.08] select-none" dir="ltr">
                    {num2(i)}
                  </span>
                  <h2 id={`${s.id}-h`} className={`font-heading text-xl md:text-2xl lg:text-[27px] font-extrabold text-foreground leading-tight [text-wrap:balance] ${lang === "ar" ? "" : "tracking-tight"}`}>
                    {s.title}
                  </h2>
                </div>
                <div className="space-y-5">
                  <Blocks blocks={s.blocks} lang={lang} />
                </div>
              </section>
            ))}
          </div>

          {/* Bottom back link */}
          <div className="mt-20 pt-10 border-t border-border/50">
            <a href={homeHref} className="inline-flex items-center gap-3 font-sans text-[14px] font-bold text-blue-600 dark:text-blue-400 hover:gap-4 transition-all duration-300">
              <ArrowRight className={`w-4 h-4 ${lang === "ar" ? "" : "rotate-180"}`} />
              {doc.backHome}
            </a>
          </div>
        </main>
      </div>

      <Footer t={t} lang={lang} />
    </div>
  );
}
