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
  Languages,
  User
} from "lucide-react";

/* ─── Dictionary ─── */
const translations = {
  en: {
    nav: {
      services: "Ecosystem",
      about: "About Group",
      track: "Trade Spotlight",
      team: "Leadership",
      news: "News",
      contact: "Contact",
      clientPortal: "Client Portal"
    },
    hero: {
      label: "ELEVATING REGIONAL FINANCE",
      title1: "UNIFIED",
      title2: "INVESTMENT",
      title3: "ECOSYSTEM",
      desc: "Mubasher Capital Holding is the premier force in Middle Eastern financial services. We bridge global markets with local expertise, delivering institutional-grade solutions through a seamless digital ecosystem.",
      primaryBtn: "Explore Our Ecosystem",
      secondaryBtn: "Partner With Us",
      stat1: "Global Markets",
      stat2: "Monthly Visitors",
      stat3: "Trading Volume"
    },
    services: {
      label: "Our Ecosystem",
      title: "Comprehensive Financial Powerhouse",
      s1: { title: "Mubasher Trade", desc: "Egypt's Top 3 Brokerage Firm delivering rapid execution and digital trading innovation." },
      s2: { title: "Mubasher Media", desc: "The region's leading financial media powerhouse. Its flagship product, Mubasher Info, delivers real-time data to over 2.5M monthly visitors." },
      s3: { title: "Mubasher Global", desc: "Your secure gateway to over 90 international financial markets." },
      s4: { title: "Mubasher Asset Mgmt", desc: "Tailored institutional and private investment portfolios designed for growth." },
      s5: { title: "Mubasher Custody", desc: "The trusted guardian of client assets with unparalleled transparency and security." },
      s6: { title: "Mubasher Capital", desc: "Global investment partner providing elite institutional trading solutions." }
    },
    about: {
      label: "Group Overview",
      title: "Building the Fortress of Trust",
      desc: "Mubasher Capital Holding orchestrates a seamless, end-to-end investment experience. Our subsidiaries operate synergistically to provide comprehensive financial environments for retail and institutional investors alike.",
      stat1: "Years of Heritage",
      stat2: "Subsidiaries",
      btn: "Discover Our Vision"
    },
    track: {
      label: "Subsidiary Spotlight",
      title: "Mubasher Trade Excellence",
      desc: "Our flagship brokerage arm, Mubasher for Securities and Bonds, pioneered digital trading in 2006 and continuously ranks among the top brokers in Egypt."
    },
    platforms: {
      label: "Digital Platforms",
      title: "Digital Strongholds for Financial Excellence",
      desc: "Our technological infrastructure is the backbone of our leadership. We provide cutting-edge platforms including Mubasher Trade Pro, Trade Plus, and our unified Mobile App.",
      btn: "Explore Platforms"
    },
    team: {
      label: "Group Leadership",
      title: "Visionary Minds"
    },
    gov: {
      label: "Corporate Governance",
      title: "Institutional Trust & Security",
      desc: "We operate with strict adherence to the Egyptian Financial Regulatory Authority (FRA) regulations and maintain world-class digital security measures to safeguard client assets."
    },
    values: {
      label: "Our Core Values",
      title: "A Beacon for the Future",
      v1: { title: "Integrity & Transparency", desc: "Highest standards of honesty and trustworthiness across every interaction." },
      v2: { title: "Client-Centric", desc: "Our clients' needs are the compass guiding every decision we make." },
      v3: { title: "Innovation", desc: "Relentlessly pursuing pioneering solutions and services that exceed expectations." },
      v4: { title: "Financial Literacy", desc: "Equipping our clients with knowledge and promoting a culture of investment." }
    },
    cta: {
      label: "Start Your Journey",
      title: "Choose Your Financial Future",
      desc: "Connect with the Mubasher ecosystem. Whether you seek global markets, deep research, or institutional asset management, we are here to support you.",
      placeholder: "Your email address",
      btn: "Get Started",
      link1: "CS@mubasher.net",
      link2: "Hotline: 16699"
    },
    footer: {
      desc: "Mubasher Capital Holding. A regional leader in financial services and digital innovation.",
      rights: "Mubasher Capital Holding. All rights reserved."
    }
  },
  ar: {
    nav: {
      services: "منظومتنا",
      about: "عن المجموعة",
      track: "تسليط الضوء",
      team: "القيادة",
      news: "الأخبار",
      contact: "اتصل بنا",
      clientPortal: "بوابة العملاء"
    },
    hero: {
      label: "الارتقاء بالخدمات المالية الإقليمية",
      title1: "منظومة",
      title2: "استثمارية",
      title3: "موحدة",
      desc: "مباشر كابيتال القابضة هي القوة الرائدة في الخدمات المالية في الشرق الأوسط. نجمع بين الأسواق العالمية والخبرة المحلية، لنقدم حلولاً مؤسسية من خلال منظومة رقمية متكاملة وسلسة.",
      primaryBtn: "استكشف منظومتنا",
      secondaryBtn: "شاركنا النجاح",
      stat1: "أسواق عالمية",
      stat2: "زائر شهرياً",
      stat3: "حجم التداول"
    },
    services: {
      label: "منظومتنا",
      title: "قوة مالية شاملة",
      s1: { title: "مباشر تريد", desc: "من أفضل 3 شركات وساطة في مصر، تقدم تنفيذ سريع وابتكار في التداول الرقمي." },
      s2: { title: "مباشر ميديا", desc: "القوة الإعلامية المالية الرائدة في المنطقة. منتجها الرائد، مباشر إنفو، يقدم بيانات لحظية لأكثر من 2.5 مليون زائر شهرياً." },
      s3: { title: "مباشر جلوبال", desc: "بوابتك الآمنة لأكثر من 90 سوقاً مالياً دولياً." },
      s4: { title: "مباشر لإدارة الأصول", desc: "محافظ استثمارية مؤسسية وخاصة مصممة خصيصاً للنمو." },
      s5: { title: "مباشر للحفظ", desc: "الحارس الموثوق لأصول العملاء بشفافية وأمان لا مثيل لهما." },
      s6: { title: "مباشر كابيتال", desc: "شريك استثماري عالمي يقدم حلول تداول مؤسسية رائدة." }
    },
    about: {
      label: "نظرة عامة على المجموعة",
      title: "بناء قلعة من الثقة",
      desc: "تقوم مباشر كابيتال القابضة بتنسيق تجربة استثمارية متكاملة وسلسة. تعمل شركاتنا التابعة بتآزر لتوفير بيئات مالية شاملة للمستثمرين الأفراد والمؤسسات على حد سواء.",
      stat1: "سنوات من التراث",
      stat2: "شركات تابعة",
      btn: "اكتشف رؤيتنا"
    },
    track: {
      label: "تسليط الضوء على الشركات التابعة",
      title: "تميز مباشر تريد",
      desc: "ذراع الوساطة الرائد لدينا، مباشر لتداول الأوراق المالية والسندات، قادت ثورة التداول الرقمي في عام 2006 وتصنف باستمرار من بين أفضل الوسطاء في مصر."
    },
    platforms: {
      label: "المنصات الرقمية",
      title: "قلاع رقمية للتميز المالي",
      desc: "البنية التحتية التكنولوجية هي العمود الفقري لريادتنا. نقدم منصات رائدة تشمل مباشر تريد برو، تريد بلس، وتطبيق الهاتف الموحد.",
      btn: "استكشف المنصات"
    },
    team: {
      label: "قيادة المجموعة",
      title: "عقول رائدة"
    },
    gov: {
      label: "الحوكمة المؤسسية",
      title: "الثقة المؤسسية والأمان",
      desc: "نعمل بامتثال تام لتعليمات الهيئة العامة للرقابة المالية (FRA) ونطبق أعلى معايير الأمان الرقمي لحماية أصول العملاء."
    },
    values: {
      label: "قيمنا الأساسية",
      title: "منارة للمستقبل",
      v1: { title: "النزاهة والشفافية", desc: "أعلى معايير الصدق والأمانة في كل تعاملاتنا." },
      v2: { title: "العميل أولاً", desc: "احتياجات عملائنا هي البوصلة التي توجه قراراتنا." },
      v3: { title: "الابتكار والتميز", desc: "السعي المستمر لتقديم حلول وخدمات رائدة تفوق التوقعات." },
      v4: { title: "الثقافة المالية", desc: "تزويد عملائنا بالمعرفة ونشر ثقافة الاستثمار." }
    },
    cta: {
      label: "ابدأ رحلتك",
      title: "اختر مستقبلك المالي",
      desc: "تواصل مع منظومة مباشر. سواء كنت تبحث عن الأسواق العالمية، البحوث العميقة، أو إدارة الأصول المؤسسية، نحن هنا لدعمك.",
      placeholder: "بريدك الإلكتروني",
      btn: "ابدأ الآن",
      link1: "CS@mubasher.net",
      link2: "الخط الساخن: 16699"
    },
    footer: {
      desc: "مباشر كابيتال القابضة. رائد إقليمي في الخدمات المالية والابتكار الرقمي.",
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
          <a href="/" className="group flex items-center no-underline outline-none" style={{cursor:"none"}}>
            <img 
              src="/images/logo.png" 
              alt="Mubasher Holding" 
              className="h-10 md:h-12 w-auto group-hover:scale-105 transition-transform duration-500 dark:brightness-110" 
            />
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
      {/* Premium Minimalist Mesh Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] bg-blue-600/10 blur-[160px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-blue-500/5 blur-[160px] rounded-full animate-pulse-glow delay-1000" />
        <div className="absolute inset-0 grid-overlay opacity-[0.03]" />
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
            className={`font-heading ${lang === 'ar' ? 'text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.3]' : 'text-[clamp(3.5rem,11vw,9rem)] leading-[0.9]'} font-extrabold tracking-tightest`}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            {t.hero.title1}<br />
            <span className={`text-gradient-blue ${lang === 'en' ? 'italic' : ''}`}>{t.hero.title2}</span><br />
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
            <div className="font-heading text-4xl lg:text-6xl font-black text-gradient-main">90+</div>
            <div className="font-sans text-[11px] font-bold tracking-[0.3em] text-muted-foreground uppercase">{t.hero.stat1}</div>
          </div>
          <div className="space-y-2">
            <div className="font-heading text-4xl lg:text-6xl font-black text-gradient-main">2.5M+</div>
            <div className="font-sans text-[11px] font-bold tracking-[0.3em] text-muted-foreground uppercase">{t.hero.stat2}</div>
          </div>
          <div className="space-y-2">
            <div className="font-heading text-4xl lg:text-6xl font-black text-gradient-main">10B+</div>
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
    { id: "02", title: t.services.s2.title, desc: t.services.s2.desc, icon: Search, color: "emerald" },
    { id: "03", title: t.services.s3.title, desc: t.services.s3.desc, icon: Globe, color: "blue" },
    { id: "04", title: t.services.s4.title, desc: t.services.s4.desc, icon: TrendingUp, color: "emerald" },
    { id: "05", title: t.services.s5.title, desc: t.services.s5.desc, icon: Shield, color: "blue" },
    { id: "06", title: t.services.s6.title, desc: t.services.s6.desc, icon: Zap, color: "emerald" },
  ];

  return (
    <section id="services" className="py-24 px-6 bg-background relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none mix-blend-overlay">
        <img src="/images/ecosystem.png" alt="Ecosystem" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
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
    <section id="about" className="py-24 px-6 bg-secondary/15 relative z-10 overflow-hidden">
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
              <div className="font-heading text-5xl lg:text-6xl font-black text-foreground">19Y+</div>
              <div className="font-sans text-[11px] font-black tracking-[0.3em] text-blue-500 uppercase">{t.about.stat1}</div>
            </div>
            <div className="space-y-3">
              <div className="font-heading text-5xl lg:text-6xl font-black text-foreground">10K+</div>
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
             <img src="/images/cairo.jpeg" alt="Cairo" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
             <div className="absolute inset-0 grid-overlay opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
             <div className={`absolute bottom-8 font-heading font-black text-3xl tracking-tighter z-10 ${lang === 'en' ? 'left-8' : 'right-8'}`}>
                {lang === 'en' ? 'EGYPT' : 'مصر'}
             </div>
          </div>
          <div className="aspect-[3/4] rounded-[3rem] bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent border border-border/50 mt-16 overflow-hidden relative group">
             <img src="/images/regional.png" alt="Regional" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
             <div className="absolute inset-0 grid-overlay opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
             <div className={`absolute bottom-8 font-heading font-black text-3xl tracking-tighter z-10 ${lang === 'en' ? 'left-8' : 'right-8'}`}>
                {lang === 'en' ? 'REGIONAL' : 'إقليمي'}
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
  return (
    <section id="track-record" className="py-24 px-6 z-10 relative bg-background">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <motion.div
          className={`lg:w-1/2 ${lang === 'ar' ? 'order-last text-right' : ''}`}
          initial={{ opacity: 0, x: lang === 'en' ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span className={`section-label ${lang === 'ar' ? 'justify-end' : ''}`}>{t.track.label}</span>
          <h2 className="font-heading text-5xl lg:text-7xl font-extrabold tracking-tightest mt-6 leading-tight mb-8">
            {t.track.title}
          </h2>
          <p className="font-sans text-muted-foreground/80 text-xl leading-relaxed mb-10">
            {t.track.desc}
          </p>
          <div className={`grid grid-cols-2 gap-8 ${lang === 'ar' ? 'text-right' : ''}`}>
            <div className="premium-card p-6 rounded-3xl">
              <div className="font-heading text-4xl lg:text-5xl font-black text-blue-500 mb-2">10%</div>
              <div className="font-sans text-sm font-bold text-muted-foreground uppercase">{lang === 'en' ? 'Market Share' : 'الحصة السوقية'}</div>
            </div>
            <div className="premium-card p-6 rounded-3xl">
              <div className="font-heading text-4xl lg:text-5xl font-black text-emerald-500 mb-2">18</div>
              <div className="font-sans text-sm font-bold text-muted-foreground uppercase">{lang === 'en' ? 'Branches' : 'فروع'}</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="lg:w-1/2 w-full relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden relative border border-border/50 group">
             <img src="/images/mubasher_trade.jpeg" alt="Mubasher Trade" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
             <div className="absolute inset-0 grid-overlay opacity-30 mix-blend-overlay" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Team Section ─── */
function Team({ t, lang }: { t: any, lang: string }) {
  const tiers = [
    {
      level: 1,
      members: [
        { name: lang === 'en' ? "M. Rashid Al-Ballaa" : "م. راشد البلاع", role: lang === 'en' ? "Founder & Chairman" : "المؤسس ورئيس مجلس الإدارة", image: "/images/al_ballaa.jpeg" }
      ]
    },
    {
      level: 2,
      members: [
        { name: lang === 'en' ? "Mohamed Kishk" : "محمد كشك", role: lang === 'en' ? "Vice Chairman of Mubasher Capital" : "نائب رئيس مجلس إدارة مباشر كابيتال", image: "/images/kishk.jpg" },
        { name: lang === 'en' ? "Ehab Rashad" : "إيهاب رشاد", role: lang === 'en' ? "Vice Chairman of the Board" : "نائب رئيس مجلس الإدارة", image: "/images/rashad.jpg" },
        { name: lang === 'en' ? "Hany Hamdy" : "هاني حمدي", role: lang === 'en' ? "MD of Mubasher Trade Egypt" : "العضو المنتدب لمباشر تريد مصر", image: "/images/hany_hamdy.png" },
      ]
    },
    {
      level: 3,
      members: [
        { name: lang === 'en' ? "Mohamed Bhidy" : "محمد بيدي", role: lang === 'en' ? "Director of Product Development" : "مدير تطوير المنتجات", image: "/images/bhidy.jpg" },
        { name: lang === 'en' ? "Mahmoud Hossam" : "محمود حسام", role: lang === 'en' ? "MD of Mubasher Asset Mgmt" : "العضو المنتدب لمباشر لإدارة الأصول", image: "/images/hossam.png" },
        { name: lang === 'en' ? "Shahd Raa'fat" : "شهد رأفت", role: lang === 'en' ? "Head of Technical Analysis" : "رئيسة التحليل الفني", image: "/images/raafat.png" }
      ]
    }
  ];

  return (
    <section id="team" className="py-24 px-6 bg-secondary/10 z-10 relative">
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

        <div className="space-y-16">
          {tiers.map((tier, tierIdx) => (
            <div key={tierIdx} className={`grid grid-cols-1 ${tier.members.length === 1 ? 'max-w-[300px]' : 'sm:grid-cols-2 lg:grid-cols-3 max-w-6xl'} gap-10 mx-auto`}>
              {tier.members.map((p: any, i) => (
                <motion.div
                  key={p.name}
                  className="group relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="aspect-[4/5] rounded-[2.5rem] bg-gradient-to-b from-blue-600/5 to-blue-900/10 border border-border/50 overflow-hidden mb-6 group-hover:border-blue-500/50 transition-all duration-700 relative shadow-lg shadow-blue-500/5">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-secondary/20">
                        <User className="w-16 h-16 text-blue-500/20 group-hover:text-blue-500/40 transition-colors duration-700" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-90" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-center translate-y-2 group-hover:translate-y-0 transition-all duration-700">
                      <div className="font-heading font-black text-xl lg:text-2xl mb-1 text-white leading-tight">{p.name}</div>
                      <div className="font-sans text-blue-400 text-[10px] lg:text-[11px] font-bold tracking-widest uppercase leading-tight">{p.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Digital Platforms ─── */
function DigitalPlatforms({ t, lang }: { t: any, lang: string }) {
  return (
    <section className="py-24 px-6 bg-background z-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${lang === 'ar' ? 'text-right' : ''}`}>
          <motion.div
            className={lang === 'ar' ? 'order-last' : ''}
            initial={{ opacity: 0, x: lang === 'en' ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className={`section-label ${lang === 'ar' ? 'justify-end' : ''}`}>{t.platforms.label}</span>
            <h2 className="font-heading text-4xl lg:text-6xl font-extrabold tracking-tightest mt-6 mb-8 leading-tight">
              {t.platforms.title}
            </h2>
            <p className="font-sans text-muted-foreground/80 text-xl leading-relaxed mb-10 max-w-lg">
              {t.platforms.desc}
            </p>
            <button className="btn-primary" style={{cursor:"none"}}>{t.platforms.btn}</button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square lg:aspect-auto lg:h-[600px] rounded-[3rem] overflow-hidden border border-border/50 shadow-2xl shadow-blue-500/20 relative group">
              <img src="/images/platforms.jpeg" alt="Digital Platforms" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-background/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Governance Section ─── */
function Governance({ t, lang }: { t: any, lang: string }) {
  return (
    <section className="py-24 px-6 bg-secondary/10 z-10 relative">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${lang === 'ar' ? 'text-right' : ''}`}>
          <motion.div
            className={lang === 'ar' ? 'order-first' : 'order-last'}
            initial={{ opacity: 0, x: lang === 'en' ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className={`section-label ${lang === 'ar' ? 'justify-end' : ''}`}>{t.gov.label}</span>
            <h2 className="font-heading text-4xl lg:text-6xl font-extrabold tracking-tightest mt-6 mb-8 leading-tight">
              {t.gov.title}
            </h2>
            <p className="font-sans text-muted-foreground/80 text-xl leading-relaxed max-w-lg">
              {t.gov.desc}
            </p>
          </motion.div>
          <motion.div
            className={lang === 'ar' ? 'order-last' : 'order-first'}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[4/3] rounded-[3rem] overflow-hidden border border-border/50 shadow-2xl relative group">
              <img src="/images/governance.jpeg" alt="Governance" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 grid-overlay opacity-30 mix-blend-overlay" />
            </div>
          </motion.div>
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
    <section className="py-24 px-6 z-10 relative bg-background">
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
            <a href="/" className={`flex items-center no-underline group ${lang === 'ar' ? 'justify-end' : ''}`}>
              <img 
                src="/images/logo.png" 
                alt="Mubasher Holding" 
                className="h-14 w-auto group-hover:scale-105 transition-transform duration-700 dark:brightness-110" 
              />
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
            <span className="hover:text-foreground transition-colors">{lang === 'en' ? 'Egypt' : 'مصر'}</span>
            <span className="hover:text-foreground transition-colors">{lang === 'en' ? 'Middle East' : 'الشرق الأوسط'}</span>
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
      <DigitalPlatforms t={t} lang={lang} />
      <Team t={t} lang={lang} />
      <Governance t={t} lang={lang} />
      <Values t={t} lang={lang} />
      <CTA t={t} lang={lang} />
      <Footer t={t} lang={lang} />
    </div>
  );
}
