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
  Heart,
  Languages
} from "lucide-react";

/* ─── Dictionary ─── */
const translations = {
  en: {
    nav: {
      services: "Services",
      about: "About",
      track: "Track Record",
      team: "Team",
      news: "News",
      contact: "Contact",
      clientPortal: "Client Portal"
    },
    hero: {
      label: "Experience & Investment",
      title1: "YOUR TRUSTED",
      title2: "FINANCIAL",
      title3: "ADVISOR",
      desc: "Mubasher Capital Holding provides unparalleled expertise in investment banking, asset management, and brokerage services across the Middle East.",
      primaryBtn: "Explore Services",
      secondaryBtn: "Schedule Consultation",
      stat1: "Assets Managed",
      stat2: "Major Transactions",
      stat3: "Global Markets"
    },
    services: {
      label: "Mubasher Services",
      title: "Comprehensive Financial Solutions",
      s1: { title: "Investment Banking", desc: "Expert advisory on mergers, acquisitions, and capital raising strategies." },
      s2: { title: "Asset Management", desc: "Tailored investment portfolios designed for institutional and private clients." },
      s3: { title: "Custody Services", desc: "Secure and transparent safe-keeping solutions for your global assets." },
      s4: { title: "Research & Analysis", desc: "In-depth market intelligence and quantitative research to guide decision-making." },
      s5: { title: "Securities Brokerage", desc: "High-performance execution and direct market access across global exchanges." }
    },
    about: {
      label: "Institutional Banking",
      title: "Investment banking firm serving clients in Egypt and the Middle East",
      desc: "Mubasher Capital is a leading regional investment bank with a footprint across Cairo, Dubai, and Riyadh. We provide high-impact advisory services, combining deep local knowledge with international execution standards.",
      stat1: "Operational Excellence",
      stat2: "Institutional Clients",
      btn: "Learn More About Us"
    },
    track: {
      label: "Success Stories",
      title: "Track Record",
      desc: "Proven history of high-value transactions across diverse industries and markets."
    },
    team: {
      label: "Leadership",
      title: "Our People"
    },
    values: {
      label: "Our Philosophy",
      title: "Corporate Values",
      v1: { title: "Integrity", desc: "Honesty and transparency are the cornerstones of every relationship we build." },
      v2: { title: "Balance", desc: "Strategic equilibrium between risk management and performance optimization." },
      v3: { title: "Professionalism", desc: "Upholding the highest standards of financial conduct and expertise." },
      v4: { title: "Loyalty", desc: "Unwavering commitment to our partners and their long-term prosperity." }
    },
    cta: {
      label: "Join Our Network",
      title: "Elevate Your Financial Strategy",
      desc: "Subscribe to our newsletter for exclusive market insights or contact our advisory board directly.",
      placeholder: "Your email address",
      btn: "Subscribe",
      link1: "Contact Advisory",
      link2: "Investor Relations"
    },
    footer: {
      desc: "Your regional gateway to global financial excellence. Regulated by the Financial Regulatory Authority.",
      rights: "Mubasher Capital Holding. All rights reserved."
    }
  },
  ar: {
    nav: {
      services: "خدماتنا",
      about: "عن الشركة",
      track: "سجل الإنجازات",
      team: "فريق العمل",
      news: "الأخبار",
      contact: "اتصل بنا",
      clientPortal: "بوابة العملاء"
    },
    hero: {
      label: "الخبرة والاستثمار",
      title1: "مستشارك",
      title2: "المالي",
      title3: "الموثوق",
      desc: "تقدم مباشر كابيتال القابضة خبرات لا ميل لها في الخدمات المصرفية الاستثمارية، وإدارة الأصول، وخدمات الوساطة في جميع أنحاء الشرق الأوسط.",
      primaryBtn: "استكشف خدماتنا",
      secondaryBtn: "حجز استشارة",
      stat1: "الأصول المدارة",
      stat2: "عمليات رئيسية",
      stat3: "أسواق عالمية"
    },
    services: {
      label: "خدمات مباشر",
      title: "حلول مالية شاملة",
      s1: { title: "الخدمات المصرفية الاستثمارية", desc: "استشارات خبيرة في عمليات الاندماج والاستحواذ واستراتيجيات زيادة رأس المال." },
      s2: { title: "إدارة الأصول", desc: "محافظ استثمارية مصممة خصيصاً للعملاء المؤسسيين والأفراد." },
      s3: { title: "خدمات الحفظ", desc: "حلول حفظ آمنة وشفافة لأصولك العالمية." },
      s4: { title: "البحوث والتحليل", desc: "معلومات سوقية متعمقة وأبحاث كمية لتوجيه عملية صنع القرار." },
      s5: { title: "وساطة الأوراق المالية", desc: "تنفيذ عالي الأداء ووصول مباشر إلى الأسواق عبر البورصات العالمية." }
    },
    about: {
      label: "الخدمات المصرفية للمؤسسات",
      title: "شركة خدمات مصرفية استثمارية تخدم العملاء في مصر والشرق الأوسط",
      desc: "مباشر كابيتال هي بنك استثماري إقليمي رائد له حضور في القاهرة ودبي والرياض. نحن نقدم خدمات استشارية عالية التأثير، تجمع بين المعرفة المحلية العميقة ومعايير التنفيذ الدولية.",
      stat1: "تميز تشغيلي",
      stat2: "عملاء مؤسسيين",
      btn: "تعرف علينا أكثر"
    },
    track: {
      label: "قصص النجاح",
      title: "سجل الإنجازات",
      desc: "تاريخ حافل من المعاملات عالية القيمة عبر مختلف الصناعات والأسواق."
    },
    team: {
      label: "القيادة",
      title: "فريق عملنا"
    },
    values: {
      label: "فلسفتنا",
      title: "قيم الشركة",
      v1: { title: "النزاهة", desc: "الصدق والشفافية هما حجر الزاوية في كل علاقة نبنيها." },
      v2: { title: "التوازن", desc: "توازن استراتيجي بين إدارة المخاطر وتحسين الأداء." },
      v3: { title: "المهنية", desc: "الالتزام بأعلى معايير السلوك المالي والخبرة." },
      v4: { title: "الولاء", desc: "التزام ثابت تجاه شركائنا وازدهارهم على المدى الطويل." }
    },
    cta: {
      label: "انضم إلى شبكتنا",
      title: "ارتقِ باستراتيجيتك المالية",
      desc: "اشترك في نشرتنا الإخبارية للحصول على رؤى حصرية للسوق أو تواصل مع مجلسنا الاستشاري مباشرة.",
      placeholder: "عنوان بريدك الإلكتروني",
      btn: "اشترك الآن",
      link1: "اتصل بالمستشارين",
      link2: "علاقات المستثمرين"
    },
    footer: {
      desc: "بوابتك الإقليمية للتميز المالي العالمي. خاضعة لرقابة الهيئة العامة للرقابة المالية.",
      rights: "مباشر كابيتال القابضة. جميع الحقوق محفوظة."
    }
  }
};

