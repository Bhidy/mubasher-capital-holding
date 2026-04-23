"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  ArrowRight, 
  ArrowUpRight, 
  BarChart3, 
  Globe, 
  Shield, 
  Zap, 
  TrendingUp, 
  Users, 
  Award, 
  ChevronDown, 
  Menu, 
  X,
  Briefcase,
  Layers,
  Search,
  MessageSquare,
  Scale,
  Handshake,
  Heart
} from "lucide-react";

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
  const links = ["Services", "About", "Track Record", "Team", "News", "Contact"];

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
          scrolled ? "glass shadow-xl shadow-black/10 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="group flex items-center gap-2.5 no-underline" style={{cursor:"none"}}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-lg font-heading">M</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-extrabold text-lg tracking-tight text-foreground">
                MUBASHER
              </span>
              <span className="font-heading font-medium text-[10px] tracking-[0.3em] text-accent">
                CAPITAL
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="nav-link">{l}</a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a href="#contact" className="btn-primary hidden md:inline-flex text-xs h-10 px-6" style={{cursor:"none"}}>
              Client Portal
            </a>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="lg:hidden p-2 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
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
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-background flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg font-heading">M</span>
                </div>
                <span className="font-heading font-bold text-xl tracking-tight">Mubasher</span>
              </div>
              <button onClick={() => setMenuOpen(false)} className="p-2 border border-border rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l}
                  href={`#${l.toLowerCase().replace(" ", "-")}`}
                  className="font-heading text-3xl font-bold hover:text-blue-500 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {l}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto">
              <a href="#contact" className="btn-primary w-full py-4 text-center text-lg">
                Client Portal
              </a>
            </div>
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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-28 overflow-hidden noise">
      {/* Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-blue-600/15 blob animate-pulse-glow" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-emerald-500/10 blob blob-2 animate-pulse-glow delay-1000" />
        <div className="absolute inset-0 grid-overlay opacity-[0.03] dark:opacity-[0.07]" />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent,var(--background))]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-8 bg-blue-500" />
          <span className="font-sans text-[11px] font-bold tracking-[0.3em] text-blue-500 uppercase">
            Experience & Investment
          </span>
          <div className="h-px w-8 bg-blue-500" />
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h1
            className="font-heading text-[clamp(3.5rem,10vw,8.5rem)] font-extrabold leading-[0.95] tracking-[-0.05em]"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            YOUR TRUSTED<br />
            <span className="text-gradient-blue italic">FINANCIAL</span><br />
            ADVISOR
          </motion.h1>
        </div>

        <motion.p
          className="font-sans text-[clamp(1rem,2vw,1.35rem)] text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Mubasher Capital Holding provides unparalleled expertise in investment banking, asset management, and brokerage services across the Middle East.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#services" className="btn-primary min-w-[220px]">
            Explore Services <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#contact" className="btn-outline min-w-[220px]">
            Schedule Consultation
          </a>
        </motion.div>
      </div>

      {/* Stats Floating Overlay */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-12 md:gap-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="text-center">
          <div className="font-heading text-2xl md:text-4xl font-extrabold">6.6bn</div>
          <div className="font-sans text-[10px] tracking-[0.2em] text-muted-foreground uppercase mt-1">Assets Managed</div>
        </div>
        <div className="text-center">
          <div className="font-heading text-2xl md:text-4xl font-extrabold">48+</div>
          <div className="font-sans text-[10px] tracking-[0.2em] text-muted-foreground uppercase mt-1">Major Transactions</div>
        </div>
        <div className="text-center">
          <div className="font-heading text-2xl md:text-4xl font-extrabold">80+</div>
          <div className="font-sans text-[10px] tracking-[0.2em] text-muted-foreground uppercase mt-1">Global Markets</div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Services Section (Numbered Tiles) ─── */
const serviceList = [
  { id: "01", title: "Investment Banking", desc: "Expert advisory on mergers, acquisitions, and capital raising strategies.", icon: Briefcase, color: "blue" },
  { id: "02", title: "Asset Management", desc: "Tailored investment portfolios designed for institutional and private clients.", icon: TrendingUp, color: "emerald" },
  { id: "03", title: "Custody Services", desc: "Secure and transparent safe-keeping solutions for your global assets.", icon: Shield, color: "blue" },
  { id: "04", title: "Research & Analysis", desc: "In-depth market intelligence and quantitative research to guide decision-making.", icon: Search, color: "emerald" },
  { id: "05", title: "Securities Brokerage", desc: "High-performance execution and direct market access across global exchanges.", icon: Zap, color: "blue" },
];

function Services() {
  return (
    <section id="services" className="py-32 px-6 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="section-label justify-center">Mubasher Services</span>
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-tight mt-4">
            Comprehensive Financial Solutions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                className={`premium-card p-10 rounded-[2.5rem] flex flex-col h-[400px] group relative overflow-hidden`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                data-hover
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="font-heading text-5xl font-black text-foreground/5 group-hover:text-blue-500/20 transition-colors duration-500">
                    {s.id}
                  </span>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
                    s.color === "blue" ? "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white" : "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-auto">
                  <h3 className="font-heading text-2xl font-bold mb-4 group-hover:text-blue-500 transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                {/* Abstract background shape */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[80px] bg-blue-500/5 group-hover:bg-blue-500/15 transition-all duration-700" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── About Section (Egyptian Focus) ─── */
function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 bg-secondary/30 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Institutional Banking</span>
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-tight mt-4 mb-8 leading-[1.1]">
            Investment banking firm serving clients in <span className="text-blue-500">Egypt</span> and the <span className="text-emerald-500">Middle East</span>
          </h2>
          <p className="font-sans text-muted-foreground text-lg leading-relaxed mb-8">
            Mubasher Capital is a leading regional investment bank with a footprint across Cairo, Dubai, and Riyadh. We provide high-impact advisory services, combining deep local knowledge with international execution standards.
          </p>
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <div className="font-heading text-3xl font-bold text-foreground">25Y+</div>
              <div className="font-sans text-xs tracking-wider text-muted-foreground uppercase mt-1">Operational Excellence</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-bold text-foreground">500+</div>
              <div className="font-sans text-xs tracking-wider text-muted-foreground uppercase mt-1">Institutional Clients</div>
            </div>
          </div>
          <a href="#contact" className="btn-primary">Learn More About Us</a>
        </motion.div>

        <motion.div
          className="lg:w-1/2 grid grid-cols-2 gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-border/50 overflow-hidden relative">
            <div className="absolute inset-0 grid-overlay opacity-20" />
            <div className="absolute bottom-6 left-6 font-heading font-bold text-xl">Cairo</div>
          </div>
          <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-emerald-500/20 to-emerald-700/10 border border-border/50 mt-12 overflow-hidden relative">
            <div className="absolute inset-0 grid-overlay opacity-20" />
            <div className="absolute bottom-6 left-6 font-heading font-bold text-xl">Dubai</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Track Record Section (Logos/Transactions) ─── */
const transactions = [
  { company: "Coca-Cola", label: "Bottling Group", year: "2023", value: "$450M" },
  { company: "Gulf Capital", label: "Strategic Exit", year: "2022", value: "$1.2B" },
  { company: "Almarai", label: "Capital Raising", year: "2023", value: "$800M" },
  { company: "MinaPharm", label: "M&A Advisory", year: "2021", value: "$200M" },
  { company: "Indorama", label: "Investment", year: "2022", value: "$600M" },
  { company: "Palm Hills", label: "Debt Restructuring", year: "2023", value: "$300M" },
];

function TrackRecord() {
  return (
    <section id="track-record" className="py-32 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="section-label">Success Stories</span>
            <h2 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight mt-2">Track Record</h2>
          </div>
          <p className="font-sans text-muted-foreground max-w-sm">
            Proven history of high-value transactions across diverse industries and markets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {transactions.map((t, i) => (
            <motion.div
              key={t.company}
              className="premium-card p-8 rounded-3xl group border border-border/40 hover:bg-secondary/50 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              data-hover
            >
              <div className="flex justify-between items-center mb-6">
                <div className="font-heading text-2xl font-black text-blue-500/20 group-hover:text-blue-500 transition-colors duration-300">
                  {t.company}
                </div>
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground/60 uppercase">{t.year}</span>
              </div>
              <div className="font-heading text-xl font-bold mb-1">{t.label}</div>
              <div className="font-sans text-blue-500 font-bold">{t.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Team Section ─── */
const leaders = [
  { name: "Hany Genena", role: "Chief Economist", id: 1 },
  { name: "Marianne Ghali", role: "Head of Asset Management", id: 2 },
  { name: "Mohamed Gouda", role: "Head of Brokerage", id: 3 },
  { name: "Amr Helal", role: "Managing Director", id: 4 },
];

function Team() {
  return (
    <section id="team" className="py-32 px-6 bg-secondary/20 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="section-label justify-center">Leadership</span>
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight mt-4">Our People</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((p, i) => (
            <motion.div
              key={p.name}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-b from-blue-600/10 to-blue-900/20 border border-border/50 overflow-hidden mb-6 group-hover:border-blue-500/50 transition-all duration-500">
                <div className="absolute inset-0 flex items-center justify-center">
                   <Users className="w-16 h-16 text-blue-500/20 group-hover:scale-110 transition-transform duration-700" />
                </div>
                {/* Overlay Name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                   <div className="font-heading font-bold text-white text-xl">{p.name}</div>
                   <div className="font-sans text-blue-400 text-sm">{p.role}</div>
                </div>
              </div>
              <div className="text-center group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="font-heading font-bold text-xl mb-1">{p.name}</h3>
                <p className="font-sans text-muted-foreground text-sm uppercase tracking-widest">{p.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Values Section ─── */
const valueItems = [
  { id: "01", title: "Integrity", desc: "Honesty and transparency are the cornerstones of every relationship we build.", icon: Scale },
  { id: "02", title: "Balance", desc: "Strategic equilibrium between risk management and performance optimization.", icon: Layers },
  { id: "03", title: "Professionalism", desc: "Upholding the highest standards of financial conduct and expertise.", icon: Award },
  { id: "04", title: "Loyalty", desc: "Uwavering commitment to our partners and their long-term prosperity.", icon: Heart },
];

function Values() {
  return (
    <section className="py-32 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Our Philosophy</span>
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight mt-4">Corporate Values</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {valueItems.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.id}
                className="group flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-heading font-black text-2xl text-foreground/10 group-hover:text-blue-500 transition-colors duration-500">{v.id}</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-4">{v.title}</h3>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Banner ─── */
function CTA() {
  return (
    <section id="contact" className="relative py-40 px-6 z-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute inset-0 grid-overlay opacity-[0.05]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="section-label justify-center">Join Our Network</span>
          <h2 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold tracking-tight mt-4 mb-8">
            Elevate Your <br />
            <span className="text-gradient-blue italic">Financial Strategy</span>
          </h2>
          <p className="font-sans text-muted-foreground text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Subscribe to our newsletter for exclusive market insights or contact our advisory board directly.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-10">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-secondary/50 border border-border/50 rounded-full px-6 py-4 outline-none focus:border-blue-500/50 transition-colors"
            />
            <button className="btn-primary whitespace-nowrap px-8">Subscribe</button>
          </div>

          <div className="flex justify-center gap-8 text-sm font-bold text-blue-500">
            <a href="mailto:info@mubashercapital.com" className="hover:opacity-70 transition-opacity">Contact Advisory</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Investor Relations</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const footerLinks = [
    { title: "Business Areas", links: ["Investment Banking", "Asset Management", "Brokerage", "Research", "Custody"] },
    { title: "Company", links: ["About Us", "Our People", "News & Insights", "Careers", "Contact"] },
    { title: "Legal & Regulatory", links: ["Privacy Policy", "Terms of Use", "FRA Disclosures", "Cookie Policy"] },
  ];

  return (
    <footer className="relative z-10 bg-background border-t border-border/40 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2.5 mb-8 no-underline">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl font-heading">M</span>
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight">Mubasher<span className="text-blue-500">.</span>Capital</span>
            </a>
            <p className="font-sans text-muted-foreground text-lg leading-relaxed max-w-sm mb-8">
              Your regional gateway to global financial excellence. Regulated by the Financial Regulatory Authority.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:border-blue-500 transition-all duration-300">
                    <Globe className="w-4 h-4" />
                 </div>
               ))}
            </div>
          </div>
          {footerLinks.map(col => (
            <div key={col.title}>
              <h4 className="font-heading font-bold text-sm tracking-widest uppercase mb-8 text-foreground">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="font-sans text-muted-foreground hover:text-blue-500 transition-colors duration-200" style={{cursor:"none"}}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-[0.2em] font-bold text-muted-foreground/60 uppercase">
          <span>&copy; {new Date().getFullYear()} Mubasher Capital Holding. All rights reserved.</span>
          <div className="flex gap-10">
            <span>Cairo</span>
            <span>Dubai</span>
            <span>Riyadh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Export ─── */
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
      <Cursor />
      <Navbar />
      <Hero />
      <Services />
      <AboutSection />
      <TrackRecord />
      <Team />
      <Values />
      <CTA />
      <Footer />
    </div>
  );
}
