"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight, ArrowUpRight, BarChart3, Globe, Shield, Zap, TrendingUp, Users, Award, ChevronDown, Menu, X } from "lucide-react";

/* ─── Custom Cursor ─── */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (dot.current) {
        dot.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${x - 18}px, ${y - 18}px)`;
      }
    };
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);
    window.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a,button,[data-hover]").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className={`cursor-ring ${hovering ? "hover" : ""}`} />
    </>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Services", "About", "Insights", "Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "glass shadow-xl shadow-black/20 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="group flex items-center gap-2.5 no-underline" style={{cursor:"none"}}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-sm font-heading">M</span>
            </div>
            <span className="font-heading font-bold text-base tracking-tight text-foreground">
              Mubasher<span className="text-accent">.</span>Capital
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a href="#contact" className="btn-primary hidden md:inline-flex text-sm" style={{cursor:"none"}}>
              Client Portal <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden p-2 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
              style={{cursor:"none"}}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[99] glass pt-24 px-6 flex flex-col md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="nav-link text-2xl font-heading font-bold py-5 border-b border-border/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)}
                style={{cursor:"none"}}
              >
                {l}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="btn-primary mt-8 self-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{cursor:"none"}}
            >
              Client Portal <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Hero Section ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-28 overflow-hidden noise">
      {/* Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-blue-600/20 blob animate-pulse-glow" />
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-accent/15 blob blob-2 animate-pulse-glow delay-200" />
        <div className="absolute bottom-[15%] left-[30%] w-[350px] h-[350px] bg-blue-800/15 blob blob-3" />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-40" />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.12),transparent)]" />
      </motion.div>

      {/* Top line decoration */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent origin-left"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-sans text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
            Global Capital Excellence Since 2000
          </span>
        </motion.div>

        {/* Title */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="font-heading text-[clamp(3.5rem,9vw,8rem)] font-extrabold leading-[1.0] tracking-[-0.04em]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Elevating
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="font-heading text-[clamp(3.5rem,9vw,8rem)] font-extrabold leading-[1.0] tracking-[-0.04em] text-gradient-main"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            Strategic
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            className="font-heading text-[clamp(3.5rem,9vw,8rem)] font-extrabold leading-[1.0] tracking-[-0.04em]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
          >
            Growth.
          </motion.h1>
        </div>

        <motion.p
          className="font-sans text-[clamp(1rem,2vw,1.25rem)] text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          World-class investment strategies, institutional-grade advisory, and precision capital management — engineered for the modern global enterprise.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
        >
          <a href="#services" className="btn-primary text-sm">
            Explore Services <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#about" className="btn-outline text-sm">
            Our Story
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <span className="font-sans text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </motion.div>
    </section>
  );
}

/* ─── Stats Bar ─── */
const stats = [
  { value: "$4.2B+", label: "Assets Under Management" },
  { value: "80+", label: "Global Markets" },
  { value: "25Y+", label: "Market Expertise" },
  { value: "99.9%", label: "Platform Uptime" },
];

function StatsBar() {
  return (
    <section className="relative z-10 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className={`py-10 px-8 text-center ${i < 3 ? "border-r border-border/50" : ""} ${i < 2 ? "border-b md:border-b-0 border-border/50" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-gradient-blue mb-1">{s.value}</div>
            <div className="font-sans text-xs text-muted-foreground tracking-wide">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Services ─── */
const services = [
  {
    icon: Globe,
    title: "Global Markets Access",
    desc: "Direct routing across 80+ international exchanges with sub-millisecond execution and institutional-grade infrastructure.",
    wide: true,
    accent: "blue",
  },
  { icon: Shield, title: "Institutional Security", desc: "Bank-grade encryption and multi-layered custody solutions protecting every position.", wide: false, accent: "green" },
  { icon: BarChart3, title: "Advanced Analytics", desc: "AI-powered market intelligence and quantitative modeling at your fingertips.", wide: false, accent: "blue" },
  { icon: Zap, title: "HFT Infrastructure", desc: "Co-located servers for ultra-low latency execution at any scale.", wide: false, accent: "green" },
  { icon: TrendingUp, title: "Portfolio Strategy", desc: "Disciplined alpha generation frameworks aligned with your risk profile.", wide: false, accent: "blue" },
];

function Services() {
  return (
    <section id="services" className="relative py-32 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Services</span>
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight mt-2 mb-4">
            Unparalleled Expertise
          </h2>
          <p className="font-sans text-muted-foreground text-lg max-w-lg leading-relaxed">
            Comprehensive financial solutions engineered for scalability, security, and market dominance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[260px]">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                className={`premium-card rounded-2xl p-8 relative overflow-hidden group flex flex-col justify-between ${s.wide ? "md:col-span-2" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
                data-hover
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${
                  s.accent === "blue"
                    ? "bg-gradient-to-br from-blue-600/8 via-transparent to-transparent"
                    : "bg-gradient-to-br from-emerald-600/8 via-transparent to-transparent"
                }`} />

                {/* Corner glow */}
                <div className={`absolute -right-12 -bottom-12 w-48 h-48 rounded-full blur-[60px] transition-opacity duration-700 opacity-0 group-hover:opacity-100 ${
                  s.accent === "blue" ? "bg-blue-600/20" : "bg-emerald-500/20"
                }`} />

                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-auto ${
                  s.accent === "blue" ? "bg-blue-500/10 text-blue-400" : "bg-emerald-500/10 text-emerald-400"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <h3 className={`font-heading font-bold tracking-tight mb-2 ${s.wide ? "text-2xl" : "text-lg"}`}>{s.title}</h3>
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>

                {/* Arrow */}
                <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── About ─── */
const values = [
  { icon: TrendingUp, title: "Performance", desc: "Consistent alpha generation through disciplined, data-driven investment frameworks." },
  { icon: Users, title: "Partnership", desc: "A dedicated team fully aligned with your long-term financial objectives." },
  { icon: Award, title: "Excellence", desc: "Decades of expertise across global capital markets and diverse asset classes." },
];

function About() {
  return (
    <section id="about" className="relative py-32 px-6 z-10 overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-800/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="section-label">About</span>
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight mt-2 mb-6 leading-[1.05]">
            Built on Trust.<br />Driven by Results.
          </h2>
          <p className="font-sans text-muted-foreground text-lg leading-relaxed mb-8">
            For over two decades, Mubasher Capital Holding has been the trusted partner for institutions and high-net-worth individuals seeking disciplined capital management and strategic growth across global markets.
          </p>
          <a href="#contact" className="btn-ghost">
            Our Full Story <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="flex flex-col gap-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                className="premium-card rounded-2xl p-6 flex items-start gap-5 group"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                viewport={{ once: true }}
                data-hover
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Icon className="w-4.5 h-4.5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base mb-1">{v.title}</h3>
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Marquee ─── */
const partners = ["Goldman Sachs", "Morgan Stanley", "BlackRock", "Vanguard", "Fidelity", "JPMorgan", "Citigroup", "HSBC", "Deutsche Bank", "UBS"];

function MarqueeBand() {
  const doubled = [...partners, ...partners];
  return (
    <section className="relative py-10 border-y border-border/30 overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      <div className="marquee-track">
        {doubled.map((p, i) => (
          <span key={i} className="font-sans text-sm font-semibold text-muted-foreground/50 tracking-wider uppercase shrink-0">
            {p}
            <span className="mx-6 text-border">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section id="contact" className="relative py-40 px-6 z-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 grid-overlay opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="section-label justify-center">Get Started</span>
          <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-tight mt-2 mb-6">
            Ready to Elevate<br />
            <span className="text-gradient-blue">Your Portfolio?</span>
          </h2>
          <p className="font-sans text-muted-foreground text-lg mb-12 max-w-lg mx-auto leading-relaxed">
            Connect with our advisory team and discover how Mubasher Capital can accelerate your financial goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:advisory@mubashercapital.com" className="btn-primary">
              Schedule Consultation <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#services" className="btn-outline">
              Explore Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
const footerLinks = [
  { title: "Company", links: ["About", "Leadership", "Careers", "Press"] },
  { title: "Services", links: ["Asset Management", "Advisory", "Markets", "Research"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Regulatory", "Disclosures"] },
];

function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm font-heading">M</span>
              </div>
              <span className="font-heading font-bold text-base">Mubasher<span className="text-accent">.</span>Capital</span>
            </div>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              Premium corporate financial services, delivering world-class capital strategies since 2000.
            </p>
          </div>
          {footerLinks.map(col => (
            <div key={col.title}>
              <h4 className="font-sans text-xs font-bold tracking-[0.12em] uppercase text-muted-foreground mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors duration-200" style={{cursor:"none"}}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-sans">
          <span>&copy; {new Date().getFullYear()} Mubasher Capital Holding. All rights reserved.</span>
          <span>Regulated and compliant across all operating jurisdictions.</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Export ─── */
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Cursor />
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <MarqueeBand />
      <About />
      <CTA />
      <Footer />
    </div>
  );
}