/* ─── Custom Cursor ─── */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${x - 18}px, ${y - 18}px, 0)`;
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
      <div ref={dot} className="cursor-dot hidden lg:block" />
      <div ref={ring} className={`cursor-ring hidden lg:block ${hovering ? "hover" : ""}`} />
    </>
  );
}

/* ─── Navbar ─── */
function Navbar({ lang, setLang, t }: { lang: string, setLang: (l: string) => void, t: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { name: t.nav.services, id: "services" },
    { name: t.nav.about, id: "about" },
    { name: t.nav.track, id: "track-record" },
    { name: t.nav.team, id: "team" },
    { name: t.nav.news, id: "news" },
    { name: t.nav.contact, id: "contact" }
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
          scrolled ? "glass shadow-2xl shadow-black/10 py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="group flex items-center gap-3 no-underline outline-none" style={{cursor:"none"}}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-500">
              <span className="text-white font-bold text-xl font-heading">M</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-heading font-extrabold text-xl tracking-tight text-foreground uppercase">
                MUBASHER
              </span>
              <span className="font-heading font-bold text-[10px] tracking-[0.4em] text-accent uppercase">
                {lang === 'en' ? 'CAPITAL' : 'كابيتال'}
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {links.map(l => (
              <a key={l.id} href={`#${l.id}`} className="nav-link text-sm font-bold uppercase tracking-widest">{l.name}</a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="w-10 h-10 rounded-full border border-border/50 bg-secondary/30 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300 group"
              style={{cursor:"none"}}
              data-hover
            >
              <Languages className="w-4 h-4 transition-transform duration-500 group-hover:rotate-12" />
              <span className="sr-only">Toggle Language</span>
            </button>
            <ThemeToggle />
            <a href="#contact" className="btn-primary hidden md:inline-flex text-[10px] uppercase font-bold tracking-[0.2em] h-11 px-8" style={{cursor:"none"}}>
              {t.nav.clientPortal}
            </a>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="lg:hidden p-2.5 rounded-xl border border-border/50 bg-secondary/30 text-muted-foreground hover:text-foreground transition-all duration-300"
              style={{cursor:"none"}}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] bg-background/98 backdrop-blur-xl flex flex-col p-10 lg:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <span className="text-white font-bold text-xl font-heading">M</span>
                </div>
                <span className="font-heading font-extrabold text-2xl tracking-tight uppercase">Mubasher</span>
              </div>
              <button onClick={() => setMenuOpen(false)} className="p-3 border border-border/50 rounded-full hover:bg-secondary transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  className="font-heading text-4xl font-extrabold hover:text-blue-500 transition-colors tracking-tight"
                  initial={{ opacity: 0, x: lang === 'en' ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.name}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto space-y-4">
              <a href="#contact" className="btn-primary w-full py-5 text-center text-lg font-bold">
                {t.nav.clientPortal}
              </a>
              <button 
                onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setMenuOpen(false); }}
                className="w-full py-4 border border-border rounded-2xl font-bold flex items-center justify-center gap-3"
              >
                <Languages className="w-5 h-5" />
                {lang === 'en' ? 'العربية' : 'English'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Hero Section ─── */
function Hero({ t, lang }: { t: any, lang: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden noise">
      {/* Dynamic Background Elements */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[700px] h-[700px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-emerald-500/5 blur-[100px] rounded-full animate-pulse-glow delay-1000" />
        <div className="absolute inset-0 grid-overlay opacity-[0.05]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent,var(--background))]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="h-[1px] w-12 bg-blue-500/50" />
          <span className="font-sans text-[12px] font-black tracking-[0.4em] text-blue-500 uppercase">
            {t.hero.label}
          </span>
          <div className="h-[1px] w-12 bg-blue-500/50" />
        </motion.div>

        <div className="mb-10">
          <motion.h1
            className={`font-heading ${lang === 'ar' ? 'text-[clamp(3rem,10vw,7rem)] leading-[1.1]' : 'text-[clamp(3.5rem,11vw,9rem)] leading-[0.9]'} font-extrabold tracking-tightest`}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            {t.hero.title1}<br />
            <span className="text-gradient-blue italic">{t.hero.title2}</span><br />
            {t.hero.title3}
          </motion.h1>
        </div>

        <motion.p
          className="font-sans text-[clamp(1.1rem,2.5vw,1.5rem)] text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed mb-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <a href="#services" className="btn-primary min-w-[240px] py-5 text-base shadow-2xl shadow-blue-500/20">
            {t.hero.primaryBtn} <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180 ms-2' : 'ms-2'}`} />
          </a>
          <a href="#contact" className="btn-outline min-w-[240px] py-5 text-base hover:bg-secondary/40">
            {t.hero.secondaryBtn}
          </a>
        </motion.div>

        {/* Stats Grid - Now properly spaced and in flow */}
        <motion.div 
          className="mt-28 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-24 border-t border-border/30 pt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="space-y-2">
            <div className="font-heading text-4xl lg:text-6xl font-black text-gradient-main">6.6bn</div>
            <div className="font-sans text-[11px] font-bold tracking-[0.3em] text-muted-foreground uppercase">{t.hero.stat1}</div>
          </div>
          <div className="space-y-2">
            <div className="font-heading text-4xl lg:text-6xl font-black text-gradient-main">48+</div>
            <div className="font-sans text-[11px] font-bold tracking-[0.3em] text-muted-foreground uppercase">{t.hero.stat2}</div>
          </div>
          <div className="space-y-2">
            <div className="font-heading text-4xl lg:text-6xl font-black text-gradient-main">80+</div>
            <div className="font-sans text-[11px] font-bold tracking-[0.3em] text-muted-foreground uppercase">{t.hero.stat3}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Services Section ─── */
function Services({ t, lang }: { t: any, lang: string }) {
  const serviceList = [
    { id: "01", title: t.services.s1.title, desc: t.services.s1.desc, icon: Briefcase, color: "blue" },
    { id: "02", title: t.services.s2.title, desc: t.services.s2.desc, icon: TrendingUp, color: "emerald" },
    { id: "03", title: t.services.s3.title, desc: t.services.s3.desc, icon: Shield, color: "blue" },
    { id: "04", title: t.services.s4.title, desc: t.services.s4.desc, icon: Search, color: "emerald" },
    { id: "05", title: t.services.s5.title, desc: t.services.s5.desc, icon: Zap, color: "blue" },
  ];

  return (
    <section id="services" className="py-40 px-6 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-24 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="section-label justify-center">{t.services.label}</span>
          <h2 className={`font-heading ${lang === 'ar' ? 'text-5xl lg:text-7xl' : 'text-5xl lg:text-8xl'} font-extrabold tracking-tightest mt-6 leading-tight`}>
            {t.services.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {serviceList.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                className="premium-card p-12 rounded-[3rem] flex flex-col min-h-[450px] group relative overflow-hidden transition-all duration-700"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                data-hover
              >
                <div className="flex justify-between items-start mb-12">
                  <span className="font-heading text-7xl font-black text-foreground/[0.03] group-hover:text-blue-500/10 transition-colors duration-700">
                    {s.id}
                  </span>
                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 ${
                    s.color === "blue" ? "bg-blue-500/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white" : "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white"
                  }`}>
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="mt-auto space-y-6">
                  <h3 className={`font-heading ${lang === 'ar' ? 'text-3xl' : 'text-4xl'} font-bold tracking-tight group-hover:text-blue-500 transition-colors duration-500`}>
                    {s.title}
                  </h3>
                  <p className="font-sans text-muted-foreground/80 text-lg leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full group-hover:bg-blue-500/15 transition-all duration-700" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── About Section ─── */
function AboutSection({ t, lang }: { t: any, lang: string }) {
  return (
    <section id="about" className="py-40 px-6 bg-secondary/15 relative z-10 overflow-hidden">
      <div className={`max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 lg:gap-32 ${lang === 'ar' ? 'lg:flex-row-reverse text-right' : ''}`}>
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: lang === 'en' ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span className={`section-label ${lang === 'ar' ? 'justify-end' : ''}`}>{t.about.label}</span>
          <h2 className={`font-heading ${lang === 'ar' ? 'text-5xl lg:text-7xl leading-snug' : 'text-5xl lg:text-7xl leading-[1.05]'} font-extrabold tracking-tightest mt-8 mb-10`}>
            {t.about.title}
          </h2>
          <p className="font-sans text-muted-foreground/90 text-xl leading-relaxed mb-12">
            {t.about.desc}
          </p>
          <div className="grid grid-cols-2 gap-12 mb-16">
            <div className="space-y-3">
              <div className="font-heading text-5xl lg:text-6xl font-black text-foreground">25Y+</div>
              <div className="font-sans text-[11px] font-black tracking-[0.3em] text-blue-500 uppercase">{t.about.stat1}</div>
            </div>
            <div className="space-y-3">
              <div className="font-heading text-5xl lg:text-6xl font-black text-foreground">500+</div>
              <div className="font-sans text-[11px] font-black tracking-[0.3em] text-blue-500 uppercase">{t.about.stat2}</div>
            </div>
          </div>
          <a href="#contact" className="btn-primary min-w-[260px] py-5 text-base">
            {t.about.btn}
          </a>
        </motion.div>

        <motion.div
          className="lg:w-1/2 grid grid-cols-2 gap-6 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="aspect-[3/4] rounded-[3rem] bg-gradient-to-br from-blue-600/20 via-blue-700/10 to-transparent border border-border/50 overflow-hidden relative group">
             <div className="absolute inset-0 grid-overlay opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
             <div className={`absolute bottom-8 font-heading font-black text-3xl tracking-tighter ${lang === 'en' ? 'left-8' : 'right-8'}`}>
                {lang === 'en' ? 'CAIRO' : 'القاهرة'}
             </div>
          </div>
          <div className="aspect-[3/4] rounded-[3rem] bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent border border-border/50 mt-16 overflow-hidden relative group">
             <div className="absolute inset-0 grid-overlay opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
             <div className={`absolute bottom-8 font-heading font-black text-3xl tracking-tighter ${lang === 'en' ? 'left-8' : 'right-8'}`}>
                {lang === 'en' ? 'DUBAI' : 'دبي'}
             </div>
          </div>
          {/* Background Glow */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 blur-[100px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Track Record ─── */
function TrackRecord({ t, lang }: { t: any, lang: string }) {
  const transactions = [
    { company: "Coca-Cola", label: lang === 'en' ? "Bottling Group" : "مجموعة التعبئة", year: "2023", value: "$450M" },
    { company: "Gulf Capital", label: lang === 'en' ? "Strategic Exit" : "تخارج استراتيجي", year: "2022", value: "$1.2B" },
    { company: "Almarai", label: lang === 'en' ? "Capital Raising" : "زيادة رأس المال", year: "2023", value: "$800M" },
    { company: "MinaPharm", label: lang === 'en' ? "M&A Advisory" : "استشارات اندماج", year: "2021", value: "$200M" },
    { company: "Indorama", label: lang === 'en' ? "Investment" : "استثمار مباشر", year: "2022", value: "$600M" },
    { company: "Palm Hills", label: lang === 'en' ? "Debt Restructuring" : "هيكلة ديون", year: "2023", value: "$300M" },
  ];

  return (
    <section id="track-record" className="py-40 px-6 z-10 relative bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className={`mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10 ${lang === 'ar' ? 'md:flex-row-reverse text-right' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl">
            <span className={`section-label ${lang === 'ar' ? 'justify-end' : ''}`}>{t.track.label}</span>
            <h2 className="font-heading text-5xl lg:text-8xl font-extrabold tracking-tightest mt-6 leading-none">{t.track.title}</h2>
          </div>
          <p className="font-sans text-muted-foreground/80 text-xl max-w-sm leading-relaxed">
            {t.track.desc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {transactions.map((t, i) => (
            <motion.div
              key={t.company}
              className="premium-card p-10 rounded-[2.5rem] group border border-border/40 hover:bg-secondary/40 transition-all duration-500"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true }}
              data-hover
            >
              <div className={`flex justify-between items-center mb-10 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="font-heading text-3xl font-black text-blue-500/10 group-hover:text-blue-500 transition-colors duration-500">
                  {t.company}
                </div>
                <span className="text-[11px] font-black tracking-widest text-muted-foreground/40 uppercase bg-secondary/50 px-3 py-1 rounded-full">{t.year}</span>
              </div>
              <div className="font-heading text-2xl font-bold mb-2 tracking-tight group-hover:text-foreground transition-colors duration-500">{t.label}</div>
              <div className="font-sans text-blue-500 font-black text-lg">{t.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Team Section ─── */
function Team({ t, lang }: { t: any, lang: string }) {
  const leaders = [
    { name: lang === 'en' ? "Amr Helal" : "عمرو هلال", role: lang === 'en' ? "Managing Director" : "العضو المنتدب", id: 1 },
    { name: lang === 'en' ? "Marianne Ghali" : "ماريان غالي", role: lang === 'en' ? "Head of Asset Management" : "رئيس إدارة الأصول", id: 2 },
    { name: lang === 'en' ? "Hany Genena" : "هاني جنينة", role: lang === 'en' ? "Chief Economist" : "كبير الاقتصاديين", id: 3 },
    { name: lang === 'en' ? "Mohamed Gouda" : "محمد جودة", role: lang === 'en' ? "Head of Brokerage" : "رئيس قسم الوساطة", id: 4 },
    { name: lang === 'en' ? "Sarah Ahmed" : "سارة أحمد", role: lang === 'en' ? "Head of Compliance" : "رئيس قسم الالتزام", id: 5 },
    { name: lang === 'en' ? "Omar Farouk" : "عمر فاروق", role: lang === 'en' ? "Chief Operating Officer" : "الرئيس التنفيذي للعمليات", id: 6 },
    { name: lang === 'en' ? "Laila Hassan" : "ليلى حسن", role: lang === 'en' ? "Head of Research" : "رئيس قسم البحوث", id: 7 },
    { name: lang === 'en' ? "Karim Zaki" : "كريم زكي", role: lang === 'en' ? "Head of IT & Digital" : "رئيس قسم التكنولوجيا", id: 8 },
  ];

  return (
    <section id="team" className="py-40 px-6 bg-secondary/10 z-10 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-24 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="section-label justify-center">{t.team.label}</span>
          <h2 className="font-heading text-5xl lg:text-8xl font-extrabold tracking-tightest mt-6 leading-none">{t.team.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {leaders.map((p, i) => (
            <motion.div
              key={p.name}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/5] rounded-[3rem] bg-gradient-to-b from-blue-600/5 to-blue-900/10 border border-border/50 overflow-hidden mb-8 group-hover:border-blue-500/50 transition-all duration-700 relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                   <Users className="w-24 h-24 text-blue-500 group-hover:scale-110 transition-transform duration-1000" />
                </div>
                {/* Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10 text-center translate-y-10 group-hover:translate-y-0">
                   <div className="font-heading font-black text-2xl mb-2">{p.name}</div>
                   <div className="font-sans text-blue-500 text-sm font-bold tracking-widest uppercase">{p.role}</div>
                </div>
              </div>
              <div className="text-center group-hover:opacity-0 transition-opacity duration-500">
                <h3 className="font-heading font-black text-2xl mb-2 tracking-tight">{p.name}</h3>
                <p className="font-sans text-muted-foreground/60 text-[10px] font-black uppercase tracking-[0.3em]">{p.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Values Section ─── */
function Values({ t, lang }: { t: any, lang: string }) {
  const valueItems = [
    { id: "01", title: t.values.v1.title, desc: t.values.v1.desc, icon: Scale },
    { id: "02", title: t.values.v2.title, desc: t.values.v2.desc, icon: Layers },
    { id: "03", title: t.values.v3.title, desc: t.values.v3.desc, icon: Award },
    { id: "04", title: t.values.v4.title, desc: t.values.v4.desc, icon: Heart },
  ];

  return (
    <section className="py-40 px-6 z-10 relative bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className={`mb-28 ${lang === 'ar' ? 'text-right' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className={`section-label ${lang === 'ar' ? 'justify-end' : ''}`}>{t.values.label}</span>
          <h2 className="font-heading text-5xl lg:text-8xl font-extrabold tracking-tightest mt-6 leading-none">{t.values.title}</h2>
        </motion.div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20 ${lang === 'ar' ? 'text-right' : ''}`}>
          {valueItems.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.id}
                className="group flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`flex items-center gap-6 mb-8 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-16 h-16 rounded-[1.25rem] bg-secondary flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-12 transition-all duration-700 shadow-xl group-hover:shadow-blue-500/30">
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="font-heading font-black text-4xl text-foreground/[0.05] group-hover:text-blue-500/20 transition-all duration-700">{v.id}</span>
                </div>
                <h3 className="font-heading text-2xl font-bold mb-6 tracking-tight group-hover:text-blue-500 transition-colors duration-500">{v.title}</h3>
                <p className="font-sans text-muted-foreground/80 text-lg leading-relaxed">
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
function CTA({ t, lang }: { t: any, lang: string }) {
  return (
    <section id="contact" className="relative py-52 px-6 z-10 overflow-hidden bg-secondary/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-blue-600/[0.08] rounded-full blur-[160px] animate-pulse-glow" />
        <div className="absolute inset-0 grid-overlay opacity-[0.07]" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-label justify-center">{t.cta.label}</span>
          <h2 className={`font-heading ${lang === 'ar' ? 'text-5xl lg:text-8xl' : 'text-5xl lg:text-9xl'} font-extrabold tracking-tightest mt-8 mb-12 leading-[0.95]`}>
             {t.cta.title}
          </h2>
          <p className="font-sans text-muted-foreground/90 text-2xl mb-16 max-w-2xl mx-auto leading-relaxed px-4">
            {t.cta.desc}
          </p>
          
          <div className={`flex flex-col md:flex-row items-stretch justify-center gap-4 max-w-2xl mx-auto mb-16 ${lang === 'ar' ? 'md:flex-row-reverse' : ''}`}>
            <input 
              type="email" 
              placeholder={t.cta.placeholder}
              className={`flex-grow bg-background/50 border-2 border-border/50 rounded-full px-10 py-5 outline-none focus:border-blue-500/50 transition-all duration-500 text-lg ${lang === 'ar' ? 'text-right' : ''}`}
            />
            <button className="btn-primary whitespace-nowrap px-12 py-5 rounded-full text-lg font-black tracking-wider shadow-2xl shadow-blue-600/30">
               {t.cta.btn}
            </button>
          </div>

          <div className={`flex justify-center gap-12 text-sm font-black tracking-[0.2em] text-blue-500 uppercase ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <a href="mailto:info@mubashercapital.com" className="hover:opacity-60 transition-opacity border-b border-blue-500/30 pb-1">{t.cta.link1}</a>
            <a href="#" className="hover:opacity-60 transition-opacity border-b border-blue-500/30 pb-1">{t.cta.link2}</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer({ t, lang }: { t: any, lang: string }) {
  const footerLinks = [
    { title: lang === 'en' ? "Business Areas" : "قطاعات الأعمال", links: [t.services.s1.title, t.services.s2.title, t.services.s5.title, t.services.s4.title, t.services.s3.title] },
    { title: lang === 'en' ? "Company" : "الشركة", links: [t.nav.about, t.nav.team, t.nav.news, "Careers", t.nav.contact] },
    { title: lang === 'en' ? "Legal" : "القانونية", links: ["Privacy Policy", "Terms of Use", "FRA Disclosures", "Cookie Policy"] },
  ];

  return (
    <footer className={`relative z-10 bg-background border-t border-border/50 pt-32 pb-16 px-6 ${lang === 'ar' ? 'text-right' : ''}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 mb-28 ${lang === 'ar' ? 'lg:flex lg:flex-row-reverse lg:justify-between' : ''}`}>
          <div className="lg:col-span-2 space-y-10">
            <a href="/" className={`flex items-center gap-3 no-underline group ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-700">
                <span className="text-white font-black text-2xl font-heading">M</span>
              </div>
              <span className="font-heading font-black text-3xl tracking-tightest uppercase">Mubasher<span className="text-blue-500">.</span>Capital</span>
            </a>
            <p className="font-sans text-muted-foreground/80 text-xl leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>
            <div className={`flex gap-6 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-12 h-12 rounded-2xl border border-border/50 bg-secondary/20 flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:border-blue-500 transition-all duration-500 group" data-hover>
                    <Globe className="w-5 h-5 transition-transform duration-700 group-hover:rotate-12" />
                 </div>
               ))}
            </div>
          </div>
          {footerLinks.map(col => (
            <div key={col.title} className="space-y-10">
              <h4 className="font-heading font-black text-[12px] tracking-[0.4em] uppercase text-foreground/40">{col.title}</h4>
              <ul className="space-y-6">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="font-sans text-muted-foreground text-lg hover:text-blue-500 transition-colors duration-300 block" style={{cursor:"none"}}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={`pt-12 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-black tracking-[0.3em] text-muted-foreground/40 uppercase ${lang === 'ar' ? 'md:flex-row-reverse' : ''}`}>
          <span>&copy; {new Date().getFullYear()} {t.footer.rights}</span>
          <div className={`flex gap-12 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <span className="hover:text-foreground transition-colors">Cairo</span>
            <span className="hover:text-foreground transition-colors">Dubai</span>
            <span className="hover:text-foreground transition-colors">Riyadh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Export ─── */
export default function Home() {
  const [lang, setLang] = useState('en');
  const t = translations[lang as keyof typeof translations];

  useEffect(() => {
    // Sync attributes to avoid hydration mismatch
    document.body.className = lang === 'ar' ? 'lang-ar' : '';
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`min-h-screen bg-background text-foreground selection:bg-blue-500/30`}>
      <Cursor />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} lang={lang} />
      <Services t={t} lang={lang} />
      <AboutSection t={t} lang={lang} />
      <TrackRecord t={t} lang={lang} />
      <Team t={t} lang={lang} />
      <Values t={t} lang={lang} />
      <CTA t={t} lang={lang} />
      <Footer t={t} lang={lang} />
    </div>
  );
}
