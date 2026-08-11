"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import {
  Calculator,
  TrendingUp,
  Info,
  CheckCircle2,
  Coins,
  History,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

import { Navbar, Footer, translations as globalTranslations } from "../page";

const calculatorTranslations = {
  ar: {
    back: "العودة للرئيسية",
    title: 'حاسبة عمولة "فضة مباشر" التفاعلية',
    subtitle: "افهم كيف تتناقص عمولة الاقتناء (4%) بمرور الوقت",
    investmentData: "بيانات الاستثمار",
    purchaseAmount: "مبلغ الشراء (جنيه)",
    unitPriceAtPurchase: "سعر الوثيقة عند الشراء",
    expectedSellPrice: "سعر الوثيقة المتوقع عند البيع",
    holdingPeriod: "مدة البقاء في الصندوق:",
    day: "يوم",
    days: "يوم",
    quickPresets: [
      { label: "يوم واحد", val: 1 },
      { label: "شهر", val: 30 },
      { label: "6 شهور", val: 182 },
      { label: "سنة (مجاناً)", val: 365 },
    ],
    netPayout: "المبلغ المسترد (الصافي)",
    currency: "ج.م",
    netProfit: "صافي ربحك:",
    currentFeeDeducted: "العمولة المخصومة حالياً",
    congratsFreeExit: "مبروك! الخروج مجاني تماماً",
    feeExemption: "سيتم إعفاء",
    fromOriginalFee: "ج.م من العمولة الأصلية",
    analysisTitle: "تحليل العملية الحسابية",
    after: "بعد",
    currentMarketValue: "القيمة السوقية الحالية",
    unit: "وثيقة",
    unconsumedFee: 'عمولة "غير مستهلكة"',
    daysRemaining: "يوم متبقي",
    totalAmountReceived: "إجمالي المبلغ الذي ستحصل عليه",
    progressToExemption: "التقدم نحو الإعفاء الكامل من العمولة (سنة واحدة)",
    day1FullDeduction: "يوم 1 (الخصم كامل)",
    day365Free: "يوم 365 (مجاناً)",
    reminder: "تذكر دائماً:",
    reminderText:
      'عمولة الـ 4% تُحسب على مبلغ الشراء الأصلي. كل يوم تقضيه في الصندوق، "يتآكل" جزء من هذه العمولة بمعدل 1/365 يومياً حتى تصبح صفر بعد سنة. هذا النظام يحمي المستثمر طويل الأجل من أعباء المصنعية المرتفعة.',
  },
  en: {
    back: "Back to Home",
    title: '"Mubasher Fadda" Commission Calculator',
    subtitle: "Understand how the 4% acquisition fee decreases over time",
    investmentData: "Investment Data",
    purchaseAmount: "Purchase Amount (EGP)",
    unitPriceAtPurchase: "Unit Price at Purchase",
    expectedSellPrice: "Expected Unit Price at Sale",
    holdingPeriod: "Holding Period in Fund:",
    day: "day",
    days: "days",
    quickPresets: [
      { label: "1 Day", val: 1 },
      { label: "1 Month", val: 30 },
      { label: "6 Months", val: 182 },
      { label: "1 Year (Free)", val: 365 },
    ],
    netPayout: "Net Payout",
    currency: "EGP",
    netProfit: "Net Profit:",
    currentFeeDeducted: "Current Fee Deducted",
    congratsFreeExit: "Congratulations! Exit is completely free",
    feeExemption: "Will be exempted:",
    fromOriginalFee: "EGP from original fee",
    analysisTitle: "Calculation Analysis",
    after: "After",
    currentMarketValue: "Current Market Value",
    unit: "units",
    unconsumedFee: '"Unconsumed" Fee',
    daysRemaining: "days remaining",
    totalAmountReceived: "Total Amount You Will Receive",
    progressToExemption: "Progress Towards Full Fee Exemption (One Year)",
    day1FullDeduction: "Day 1 (Full Deduction)",
    day365Free: "Day 365 (Free)",
    reminder: "Always Remember:",
    reminderText:
      'The 4% fee is calculated on the original purchase amount. Each day you stay in the fund, a portion of this fee "erodes" at a rate of 1/365 daily until it becomes zero after one year. This system protects long-term investors from high manufacturing fees.',
  },
};

type Language = "ar" | "en";

