"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight, BarChart3, Globe, Shield, Zap, TrendingUp, Users, Award, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" as const },
  },
};

const stats = [
  { value: "$4.2B+", label: "Assets Under Management" },
  { value: "80+", label: "Global Markets" },
  { value: "25Y+", label: "Market Expertise" },
  { value: "99.9%", label: "Uptime Guarantee" },
];

const services = [
  {
    icon: Globe,
    title: "Global Markets Access",
    description: "Direct routing across 80+ international exchanges with sub-millisecond latency and institutional-grade execution.",
    span: "md:col-span-2 md:row-span-2",
    accent: true,
  },
  {
    icon: Shield,
    title: "Institutional Security",
    description: "Bank-grade encryption and multi-layered custody solutions protecting every transaction.",
    span: "",
    accent: false,
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "AI-driven market sentiment and quantitative modeling at your fingertips.",
    span: "",
    accent: false,
  },
  {
    icon: Zap,
    title: "High-Frequency Trading",
    description: "Co-located infrastructure for ultra-low latency execution at scale.",
    span: "md:col-span-2 lg:col-span-1",
    accent: false,
  },
];

const values = [
  { icon: TrendingUp, title: "Performance", description: "Consistent alpha generation through disciplined investment frameworks." },
  { icon: Users, title: "Partnership", description: "A dedicated team aligned with your long-term financial objectives." },
  { icon: Award, title: "Excellence", description: "Decades of expertise across global capital markets and asset classes." },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Floating Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-background/80 backdrop-blur-xl border-b border-border/40 transition-all duration-500">
        <div className="text-xl font-heading font-bold tracking-tighter">
          Mubasher<span className="text-accent">.</span>Capital
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {["Services", "About", "Insights", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="hover:text-foreground transition-colors duration-200 cursor-pointer">
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button className="rounded-full px-5 h-9 text-sm hidden md:inline-flex">
            Client Portal
          </Button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-24 overflow-hidden">
        {/* Background blobs */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 dark:bg-blue-600/15 rounded-full blur-[120px] animate-blob" />
          <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-accent/15 dark:bg-accent/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-foreground/5 rounded-full blur-[80px] animate-blob animation-delay-4000" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-secondary border border-border text-xs font-semibold tracking-widest text-muted-foreground mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              THE FUTURE OF CORPORATE FINANCE
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-[100px] font-heading font-extrabold tracking-tighter leading-[1.0] mb-6"
            variants={fadeUp} initial="hidden" animate="show"
          >
            Elevating<br />
            <span className="text-gradient">Strategic</span><br />
            Growth
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            variants={fadeUp} initial="hidden" animate="show"
          >
            World-class financial intelligence, institutional-grade advisory, and precision investment strategies — engineered for the modern enterprise.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeUp} initial="hidden" animate="show">
            <Button size="lg" className="rounded-full px-8 h-14 text-base shadow-lg shadow-accent/20 w-full sm:w-auto group">
              Explore Services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base bg-background/50 backdrop-blur-sm w-full sm:w-auto">
              Contact Advisory
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="relative z-10 border-y border-border bg-secondary/50 backdrop-blur-sm py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} className="text-center"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Services Bento Grid ── */}
      <section id="services" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-16" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">Services</span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter mb-4">Unparalleled Expertise</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Comprehensive financial solutions engineered for scalability, security, and market dominance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[280px]">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title}
                  className={`${service.span} rounded-3xl p-8 border border-border bg-card relative overflow-hidden group cursor-default`}
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                  whileHover={{ scale: 0.99, transition: { duration: 0.3 } }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-secondary flex items-center justify-center mb-auto">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className={`font-heading font-bold mb-2 ${service.accent ? "text-3xl" : "text-xl"}`}>{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-accent/20 transition-colors duration-700" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── About / Values ── */}
      <section id="about" className="relative z-10 py-32 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">About Us</span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter mb-6 leading-tight">
              Built on Trust.<br />Driven by Results.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              For over two decades, Mubasher Capital Holding has been the trusted partner for institutions and high-net-worth individuals seeking disciplined capital management and strategic growth across global markets.
            </p>
            <Button variant="outline" className="rounded-full px-8 h-12 group">
              Our Story
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <div className="flex flex-col gap-6">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div key={val.title}
                  className="flex items-start gap-5 p-6 rounded-2xl border border-border bg-card group hover:border-accent/30 transition-colors duration-300"
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                >
                  <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold mb-1">{val.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{val.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section id="contact" className="relative z-10 py-32 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/15 dark:bg-blue-600/10 rounded-full blur-[120px]" />
          </div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter mb-6">
              Ready to Elevate<br />Your Portfolio?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Connect with our advisory team and discover how Mubasher Capital can accelerate your financial goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full px-10 h-14 text-base shadow-xl shadow-accent/20 w-full sm:w-auto">
                Schedule a Consultation
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-base bg-background/50 backdrop-blur-sm w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-border bg-card/60 backdrop-blur-sm py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
            <div className="max-w-xs">
              <div className="text-2xl font-heading font-bold mb-3">Mubasher<span className="text-accent">.</span>Capital</div>
              <p className="text-muted-foreground text-sm leading-relaxed">Premium corporate financial services, delivering world-class strategies since 2000.</p>
            </div>
            {[
              { title: "Company", links: ["About", "Services", "Insights", "Careers"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Regulatory Info"] },
              { title: "Connect", links: ["Client Portal", "Contact Us", "LinkedIn"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-heading font-semibold mb-4 text-sm tracking-wider uppercase text-muted-foreground">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Mubasher Capital Holding. All rights reserved. Regulated and compliant across all operating jurisdictions.
          </div>
        </div>
      </footer>
    </div>
  );
}