export default function CalculatorPage() {
  const [investment, setInvestment] = useState(1000);
  const [buyPrice, setBuyPrice] = useState(10);
  const [sellPrice, setSellPrice] = useState(11);
  const [days, setDays] = useState(30);
  
  // Arabic is the site's default language, matching the home page and root layout.
  const [lang, setLang] = useState<Language>("ar");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = calculatorTranslations[lang];
  const globalT = globalTranslations[lang];
  const isRTL = lang === "ar";

  useEffect(() => {
    // Toggle only the language class so next/font's variable classes on <body> survive.
    document.body.classList.toggle('lang-ar', lang === 'ar');
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Calculations
  const numUnits = investment / buyPrice;
  const totalFeeAmount = investment * 0.04;
  const dailyConsumption = totalFeeAmount / 365;
  const consumedFee = dailyConsumption * days;
  const remainingFee = Math.max(0, totalFeeAmount - consumedFee);

  const currentGrossValue = numUnits * sellPrice;
  const netPayout = currentGrossValue - remainingFee;
  const totalReturn = ((netPayout - investment) / investment) * 100;

  if (!mounted) return null;

  return (
    <div className={`min-h-screen bg-background text-foreground selection:bg-blue-500/30 ${isRTL ? 'lang-ar' : ''}`}>
      <Navbar lang={lang} setLang={(l: string) => setLang(l as Language)} t={globalT} />
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] bg-blue-600/10 blur-[160px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-blue-500/5 blur-[160px] rounded-full animate-pulse-glow delay-1000" />
        <div className="absolute inset-0 grid-overlay opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-12 md:pb-16">
        
        {/* Removed local navigation, using global Navbar */}

        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
              <Calculator className="w-8 h-8" />
            </div>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tightest mb-4 text-gradient-main">
            {t.title}
          </h1>
          <p className="font-sans text-lg md:text-xl text-muted-foreground/80 leading-relaxed">
            {t.subtitle}
          </p>
        </motion.header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Controls Panel (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="premium-card p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full group-hover:bg-blue-500/10 transition-all duration-700" />
              
              <h3 className="font-heading text-2xl font-bold mb-8 flex items-center gap-3">
                <Coins className="w-6 h-6 text-blue-500" />
                {t.investmentData}
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block font-sans text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    {t.purchaseAmount}
                  </label>
                  <input
                    type="number"
                    value={investment || ''}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="w-full bg-secondary/50 border border-border/50 text-foreground font-heading font-bold text-xl rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    style={{ cursor: "none" }}
                  />
                </div>
                <div>
                  <label className="block font-sans text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    {t.unitPriceAtPurchase}
                  </label>
                  <input
                    type="number"
                    value={buyPrice || ''}
                    onChange={(e) => setBuyPrice(Number(e.target.value))}
                    className="w-full bg-secondary/50 border border-border/50 text-foreground font-heading font-bold text-xl rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    style={{ cursor: "none" }}
                  />
                </div>
                <div>
                  <label className="block font-sans text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    {t.expectedSellPrice}
                  </label>
                  <input
                    type="number"
                    value={sellPrice || ''}
                    onChange={(e) => setSellPrice(Number(e.target.value))}
                    className="w-full bg-secondary/50 border border-border/50 text-foreground font-heading font-bold text-xl rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    style={{ cursor: "none" }}
                  />
                </div>

                <div className="pt-6 border-t border-border/50">
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-sans text-sm font-bold text-muted-foreground uppercase tracking-wider">
                      {t.holdingPeriod}
                    </label>
                    <span className="font-heading font-bold text-xl text-blue-500">
                      {days} {days === 1 ? t.day : t.days}
                    </span>
                  </div>
                  
                  <input
                    type="range"
                    min="0"
                    max="365"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-blue-600 outline-none"
                    style={{ cursor: "none" }}
                  />
                  
                  <div className="flex flex-wrap gap-2 mt-6">
                    {t.quickPresets.map((p) => (
                      <button
                        key={p.val}
                        onClick={() => setDays(p.val)}
                        className={`text-[11px] font-bold uppercase tracking-wider px-3 py-2 rounded-xl border transition-all duration-300 flex-1 ${
                          days === p.val
                            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                            : "bg-transparent text-muted-foreground border-border/50 hover:border-blue-500/30 hover:bg-secondary"
                        }`}
                        style={{ cursor: "none" }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Panel (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 space-y-6 md:space-y-8"
          >
            {/* Highlight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="premium-card !bg-blue-600 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)]">
                <div className="absolute inset-0 grid-overlay opacity-10" />
                <div className="relative z-10">
                  <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-3">{t.netPayout}</p>
                  <motion.h2 
                    key={netPayout}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-heading text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight"
                  >
                    {netPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-2xl">{t.currency}</span>
                  </motion.h2>
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full w-max border border-white/10">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-white">
                      {t.netProfit} {totalReturn.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="premium-card p-8 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-[40px] rounded-full group-hover:bg-red-500/10 transition-all duration-700" />
                <div className="relative z-10">
                  <p className="font-sans text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    {t.currentFeeDeducted}
                  </p>
                  <motion.h2 
                    key={remainingFee}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-heading text-4xl lg:text-5xl font-black text-red-500 mb-2 tracking-tight"
                  >
                    {remainingFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-2xl">{t.currency}</span>
                  </motion.h2>
                  <div className="mt-6 font-sans text-xs font-medium text-muted-foreground">
                    {days >= 365 ? (
                      <span className="text-emerald-500 font-bold flex items-center gap-2 bg-emerald-500/10 px-4 py-2.5 rounded-full w-max border border-emerald-500/20">
                        <CheckCircle2 className="w-4 h-4" /> {t.congratsFreeExit}
                      </span>
                    ) : (
                      <span className="flex flex-col gap-1">
                        <span>{t.feeExemption} <strong className="text-foreground">{consumedFee.toLocaleString(undefined, { maximumFractionDigits: 1 })}</strong> {t.fromOriginalFee}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Box */}
            <div className="glass p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden">
              <h3 className="font-heading text-xl font-bold mb-8 flex items-center gap-3 border-b border-border/50 pb-6">
                <History className="w-5 h-5 text-blue-500" />
                {t.analysisTitle} ({t.after} {days} {days === 1 ? t.day : t.days})
              </h3>

              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm md:text-base">
                  <span className="text-muted-foreground font-medium">
                    {t.currentMarketValue} <span className="text-xs opacity-70">({numUnits.toFixed(2)} {t.unit} × {sellPrice} {t.currency})</span>
                  </span>
                  <span className="font-heading font-bold text-foreground text-lg">
                    {currentGrossValue.toLocaleString()} {t.currency}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm md:text-base text-red-500">
                  <span className="flex items-center gap-2 font-medium">
                    {t.unconsumedFee} <span className="text-xs opacity-70">({365 - days} {t.daysRemaining})</span>
                    <span title={lang === "ar" ? "يتم خصم الجزء الذي لم يستهلك بعد من عمولة الـ 4%" : "The unconsumed portion of the 4% fee is deducted"}>
                      <Info className="w-4 h-4 opacity-50" />
                    </span>
                  </span>
                  <span className="font-heading font-bold text-lg">
                    -{remainingFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {t.currency}
                  </span>
                </div>
                
                <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className="font-heading font-bold text-foreground text-xl">
                    {t.totalAmountReceived}
                  </span>
                  <span className="font-heading font-black text-2xl text-blue-500">
                    {netPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {t.currency}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-10">
                <div className="flex justify-between items-end mb-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t.progressToExemption}
                  </p>
                  <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md">{Math.round((days/365)*100)}%</span>
                </div>
                <div className="w-full bg-secondary h-3 rounded-full overflow-hidden border border-border/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (days / 365) * 100)}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`h-full relative ${days >= 365 ? "bg-emerald-500" : "bg-gradient-to-r from-blue-600 to-blue-400"}`}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                  </motion.div>
                </div>
                <div className="flex justify-between mt-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span>{t.day1FullDeduction}</span>
                  <span>{t.day365Free}</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Note Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 glass border-amber-500/20 bg-amber-500/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-500/20">
            <Info className="w-6 h-6 text-amber-500" />
          </div>
          <div className="font-sans text-amber-600/90 dark:text-amber-400/90 text-sm md:text-base leading-relaxed max-w-4xl">
            <strong className="block text-amber-600 dark:text-amber-400 font-bold mb-2 uppercase tracking-widest text-xs">{t.reminder}</strong> 
            {t.reminderText}
          </div>
        </motion.div>

      </div>
      <Footer t={globalT} lang={lang} />
    </div>
  );
}
