/* Bilingual content for the legal pages (Privacy, Terms, FRA Disclosures).
   English text mirrors the approved production copy verbatim; Arabic is the
   official translation. Structure only here — presentation lives in LegalPage. */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "note"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "kv"; rows: { k: string; v: string; ltr?: boolean; href?: string }[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "sub"; title: string; blocks: LegalBlock[] }
  | { type: "cards"; items: { title: string; text: string }[] }
  | { type: "links"; items: { label: string; href: string }[] };

export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };

export type LegalDoc = {
  eyebrow: string;
  title: string;
  intro: string;
  meta: string[];
  tocTitle: string;
  backHome: string;
  breadcrumbHome: string;
  sections: LegalSection[];
};

export type LegalSlug = "privacy" | "terms" | "fra";

const chrome = {
  en: { tocTitle: "On this page", backHome: "Back to Home", breadcrumbHome: "Home" },
  ar: { tocTitle: "محتويات الصفحة", backHome: "العودة إلى الرئيسية", breadcrumbHome: "الرئيسية" },
};

/* ─────────────────────────── PRIVACY ─────────────────────────── */

const privacyEn: LegalDoc = {
  ...chrome.en,
  eyebrow: "Privacy Notice",
  title: "Privacy Policy",
  intro:
    "This Notice is addressed to you as a visitor to our website or a client of Mubasher Holding for Financial Investments. It explains how we collect and process your personal data and the rights guaranteed to you by law. Please read it carefully.",
  meta: ["Personal Data Protection Law No. 151 of 2020", "Executive Regulation No. 816 of 2025"],
  sections: [
    {
      id: "identity",
      title: "Company Identity and Contact Information",
      blocks: [
        { type: "p", text: "The entity controlling your personal data is:" },
        {
          type: "kv",
          rows: [
            { k: "Company Name", v: "Mubasher Holding for Financial Investments" },
            { k: "Address", v: "22 Anwar Al Mofty Street, Taiba 2000 Administrative Building, Nasr City, Cairo, Egypt" },
            { k: "Phone", v: "T: +20 (0)2 2264 9911", ltr: true },
            { k: "Website", v: "https://mubashercapitalholding.com/", ltr: true, href: "https://mubashercapitalholding.com/" },
          ],
        },
        {
          type: "p",
          text: "Mubasher Holding for Financial Investments is responsible for protecting your data as a client or visitor of Mubasher Holding for Financial Investments or any of its affiliates.",
        },
      ],
    },
    {
      id: "dpo",
      title: "Data Protection Officer (DPO)",
      blocks: [
        { type: "p", text: "Mubasher Holding for Financial Investments has appointed a Data Protection Officer whom you may contact directly:" },
        { type: "kv", rows: [{ k: "Job Title", v: "Data Protection Officer (DPO)" }] },
      ],
    },
    {
      id: "categories",
      title: "Categories of Personal Data We Collect",
      blocks: [
        {
          type: "sub",
          title: "a. Personal Data",
          blocks: [
            {
              type: "ul",
              items: [
                "Identity data: full name, national ID card or passport, date of birth, nationality, and the selfie you provide during the identity verification process, which may undergo automated facial-matching processing and, in that case, is treated as sensitive biometric data collected under your explicit written consent; the process may include human review.",
                "Contact data: address, email, phone numbers, and your location via the Global Positioning System (GPS). We collect GPS location data — after obtaining your permission — for identity verification, fraud prevention, and compliance with regulatory requirements (Know Your Customer). You may disable this permission at any time from your device settings, noting that this may affect the availability of certain services.",
                "Website data: IP address, browsing data, cookies, information about the device used, and your account details (including username and password) relating to the accounts used to access our website and/or mobile application.",
                "Communication records: correspondence via email or phone, and contact forms.",
              ],
            },
          ],
        },
        {
          type: "sub",
          title: "b. Professional and Commercial Data",
          blocks: [
            { type: "note", text: "Note: We collect certain commercial data relating to your company, such as:" },
            {
              type: "ul",
              items: [
                "Professional and commercial data: Company name, company financial profile, company commercial registration number, annual sales volume, shareholder structure, and delegation form.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "legal-basis",
      title: "Legal Basis for Processing",
      blocks: [
        { type: "p", text: "We process your personal data on the following legal bases under Article 6 of Law No. 151 of 2020:" },
        {
          type: "table",
          head: ["Legal Basis", "Associated Purposes"],
          rows: [
            ["Performance of a contract", "Performance of contracts based on the requested services."],
            ["Legal obligation", "Compliance with the requirements of the Central Bank of Egypt and the Financial Regulatory Authority, anti-money laundering and counter-terrorism financing requirements, and tax reporting requirements."],
            ["Consent", "Sending newsletters and marketing communications and using analytical and non-essential cookies. You may withdraw your consent at any time."],
            ["Legitimate interests", "Operating the website and ensuring its security and continuity, improving user experience, managing client relationships, and preventing fraud."],
            ["Establishment, Exercise, or Defence of Legal Claims", "Maintaining the necessary documents in the event of disputes or legal proceedings."],
            ["Execution of a Judicial Order or an Order Issued by a Competent Investigative Authority", "Responding to requests from Egyptian regulatory and judicial authorities."],
          ],
        },
      ],
    },
    {
      id: "purposes",
      title: "Purposes of Processing",
      blocks: [
        {
          type: "ul",
          items: [
            "To enter into a contract with you or to take steps related to entering into a contract with you.",
            "To create an account for you and provide our services to you after contracting with you, in accordance with the terms and conditions of that contract.",
            "To comply with applicable laws.",
            "For administrative, assessment, and analytical purposes relating to our services.",
            "To verify your identity.",
            "To monitor and analyze the use of our services for system administration, operation, testing, and support purposes.",
            "To manage our information technology and ensure the security of our systems.",
            "To establish, exercise, and/or defend legal claims or rights.",
            "To investigate and respond to any enquiries or issues.",
            "To verify and enforce compliance with our terms and conditions or other contractual terms.",
            "To improve and develop the products and services we provide.",
            "To provide you with information about our Group's services and products and/or any additional products and services that we believe may interest you. This information may be provided in the form of advertisements and digital campaigns, or by email or SMS.",
            "To identify products or services that we believe may interest you by using cookies or similar tracking technologies on our services, which track and analyze how you use them.",
            "To retain a copy of your correspondence with us.",
          ],
        },
      ],
    },
    {
      id: "recipients",
      title: "Recipients of Your Personal Data",
      blocks: [
        { type: "p", text: "We may share your data with the following parties where necessary:" },
        {
          type: "ul",
          items: [
            "Mubasher Holding for Financial Investments Group affiliates: for operational and administrative support purposes under written agreements.",
            "Service providers: contracted hosting, email, and analytics companies (data processors committed to protecting your data based on Data Processing Agreements).",
            "Courts and investigative authorities: pursuant to valid legal orders.",
          ],
        },
        {
          type: "note",
          text: "We do not sell your personal data to any external party, nor do we use it for commercial purposes outside the scope of Mubasher Holding for Financial Investments's services.",
        },
      ],
    },
    {
      id: "transfers",
      title: "International Transfers of Personal Data",
      blocks: [
        {
          type: "p",
          text: "Due to the nature of our business and our reliance on international technology and operational service providers, some of your personal data may be transferred outside the Arab Republic of Egypt to multiple countries within and outside the Middle East and North Africa, Europe, the Americas, and Asia.",
        },
        {
          type: "p",
          text: "Where the provision of services requires transferring your data outside the Arab Republic of Egypt, we apply the following safeguards in accordance with Executive Regulation No. 816 of 2025 of the Personal Data Protection Law:",
        },
        {
          type: "ul",
          items: [
            "Obtaining a cross-border data transfer permit from the Personal Data Protection Centre.",
            "Verifying that the recipient country provides an adequate level of protection equivalent to that provided in the Arab Republic of Egypt.",
            "Entering data processing agreements that require the recipient to comply with the same standards applicable to us.",
            "Relying on the legal mechanisms approved by the Personal Data Protection Centre.",
          ],
        },
      ],
    },
    {
      id: "retention",
      title: "Data Retention Periods",
      blocks: [
        {
          type: "p",
          text: "We retain your personal data for the period necessary to fulfil the purpose for which it was collected, or for the period required by law, whichever is longer:",
        },
        {
          type: "table",
          head: ["Data Category", "Retention Period", "Legal Basis for Retention"],
          rows: [
            ["Client identity data (name, ID number, address)", "5 years from the end of the contractual relationship", "Legal obligation — Anti-Money Laundering Law No. 80 of 2002"],
            ["Financial data and transaction records", "5 years from the transaction completion date", "Legal obligation — Anti-Money Laundering Law No. 80 of 2002"],
            ["Browsing data and analytical cookies", "5 years", "Client Consent"],
            ["Correspondence and enquiry records", "5 years from the correspondence date", "Legal obligation / Legitimate interests"],
            ["Marketing communications data", "5 years from last contact or until consent is withdrawn", "Client Consent"],
            ["Data relating to claims or legal disputes", "Until legal proceedings are finally concluded", "Establishment, exercise, or defence of legal claims"],
          ],
        },
      ],
    },
    {
      id: "rights",
      title: "Your Personal Data Protection Rights",
      blocks: [
        {
          type: "p",
          text: "Law No. 151 of 2020 guarantees you the following rights, and the controller must respond within six (6) working days of receiving your request:",
        },
        {
          type: "cards",
          items: [
            { title: "Right to Be Informed and Notified", text: "The right to know how your data is processed and to be notified in the event of a data breach within 3 working days of notifying the Personal Data Protection Centre." },
            { title: "Right of Access and to Obtain a Copy", text: "The right to access your personal data and obtain a copy thereof." },
            { title: "Right to Rectification", text: "The right to request correction of inaccurate or incomplete data." },
            { title: "Right to Erasure (Right to Be Forgotten)", text: "The right to request deletion of your data when the purpose of processing has been fulfilled or consent has been withdrawn. Subject to applicable legal obligations." },
            { title: "Right to Restriction of Processing", text: "The right to restrict processing of your data and limit it to storage in certain circumstances." },
            { title: "Right to Object", text: "The right to object to processing that conflicts with your rights or causes material or moral harm." },
            { title: "Right to Data Portability", text: "The right to request transfer of your data to another controller in a structured, machine-readable format." },
            { title: "Right to Withdraw Consent", text: "The right to withdraw your consent at any time without affecting the lawfulness of prior processing." },
          ],
        },
        { type: "p", text: "To exercise any of these rights, please contact the Data Protection Officer using the details in Section 2 above." },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and Similar Technologies",
      blocks: [
        {
          type: "ul",
          items: [
            "Strictly necessary cookies: Essential for website operation and do not require consent.",
            "Performance/analytical cookies: Used to measure and improve website use and require your consent.",
            "Social media cookies: Facebook and Twitter sharing requires your consent.",
          ],
        },
        { type: "p", text: "You may manage your preferences or withdraw your consent at any time through the cookie preferences tool at the bottom of our website." },
      ],
    },
    {
      id: "sources",
      title: "Sources of Your Personal Data",
      blocks: [
        {
          type: "ul",
          items: [
            "Directly from you: Through registration and contact forms.",
            "Automatically: Browsing data and IP address when you visit our website.",
            "From external parties (third parties): Entities within the Company's group (the \"Group\"), whose identities can be found through the link referred to in Section 6 above; and publicly available sources, including publicly available online profiles and databases, for the purposes of establishing and verifying your identity, deriving your contact details, and supplementing the contact information we hold about you.",
            "Through cookies and similar technologies: As described in Section 10 above.",
            "By email: We retain copies of correspondence for documentation and legal compliance purposes.",
          ],
        },
      ],
    },
    {
      id: "complaints",
      title: "Complaints and Redress Mechanism",
      blocks: [
        {
          type: "sub",
          title: "a. Contact Mubasher First",
          blocks: [
            { type: "p", text: "We encourage you to contact the Data Protection Officer (Section 2) to resolve any concern relating to your data. We will respond within six (6) working days." },
          ],
        },
        {
          type: "sub",
          title: "b. Lodge a Complaint with the Personal Data Protection Centre (PDPC)",
          blocks: [
            { type: "p", text: "If the matter is not resolved, you have the right to lodge a complaint directly with the Egyptian Personal Data Protection Centre:" },
            {
              type: "kv",
              rows: [
                { k: "Authority", v: "Personal Data Protection Centre (PDPC)" },
                { k: "Website", v: "www.pdpc.gov.eg", ltr: true, href: "https://www.pdpc.gov.eg" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const privacyAr: LegalDoc = {
  ...chrome.ar,
  eyebrow: "إشعار الخصوصية",
  title: "سياسة الخصوصية",
  intro:
    "هذا الإشعار موجَّه إليكم بصفتكم زائراً لموقعنا الإلكتروني أو عميلاً لشركة مباشر القابضة للاستثمارات المالية. وهو يوضح كيفية جمعنا لبياناتكم الشخصية ومعالجتها، والحقوق التي يكفلها لكم القانون. يرجى قراءته بعناية.",
  meta: ["قانون حماية البيانات الشخصية رقم 151 لسنة 2020", "اللائحة التنفيذية رقم 816 لسنة 2025"],
  sections: [
    {
      id: "identity",
      title: "هوية الشركة وبيانات الاتصال",
      blocks: [
        { type: "p", text: "الجهة المتحكمة في بياناتكم الشخصية هي:" },
        {
          type: "kv",
          rows: [
            { k: "اسم الشركة", v: "مباشر القابضة للاستثمارات المالية" },
            { k: "العنوان", v: "22 شارع أنور المفتي، مبنى طيبة 2000 الإداري، مدينة نصر، القاهرة، مصر" },
            { k: "الهاتف", v: "+20 (0)2 2264 9911", ltr: true },
            { k: "الموقع الإلكتروني", v: "https://mubashercapitalholding.com/", ltr: true, href: "https://mubashercapitalholding.com/" },
          ],
        },
        {
          type: "p",
          text: "تتولى شركة مباشر القابضة للاستثمارات المالية مسؤولية حماية بياناتكم بصفتكم عميلاً أو زائراً للشركة أو لأي من شركاتها التابعة.",
        },
      ],
    },
    {
      id: "dpo",
      title: "مسؤول حماية البيانات (DPO)",
      blocks: [
        { type: "p", text: "عيَّنت شركة مباشر القابضة للاستثمارات المالية مسؤولاً لحماية البيانات يمكنكم التواصل معه مباشرة:" },
        { type: "kv", rows: [{ k: "المسمى الوظيفي", v: "مسؤول حماية البيانات (DPO)" }] },
      ],
    },
    {
      id: "categories",
      title: "فئات البيانات الشخصية التي نجمعها",
      blocks: [
        {
          type: "sub",
          title: "أ. البيانات الشخصية",
          blocks: [
            {
              type: "ul",
              items: [
                "بيانات الهوية: الاسم الكامل، بطاقة الرقم القومي أو جواز السفر، تاريخ الميلاد، الجنسية، والصورة الذاتية التي تقدمونها أثناء عملية التحقق من الهوية، والتي قد تخضع لمعالجة آلية لمطابقة ملامح الوجه وتُعامل في هذه الحالة كبيانات بيومترية حساسة تُجمع بموجب موافقتكم الكتابية الصريحة؛ وقد تتضمن العملية مراجعة بشرية.",
                "بيانات الاتصال: العنوان، والبريد الإلكتروني، وأرقام الهاتف، وموقعكم الجغرافي عبر نظام تحديد المواقع العالمي (GPS). ونجمع بيانات الموقع الجغرافي — بعد الحصول على إذنكم — لأغراض التحقق من الهوية ومنع الاحتيال والامتثال للمتطلبات الرقابية (اعرف عميلك). ويمكنكم تعطيل هذا الإذن في أي وقت من إعدادات جهازكم، علماً بأن ذلك قد يؤثر على إتاحة بعض الخدمات.",
                "بيانات الموقع الإلكتروني: عنوان بروتوكول الإنترنت (IP)، وبيانات التصفح، وملفات تعريف الارتباط، ومعلومات عن الجهاز المستخدم، وتفاصيل حسابكم (بما في ذلك اسم المستخدم وكلمة المرور) المتعلقة بالحسابات المستخدمة للوصول إلى موقعنا الإلكتروني و/أو تطبيق الهاتف المحمول.",
                "سجلات التواصل: المراسلات عبر البريد الإلكتروني أو الهاتف، ونماذج الاتصال.",
              ],
            },
          ],
        },
        {
          type: "sub",
          title: "ب. البيانات المهنية والتجارية",
          blocks: [
            { type: "note", text: "ملاحظة: نجمع بعض البيانات التجارية المتعلقة بشركتكم، مثل:" },
            {
              type: "ul",
              items: [
                "البيانات المهنية والتجارية: اسم الشركة، والملف المالي للشركة، ورقم السجل التجاري للشركة، وحجم المبيعات السنوي، وهيكل المساهمين، ونموذج التفويض.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "legal-basis",
      title: "الأساس القانوني للمعالجة",
      blocks: [
        { type: "p", text: "نعالج بياناتكم الشخصية استناداً إلى الأسس القانونية التالية بموجب المادة (6) من القانون رقم 151 لسنة 2020:" },
        {
          type: "table",
          head: ["الأساس القانوني", "الأغراض المرتبطة به"],
          rows: [
            ["تنفيذ عقد", "تنفيذ العقود المبرمة بناءً على الخدمات المطلوبة."],
            ["التزام قانوني", "الامتثال لمتطلبات البنك المركزي المصري والهيئة العامة للرقابة المالية، ومتطلبات مكافحة غسل الأموال وتمويل الإرهاب، ومتطلبات الإقرارات الضريبية."],
            ["الموافقة", "إرسال النشرات الإخبارية والرسائل التسويقية واستخدام ملفات تعريف الارتباط التحليلية وغير الضرورية. ويجوز لكم سحب موافقتكم في أي وقت."],
            ["المصلحة المشروعة", "تشغيل الموقع الإلكتروني وضمان أمنه واستمراريته، وتحسين تجربة المستخدم، وإدارة العلاقات مع العملاء، ومنع الاحتيال."],
            ["إنشاء المطالبات القانونية أو ممارستها أو الدفاع عنها", "الاحتفاظ بالمستندات اللازمة في حال نشوء منازعات أو إجراءات قانونية."],
            ["تنفيذ أمر قضائي أو أمر صادر عن جهة تحقيق مختصة", "الاستجابة لطلبات الجهات الرقابية والقضائية المصرية."],
          ],
        },
      ],
    },
    {
      id: "purposes",
      title: "أغراض المعالجة",
      blocks: [
        {
          type: "ul",
          items: [
            "إبرام عقد معكم أو اتخاذ خطوات تتعلق بإبرام عقد معكم.",
            "إنشاء حساب لكم وتقديم خدماتنا إليكم بعد التعاقد معكم، وفقاً لشروط وأحكام ذلك العقد.",
            "الامتثال للقوانين المعمول بها.",
            "الأغراض الإدارية والتقييمية والتحليلية المتعلقة بخدماتنا.",
            "التحقق من هويتكم.",
            "مراقبة وتحليل استخدام خدماتنا لأغراض إدارة الأنظمة وتشغيلها واختبارها ودعمها.",
            "إدارة تقنية المعلومات لدينا وضمان أمن أنظمتنا.",
            "إنشاء المطالبات أو الحقوق القانونية و/أو ممارستها و/أو الدفاع عنها.",
            "التحقيق في أي استفسارات أو مشكلات والرد عليها.",
            "التحقق من الامتثال لشروطنا وأحكامنا أو أي شروط تعاقدية أخرى وإنفاذها.",
            "تحسين وتطوير المنتجات والخدمات التي نقدمها.",
            "تزويدكم بمعلومات عن خدمات ومنتجات مجموعتنا و/أو أي منتجات وخدمات إضافية نعتقد أنها قد تهمكم. وقد تُقدَّم هذه المعلومات في صورة إعلانات وحملات رقمية، أو عبر البريد الإلكتروني أو الرسائل النصية القصيرة.",
            "تحديد المنتجات أو الخدمات التي نعتقد أنها قد تهمكم باستخدام ملفات تعريف الارتباط أو تقنيات التتبع المشابهة على خدماتنا، والتي تتتبع وتحلل كيفية استخدامكم لها.",
            "الاحتفاظ بنسخة من مراسلاتكم معنا.",
          ],
        },
      ],
    },
    {
      id: "recipients",
      title: "الجهات المتلقية لبياناتكم الشخصية",
      blocks: [
        { type: "p", text: "قد نشارك بياناتكم مع الجهات التالية عند الضرورة:" },
        {
          type: "ul",
          items: [
            "الشركات التابعة لمجموعة مباشر القابضة للاستثمارات المالية: لأغراض الدعم التشغيلي والإداري بموجب اتفاقيات مكتوبة.",
            "مقدمو الخدمات: شركات الاستضافة والبريد الإلكتروني والتحليلات المتعاقد معها (جهات معالجة ملتزمة بحماية بياناتكم بموجب اتفاقيات معالجة البيانات).",
            "المحاكم وجهات التحقيق: بموجب أوامر قانونية سارية.",
          ],
        },
        {
          type: "note",
          text: "لا نبيع بياناتكم الشخصية لأي طرف خارجي، ولا نستخدمها لأغراض تجارية خارج نطاق خدمات شركة مباشر القابضة للاستثمارات المالية.",
        },
      ],
    },
    {
      id: "transfers",
      title: "نقل البيانات الشخصية خارج الحدود",
      blocks: [
        {
          type: "p",
          text: "نظراً لطبيعة أعمالنا واعتمادنا على مقدمي خدمات تقنية وتشغيلية دوليين، قد تُنقل بعض بياناتكم الشخصية خارج جمهورية مصر العربية إلى دول متعددة داخل منطقة الشرق الأوسط وشمال أفريقيا وخارجها، وفي أوروبا والأمريكتين وآسيا.",
        },
        {
          type: "p",
          text: "وحيثما تطلب الخدمات نقل بياناتكم خارج جمهورية مصر العربية، فإننا نطبق الضمانات التالية وفقاً لأحكام اللائحة التنفيذية رقم 816 لسنة 2025 لقانون حماية البيانات الشخصية:",
        },
        {
          type: "ul",
          items: [
            "الحصول على تصريح نقل البيانات عبر الحدود من مركز حماية البيانات الشخصية.",
            "التحقق من أن دولة المتلقي توفر مستوى حماية ملائماً يعادل المستوى المقرر في جمهورية مصر العربية.",
            "إبرام اتفاقيات معالجة بيانات تُلزم المتلقي بالامتثال لذات المعايير المطبقة علينا.",
            "الاعتماد على الآليات القانونية المعتمدة من مركز حماية البيانات الشخصية.",
          ],
        },
      ],
    },
    {
      id: "retention",
      title: "مدد الاحتفاظ بالبيانات",
      blocks: [
        {
          type: "p",
          text: "نحتفظ ببياناتكم الشخصية للمدة اللازمة لتحقيق الغرض الذي جُمعت من أجله، أو للمدة التي يوجبها القانون، أيهما أطول:",
        },
        {
          type: "table",
          head: ["فئة البيانات", "مدة الاحتفاظ", "الأساس القانوني للاحتفاظ"],
          rows: [
            ["بيانات هوية العميل (الاسم، رقم الهوية، العنوان)", "5 سنوات من انتهاء العلاقة التعاقدية", "التزام قانوني — قانون مكافحة غسل الأموال رقم 80 لسنة 2002"],
            ["البيانات المالية وسجلات المعاملات", "5 سنوات من تاريخ إتمام المعاملة", "التزام قانوني — قانون مكافحة غسل الأموال رقم 80 لسنة 2002"],
            ["بيانات التصفح وملفات تعريف الارتباط التحليلية", "5 سنوات", "موافقة العميل"],
            ["سجلات المراسلات والاستفسارات", "5 سنوات من تاريخ المراسلة", "التزام قانوني / مصلحة مشروعة"],
            ["بيانات الاتصالات التسويقية", "5 سنوات من آخر تواصل أو حتى سحب الموافقة", "موافقة العميل"],
            ["البيانات المتعلقة بالمطالبات أو المنازعات القانونية", "حتى انتهاء الإجراءات القانونية نهائياً", "إنشاء المطالبات القانونية أو ممارستها أو الدفاع عنها"],
          ],
        },
      ],
    },
    {
      id: "rights",
      title: "حقوقكم في حماية البيانات الشخصية",
      blocks: [
        {
          type: "p",
          text: "يكفل لكم القانون رقم 151 لسنة 2020 الحقوق التالية، ويلتزم المتحكم بالرد خلال ستة (6) أيام عمل من تاريخ استلام طلبكم:",
        },
        {
          type: "cards",
          items: [
            { title: "الحق في العلم والإخطار", text: "الحق في معرفة كيفية معالجة بياناتكم، وفي إخطاركم في حال حدوث اختراق للبيانات خلال 3 أيام عمل من إخطار مركز حماية البيانات الشخصية." },
            { title: "الحق في الاطلاع والحصول على نسخة", text: "الحق في الاطلاع على بياناتكم الشخصية والحصول على نسخة منها." },
            { title: "الحق في التصحيح", text: "الحق في طلب تصحيح البيانات غير الدقيقة أو غير المكتملة." },
            { title: "الحق في المحو (الحق في النسيان)", text: "الحق في طلب حذف بياناتكم متى تحقق الغرض من المعالجة أو سُحبت الموافقة، وذلك مع مراعاة الالتزامات القانونية المعمول بها." },
            { title: "الحق في تقييد المعالجة", text: "الحق في تقييد معالجة بياناتكم وقصرها على التخزين في أحوال معينة." },
            { title: "الحق في الاعتراض", text: "الحق في الاعتراض على المعالجة التي تتعارض مع حقوقكم أو تُلحق بكم ضرراً مادياً أو معنوياً." },
            { title: "الحق في نقل البيانات", text: "الحق في طلب نقل بياناتكم إلى متحكم آخر في صيغة منظمة وقابلة للقراءة آلياً." },
            { title: "الحق في سحب الموافقة", text: "الحق في سحب موافقتكم في أي وقت دون المساس بمشروعية المعالجة السابقة." },
          ],
        },
        { type: "p", text: "لممارسة أي من هذه الحقوق، يرجى التواصل مع مسؤول حماية البيانات باستخدام البيانات الواردة في البند (2) أعلاه." },
      ],
    },
    {
      id: "cookies",
      title: "ملفات تعريف الارتباط والتقنيات المشابهة",
      blocks: [
        {
          type: "ul",
          items: [
            "ملفات تعريف الارتباط الضرورية للغاية: أساسية لتشغيل الموقع الإلكتروني ولا تتطلب موافقة.",
            "ملفات تعريف الارتباط الخاصة بالأداء/التحليل: تُستخدم لقياس استخدام الموقع وتحسينه وتتطلب موافقتكم.",
            "ملفات تعريف الارتباط الخاصة بوسائل التواصل الاجتماعي: تتطلب المشاركة عبر فيسبوك وتويتر موافقتكم.",
          ],
        },
        { type: "p", text: "يمكنكم إدارة تفضيلاتكم أو سحب موافقتكم في أي وقت من خلال أداة تفضيلات ملفات تعريف الارتباط أسفل موقعنا الإلكتروني." },
      ],
    },
    {
      id: "sources",
      title: "مصادر بياناتكم الشخصية",
      blocks: [
        {
          type: "ul",
          items: [
            "منكم مباشرة: من خلال نماذج التسجيل والتواصل.",
            "تلقائياً: بيانات التصفح وعنوان بروتوكول الإنترنت (IP) عند زيارتكم لموقعنا.",
            "من أطراف خارجية (الغير): الكيانات التابعة لمجموعة الشركة («المجموعة»)، والتي يمكن الاطلاع على هوياتها من خلال الرابط المشار إليه في البند (6) أعلاه؛ والمصادر المتاحة للجمهور، بما في ذلك الملفات التعريفية وقواعد البيانات المتاحة للجمهور عبر الإنترنت، وذلك لأغراض إثبات هويتكم والتحقق منها، واستخلاص بيانات الاتصال الخاصة بكم، واستكمال معلومات الاتصال التي نحتفظ بها عنكم.",
            "من خلال ملفات تعريف الارتباط والتقنيات المشابهة: على النحو الموضح في البند (10) أعلاه.",
            "عبر البريد الإلكتروني: نحتفظ بنسخ من المراسلات لأغراض التوثيق والامتثال القانوني.",
          ],
        },
      ],
    },
    {
      id: "complaints",
      title: "آلية الشكاوى والتظلم",
      blocks: [
        {
          type: "sub",
          title: "أ. التواصل مع مباشر أولاً",
          blocks: [
            { type: "p", text: "نشجعكم على التواصل مع مسؤول حماية البيانات (البند 2) لتسوية أي شاغل يتعلق ببياناتكم، وسنقوم بالرد خلال ستة (6) أيام عمل." },
          ],
        },
        {
          type: "sub",
          title: "ب. تقديم شكوى إلى مركز حماية البيانات الشخصية",
          blocks: [
            { type: "p", text: "إذا لم تتم تسوية الأمر، يحق لكم تقديم شكوى مباشرة إلى مركز حماية البيانات الشخصية المصري:" },
            {
              type: "kv",
              rows: [
                { k: "الجهة", v: "مركز حماية البيانات الشخصية" },
                { k: "الموقع الإلكتروني", v: "www.pdpc.gov.eg", ltr: true, href: "https://www.pdpc.gov.eg" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

/* ─────────────────────────── TERMS ─────────────────────────── */

const termsEn: LegalDoc = {
  ...chrome.en,
  eyebrow: "Legal",
  title: "Terms and Conditions",
  intro: "The terms and conditions governing your access to and use of this Website and the Mubasher Data made available on it.",
  meta: ["Governing law: Arab Republic of Egypt", "Arbitration: CRCICA — Cairo"],
  sections: [
    {
      id: "agreement",
      title: "Terms and Conditions",
      blocks: [
        {
          type: "p",
          text: "https://mubashercapitalholding.com/ (the \"Website\") is administered by Mubasher Holding for Financial Investments. and its affiliates (collectively, \"Mubasher\"). By accessing the Website, you agree to be bound by the terms and conditions set out below (the \"Terms and Conditions\"). You acknowledge, agree, and declare that Mubasher reserves the right to amend the Terms and Conditions, at any time, at its sole discretion, by posting a revised version and, if Mubasher considers it necessary, Mubasher will notify you of any changes. You acknowledge, agree, and declare to be bound by any amendments to the Terms and Conditions.",
        },
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimer; No Warranty; Limitation on Liability",
      blocks: [
        {
          type: "p",
          text: "You acknowledge, agree, and declare that the information, the content, the data, and the services which appear on the Website or which are made available to you by Mubasher (or by any third party) on the Website (the \"Mubasher Data\") are not intended for distribution to, or use by, any person or entity in any jurisdiction or country where such distribution or use (i) would be contrary to any applicable laws or regulations, or (ii) would subject Mubasher (or the relevant third party) to any registration requirement within such jurisdiction or country.",
        },
        {
          type: "p",
          text: "You acknowledge, agree, and declare that the Mubasher Data is provided on an \"as is\" basis. You acknowledge, agree, and declare that Mubasher does not warrant the accuracy, validity, completeness, timeliness, usefulness, subject matter, and/or quality of the Mubasher Data, either expressly or impliedly, for any particular purpose, and Mubasher expressly disclaims any warranties of merchantability or fitness for a particular purpose.",
        },
        {
          type: "p",
          text: "You acknowledge, agree, and declare that Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, assigns, and any third party contractors thereof shall not be liable for any claims, actions, losses, liabilities, costs, damages (financial, moral, or otherwise), and expenses (including, without limitation, attorney's fees, charges and disbursements) (the \"Losses\") incurred by you as a result of your reliance on/use of the Mubasher Data.",
        },
        {
          type: "p",
          text: "You acknowledge, agree, and declare that Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, assigns, and any third party contractors thereof shall not be liable for any Losses incurred by you, as a result of (i) any failure or interruption affecting the Website, (ii) any act or omission of any party involved in making the Website or the Mubasher Data available to you, or (iii) any other cause relating to your access to/use of the Website or inability to access/use the Website, in each case, whether or not the circumstances giving rise to such cause may have been within the control of Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, and assigns, or any third party contractors thereof providing software or services support.",
        },
        {
          type: "p",
          text: "You acknowledge, agree, and declare that in no event shall Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, assigns, and any third party contractors thereof be liable to you for any direct, special, indirect, consequential, incidental damages or any other damages (including, but not limited to, loss of profits, income, revenue, goodwill, data, and/or any and all intangible damages) of any kind even if Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, assigns, and any third party contractors thereof have been advised of the possibility thereof.",
        },
      ],
    },
    {
      id: "third-party",
      title: "No Representations Made as to Other Sites or Links",
      blocks: [
        {
          type: "p",
          text: "You acknowledge, agree, and declare that in the event that you access a link contained on the Website, and you view/access information, content, data, services, and software that is not provided/made available by Mubasher (the \"Third Party Data\"), you do so at your own risk. You acknowledge, agree, and declare that (i) the Third Party Data will not have been developed or otherwise reviewed by Mubasher, and (ii) Mubasher does not warrant the accuracy, validity, completeness, timeliness, usefulness, subject matter, and/or quality of the Third Party Data, in which case, you acknowledge, agree, and declare that Mubasher shall not be liable for any Losses incurred by you as a result of (a) your reliance on the Third Party Data, or (b) any delays, defects, and/or omissions that may exist in the Third Party Data, whether actual, alleged, consequential, or punitive.",
        },
        {
          type: "p",
          text: "You acknowledge, agree, and declare that Mubasher does not warrant the accuracy, validity, completeness, timeliness, usefulness, subject matter, and/or quality of any electronic content provided/made available by any third party (including, but not limited to, the Third Party Data), in which case, you acknowledge, agree, and declare that Mubasher shall not be liable for any Losses incurred by you as a result of relying on any electronic content provided/made available by any third party (including, but not limited to, the Third Party Data).",
        },
      ],
    },
    {
      id: "copyright",
      title: "Copyright",
      blocks: [
        {
          type: "p",
          text: "You undertake not to (i) download any portion of the Mubasher Data, (ii) copy, reproduce, republish, distribute, and/or transmit any portion of the Mubasher Data, and/or (iii) remove or obscure any copyright or other notices or legends contained in any such Mubasher Data.",
        },
      ],
    },
    {
      id: "no-advice",
      title: "Data Not to Be Construed as Advice or Solicitation or Recommendation",
      blocks: [
        {
          type: "p",
          text: "You acknowledge, agree, and declare that your access to the Website and your access to the Mubasher Data shall not to be construed as (i) an investment advice made by Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, assigns, and/or any third party contractors thereof, (ii) an offer by Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, assigns, and/or any third party contractors thereof to buy or sell any security, and/or (iii) a solicitation by Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, assigns, and/or any third party contractors thereof for an offer to buy or sell any security, financial product, or instrument, or to participate in any particular trading strategy, and in each case, in any jurisdiction in which such an offer, solicitation, or trading strategy would be illegal. You undertake to seek financial guidance when determining whether an investment opportunity/strategy is appropriate/suitable for you. You acknowledge, agree and declare that Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, assigns, and/or any third party contractors thereof shall not be liable for any Losses incurred by you as a result of any transaction undertaken/executed by you.",
        },
        {
          type: "p",
          text: "You acknowledge, agree, and declare that the Mubasher Data shall not be construed as business, financial, investment, hedging, trading, legal, regulatory, tax, or accounting advice, and you undertake to seek guidance from your business advisor, attorney, and tax and accounting advisors, in the event that you contemplate undertaking/executing any transaction, in which case, you acknowledge, agree and declare that Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, assigns, and/or any third party contractors thereof shall not be liable for any Losses incurred by you as a result of any transaction undertaken/executed by you.",
        },
      ],
    },
    {
      id: "risks",
      title: "Risks",
      blocks: [
        {
          type: "p",
          text: "You acknowledge, agree, and declare that (i) investing in securities is subject to various risks, including, among others, market risk, currency risk, default risk, and liquidity risk, (ii) income from securities, and their value or price may fluctuate, (iii) basis and levels of taxation may change, which would impact the expected return from such securities, and (iv) foreign currency rates of exchange may affect the value of or income from any security, in which case, you undertake to seek financial guidance when determining whether an investment opportunity/strategy is appropriate/suitable for you, and you acknowledge, agree and declare that Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, assigns, and/or any third party contractors thereof shall not be liable for any Losses incurred by you as a result of any transaction undertaken/executed by you.",
        },
        {
          type: "p",
          text: "You acknowledge, agree, and declare that any mention herein of the risks associated with undertaking/executing transactions involving the sale and purchase of securities should not be deemed to be a disclosure of all risks or a complete discussion of the risks which may materialize, in which case, you acknowledge, agree and declare that Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, assigns, and/or any third party contractors thereof shall not be liable for any Losses incurred by you as a result of any transaction undertaken/executed by you.",
        },
      ],
    },
    {
      id: "outages",
      title: "System Outages",
      blocks: [
        {
          type: "p",
          text: "You acknowledge, agree, and declare that Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, assigns, and/or any third party contractors thereof shall not be liable for any Losses incurred by you as a result of the suspension of, interruption of, or unavailability of the Website.",
        },
      ],
    },
    {
      id: "security",
      title: "Security",
      blocks: [
        {
          type: "p",
          text: "You acknowledge, agree, and declare that Mubasher takes reasonable steps to maintain the security of the Website, and you acknowledge, agree, and declare that security risks are constantly evolving, and that no platform, including the Website, is immune to cyberattacks and/or unauthorized access, and you acknowledge, agree, and declare that Mubasher cannot guarantee that an unauthorized access or breach to the Website will never occur, in which case, you acknowledge, agree, and declare that the foregoing is an inherent risk, and you acknowledge, agree, and declare that Mubasher shall not be liable for any Losses incurred by you as a result of any cyberattack, unauthorized access, hacking, or other security breaches which affect the Website. You undertake to implement your own security measures.",
        },
        {
          type: "p",
          text: "You acknowledge, agree, and declare that Mubasher may use third party service providers to support the Website's functionality, and you acknowledge, agree, and declare that these third party service providers implement their own security measures and practices, which Mubasher cannot guarantee, in which case, you acknowledge, agree, and declare that Mubasher shall not be liable for any Losses incurred by you as a result of any third party service providers' security measures and practices.",
        },
      ],
    },
    {
      id: "restricted",
      title: "Restricted Actions",
      blocks: [
        { type: "p", text: "You undertake:" },
        {
          type: "ul",
          items: [
            "not to engage in any activity that may compromise the security or integrity of the Website or the Mubasher Data;",
            "to maintain the confidentiality of any usernames, passwords, or other credentials associated with the Website (if any);",
            "not to share your credentials (if any), which are associated with the Website, with any third parties or allow unauthorized access to your accounts (if any) on the Website;",
            "to use the Website only for its intended purpose and to refrain from unauthorized access attempts, reverse engineering, or any other activity that compromises the security of the Website or its visitors/users;",
            "not to use the Website for any unlawful or unauthorized purpose, including but not limited to hacking, spamming, or distributing malware; and",
            "to promptly report any security vulnerabilities or incidents you discover to Mubasher.",
          ],
        },
      ],
    },
    {
      id: "ip",
      title: "Intellectual Property Rights",
      blocks: [
        {
          type: "p",
          text: "Mubasher warrants that it is the owner of or is licensed to use the Website and the Mubasher Data (as applicable). You acknowledge, agree, and declare that Mubasher shall retain all rights, title, and ownership of its own intellectual property rights, including, but not limited to, the Website and the Mubasher Data, and nothing herein shall be construed as granting you any intellectual property rights of Mubasher or of any third party contractors thereof. You undertake not to infringe on any of Mubasher's (or any of its third party contractors') intellectual property rights.",
        },
      ],
    },
    {
      id: "indemnification",
      title: "Indemnification",
      blocks: [
        {
          type: "p",
          text: "You undertake to indemnify and hold Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, assigns, and/or any third party contractors thereof harmless from and against any Losses incurred by Mubasher, its officers, directors, managers, partners, shareholders, agents, successors, assigns, and/or any third party contractors thereof as a result of any of your acts and/or omissions, whether or not any such act and/or omission constitutes a breach of these Terms and Conditions.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law and Dispute Resolution",
      blocks: [
        {
          type: "p",
          text: "These Terms and Conditions shall be governed by and construed in accordance with the laws of the Arab Republic of Egypt. All disputes arising out of or in connection with these Terms and Conditions, including without limitation, in relation to the interpretation or implementation thereof, shall be finally resolved by arbitration under the Arbitration Rules of the Cairo Regional Centre for International Commercial Arbitration (CRCICA) (the \"Rules\"). The number of arbitrators shall be one (1), to be appointed in accordance with such Rules. The seat of arbitration shall be Cairo, the Arab Republic of Egypt. The arbitration proceedings shall be conducted in the English language.",
        },
      ],
    },
  ],
};

const termsAr: LegalDoc = {
  ...chrome.ar,
  eyebrow: "قانوني",
  title: "الشروط والأحكام",
  intro: "الشروط والأحكام المنظِّمة لدخولكم إلى هذا الموقع الإلكتروني واستخدامكم له وللبيانات المتاحة عليه.",
  meta: ["القانون الواجب التطبيق: جمهورية مصر العربية", "التحكيم: مركز القاهرة الإقليمي للتحكيم التجاري الدولي"],
  sections: [
    {
      id: "agreement",
      title: "الشروط والأحكام",
      blocks: [
        {
          type: "p",
          text: "يُدار الموقع الإلكتروني ‎https://mubashercapitalholding.com/‎ («الموقع») بواسطة شركة مباشر القابضة للاستثمارات المالية وشركاتها التابعة (يُشار إليها مجتمعة بـ«مباشر»). وبدخولكم إلى الموقع، فإنكم توافقون على الالتزام بالشروط والأحكام المبينة أدناه («الشروط والأحكام»). وتقرون وتوافقون وتعلنون أن مباشر تحتفظ بالحق في تعديل الشروط والأحكام في أي وقت ووفقاً لتقديرها المطلق، وذلك بنشر نسخة معدَّلة، وستقوم مباشر بإخطاركم بأي تغييرات إذا رأت ضرورة لذلك. كما تقرون وتوافقون وتعلنون التزامكم بأي تعديلات تطرأ على الشروط والأحكام.",
        },
      ],
    },
    {
      id: "disclaimer",
      title: "إخلاء المسؤولية؛ عدم الضمان؛ حدود المسؤولية",
      blocks: [
        {
          type: "p",
          text: "تقرون وتوافقون وتعلنون أن المعلومات والمحتوى والبيانات والخدمات التي تظهر على الموقع أو التي تتيحها لكم مباشر (أو أي طرف ثالث) على الموقع («بيانات مباشر») ليست موجهة للتوزيع على أي شخص أو كيان أو للاستخدام من قبله في أي ولاية قضائية أو دولة يكون فيها هذا التوزيع أو الاستخدام (1) مخالفاً لأي قوانين أو لوائح معمول بها، أو (2) مُخضِعاً لمباشر (أو للطرف الثالث المعني) لأي متطلبات تسجيل داخل تلك الولاية القضائية أو الدولة.",
        },
        {
          type: "p",
          text: "تقرون وتوافقون وتعلنون أن بيانات مباشر تُقدَّم «كما هي». وتقرون وتوافقون وتعلنون أن مباشر لا تضمن دقة بيانات مباشر أو صحتها أو اكتمالها أو حداثتها أو فائدتها أو موضوعها و/أو جودتها، سواء صراحة أو ضمناً، لأي غرض بعينه، وتُخلي مباشر مسؤوليتها صراحةً عن أي ضمانات تتعلق بالصلاحية للتسويق أو الملاءمة لغرض معين.",
        },
        {
          type: "p",
          text: "تقرون وتوافقون وتعلنون أن مباشر ومسؤوليها وأعضاء مجلس إدارتها ومديريها وشركائها ومساهميها ووكلائها وخلفائها والمتنازل لهم منها وأي متعاقدين خارجيين معها لن يكونوا مسؤولين عن أي مطالبات أو دعاوى أو خسائر أو التزامات أو تكاليف أو أضرار (مالية أو معنوية أو خلافه) أو مصروفات (بما في ذلك، على سبيل المثال لا الحصر، أتعاب المحاماة والرسوم والنفقات) («الخسائر») تتكبدونها نتيجة اعتمادكم على بيانات مباشر أو استخدامكم لها.",
        },
        {
          type: "p",
          text: "تقرون وتوافقون وتعلنون أن مباشر ومسؤوليها وأعضاء مجلس إدارتها ومديريها وشركائها ومساهميها ووكلائها وخلفائها والمتنازل لهم منها وأي متعاقدين خارجيين معها لن يكونوا مسؤولين عن أي خسائر تتكبدونها نتيجة (1) أي عطل أو انقطاع يؤثر على الموقع، أو (2) أي فعل أو امتناع من أي طرف مشارك في إتاحة الموقع أو بيانات مباشر لكم، أو (3) أي سبب آخر يتعلق بدخولكم إلى الموقع أو استخدامكم له أو تعذُّر دخولكم إليه أو استخدامكم له، وذلك في كل حالة سواء كانت الظروف المؤدية إلى ذلك السبب داخل نطاق سيطرة مباشر أو مسؤوليها أو أعضاء مجلس إدارتها أو مديريها أو شركائها أو مساهميها أو وكلائها أو خلفائها أو المتنازل لهم منها أو أي متعاقدين خارجيين معها يقدمون دعم البرمجيات أو الخدمات، أم لا.",
        },
        {
          type: "p",
          text: "تقرون وتوافقون وتعلنون أنه لن تكون مباشر أو مسؤولوها أو أعضاء مجلس إدارتها أو مديروها أو شركاؤها أو مساهموها أو وكلاؤها أو خلفاؤها أو المتنازل لهم منها أو أي متعاقدين خارجيين معها، بأي حال من الأحوال، مسؤولين تجاهكم عن أي أضرار مباشرة أو خاصة أو غير مباشرة أو تبعية أو عرضية أو أي أضرار أخرى (بما في ذلك، على سبيل المثال لا الحصر، خسارة الأرباح أو الدخل أو الإيرادات أو السمعة أو البيانات و/أو أي أضرار غير ملموسة أياً كانت) من أي نوع، حتى وإن كانت مباشر أو أي من الجهات المذكورة قد أُخطرت باحتمال وقوعها.",
        },
      ],
    },
    {
      id: "third-party",
      title: "عدم تقديم أي إقرارات بشأن المواقع أو الروابط الأخرى",
      blocks: [
        {
          type: "p",
          text: "تقرون وتوافقون وتعلنون أنه في حال دخولكم إلى رابط وارد على الموقع واطلاعكم على معلومات أو محتوى أو بيانات أو خدمات أو برمجيات لا تقدمها أو تتيحها مباشر («بيانات الغير») أو وصولكم إليها، فإنكم تفعلون ذلك على مسؤوليتكم الخاصة. وتقرون وتوافقون وتعلنون أن (1) بيانات الغير لم تُطوَّر أو تُراجَع من قبل مباشر، و(2) أن مباشر لا تضمن دقة بيانات الغير أو صحتها أو اكتمالها أو حداثتها أو فائدتها أو موضوعها و/أو جودتها، وفي هذه الحالة تقرون وتوافقون وتعلنون أن مباشر لن تكون مسؤولة عن أي خسائر تتكبدونها نتيجة (أ) اعتمادكم على بيانات الغير، أو (ب) أي تأخيرات أو عيوب و/أو إغفالات قد توجد في بيانات الغير، سواء كانت فعلية أو مزعومة أو تبعية أو عقابية.",
        },
        {
          type: "p",
          text: "تقرون وتوافقون وتعلنون أن مباشر لا تضمن دقة أي محتوى إلكتروني يقدمه أو يتيحه أي طرف ثالث (بما في ذلك، على سبيل المثال لا الحصر، بيانات الغير) أو صحته أو اكتماله أو حداثته أو فائدته أو موضوعه و/أو جودته، وفي هذه الحالة تقرون وتوافقون وتعلنون أن مباشر لن تكون مسؤولة عن أي خسائر تتكبدونها نتيجة الاعتماد على أي محتوى إلكتروني يقدمه أو يتيحه أي طرف ثالث (بما في ذلك، على سبيل المثال لا الحصر، بيانات الغير).",
        },
      ],
    },
    {
      id: "copyright",
      title: "حقوق النشر",
      blocks: [
        {
          type: "p",
          text: "تتعهدون بعدم (1) تنزيل أي جزء من بيانات مباشر، و(2) نسخ أي جزء من بيانات مباشر أو استنساخه أو إعادة نشره أو توزيعه و/أو نقله، و/أو (3) إزالة أو طمس أي إشعارات أو بيانات تتعلق بحقوق النشر أو غيرها واردة في أي من بيانات مباشر.",
        },
      ],
    },
    {
      id: "no-advice",
      title: "عدم اعتبار البيانات مشورة أو عرضاً أو توصية",
      blocks: [
        {
          type: "p",
          text: "تقرون وتوافقون وتعلنون أن دخولكم إلى الموقع واطلاعكم على بيانات مباشر لا يُفسَّر على أنه (1) مشورة استثمارية مقدمة من مباشر أو مسؤوليها أو أعضاء مجلس إدارتها أو مديريها أو شركائها أو مساهميها أو وكلائها أو خلفائها أو المتنازل لهم منها و/أو أي متعاقدين خارجيين معها، أو (2) عرض من مباشر أو أي من الجهات المذكورة لشراء أو بيع أي ورقة مالية، و/أو (3) دعوة من مباشر أو أي من الجهات المذكورة لتقديم عرض لشراء أو بيع أي ورقة مالية أو منتج أو أداة مالية، أو للمشاركة في أي استراتيجية تداول بعينها، وذلك في كل حالة في أي ولاية قضائية يكون فيها هذا العرض أو الدعوة أو استراتيجية التداول غير مشروعة. وتتعهدون بالتماس التوجيه المالي عند تحديد ما إذا كانت فرصة أو استراتيجية استثمارية ما مناسبة أو ملائمة لكم. وتقرون وتوافقون وتعلنون أن مباشر وأياً من الجهات المذكورة لن تكون مسؤولة عن أي خسائر تتكبدونها نتيجة أي معاملة تقومون بها أو تنفذونها.",
        },
        {
          type: "p",
          text: "تقرون وتوافقون وتعلنون أن بيانات مباشر لا تُفسَّر على أنها مشورة تجارية أو مالية أو استثمارية أو تحوطية أو تداولية أو قانونية أو تنظيمية أو ضريبية أو محاسبية، وتتعهدون بالتماس التوجيه من مستشاركم التجاري ومحاميكم ومستشاريكم الضريبيين والمحاسبيين في حال اعتزامكم إجراء أو تنفيذ أي معاملة، وفي هذه الحالة تقرون وتوافقون وتعلنون أن مباشر ومسؤوليها وأعضاء مجلس إدارتها ومديريها وشركائها ومساهميها ووكلائها وخلفائها والمتنازل لهم منها و/أو أي متعاقدين خارجيين معها لن يكونوا مسؤولين عن أي خسائر تتكبدونها نتيجة أي معاملة تقومون بها أو تنفذونها.",
        },
      ],
    },
    {
      id: "risks",
      title: "المخاطر",
      blocks: [
        {
          type: "p",
          text: "تقرون وتوافقون وتعلنون أن (1) الاستثمار في الأوراق المالية يخضع لمخاطر متعددة، من بينها مخاطر السوق ومخاطر العملة ومخاطر التعثر ومخاطر السيولة، و(2) أن الدخل من الأوراق المالية وقيمتها أو سعرها قد يتقلب، و(3) أن أسس ومستويات الضرائب قد تتغير بما يؤثر على العائد المتوقع من تلك الأوراق المالية، و(4) أن أسعار صرف العملات الأجنبية قد تؤثر على قيمة أي ورقة مالية أو الدخل منها، وفي هذه الحالة تتعهدون بالتماس التوجيه المالي عند تحديد ما إذا كانت فرصة أو استراتيجية استثمارية ما مناسبة أو ملائمة لكم، وتقرون وتوافقون وتعلنون أن مباشر وأياً من الجهات المذكورة لن تكون مسؤولة عن أي خسائر تتكبدونها نتيجة أي معاملة تقومون بها أو تنفذونها.",
        },
        {
          type: "p",
          text: "تقرون وتوافقون وتعلنون أن أي إشارة في هذه الشروط إلى المخاطر المرتبطة بإجراء أو تنفيذ معاملات بيع وشراء الأوراق المالية لا تُعد إفصاحاً عن جميع المخاطر أو مناقشة وافية للمخاطر التي قد تتحقق، وفي هذه الحالة تقرون وتوافقون وتعلنون أن مباشر ومسؤوليها وأعضاء مجلس إدارتها ومديريها وشركائها ومساهميها ووكلائها وخلفائها والمتنازل لهم منها و/أو أي متعاقدين خارجيين معها لن يكونوا مسؤولين عن أي خسائر تتكبدونها نتيجة أي معاملة تقومون بها أو تنفذونها.",
        },
      ],
    },
    {
      id: "outages",
      title: "انقطاعات الأنظمة",
      blocks: [
        {
          type: "p",
          text: "تقرون وتوافقون وتعلنون أن مباشر ومسؤوليها وأعضاء مجلس إدارتها ومديريها وشركائها ومساهميها ووكلائها وخلفائها والمتنازل لهم منها و/أو أي متعاقدين خارجيين معها لن يكونوا مسؤولين عن أي خسائر تتكبدونها نتيجة تعليق الموقع أو انقطاعه أو عدم إتاحته.",
        },
      ],
    },
    {
      id: "security",
      title: "الأمن",
      blocks: [
        {
          type: "p",
          text: "تقرون وتوافقون وتعلنون أن مباشر تتخذ خطوات معقولة للحفاظ على أمن الموقع، وتقرون وتوافقون وتعلنون أن المخاطر الأمنية في تطور مستمر، وأنه لا توجد منصة، بما في ذلك الموقع، محصَّنة ضد الهجمات السيبرانية و/أو الوصول غير المصرح به، وتقرون وتوافقون وتعلنون أن مباشر لا يمكنها ضمان عدم وقوع وصول غير مصرح به أو اختراق للموقع مطلقاً، وفي هذه الحالة تقرون وتوافقون وتعلنون أن ما سبق يمثل خطراً ملازماً، وأن مباشر لن تكون مسؤولة عن أي خسائر تتكبدونها نتيجة أي هجوم سيبراني أو وصول غير مصرح به أو قرصنة أو غير ذلك من الاختراقات الأمنية التي تؤثر على الموقع. وتتعهدون بتطبيق تدابيركم الأمنية الخاصة.",
        },
        {
          type: "p",
          text: "تقرون وتوافقون وتعلنون أن مباشر قد تستعين بمقدمي خدمات من الغير لدعم وظائف الموقع، وتقرون وتوافقون وتعلنون أن مقدمي الخدمات هؤلاء يطبقون تدابيرهم وممارساتهم الأمنية الخاصة التي لا يمكن لمباشر ضمانها، وفي هذه الحالة تقرون وتوافقون وتعلنون أن مباشر لن تكون مسؤولة عن أي خسائر تتكبدونها نتيجة التدابير والممارسات الأمنية لمقدمي الخدمات من الغير.",
        },
      ],
    },
    {
      id: "restricted",
      title: "الأفعال المحظورة",
      blocks: [
        { type: "p", text: "تتعهدون بما يلي:" },
        {
          type: "ul",
          items: [
            "عدم الانخراط في أي نشاط من شأنه المساس بأمن أو سلامة الموقع أو بيانات مباشر؛",
            "الحفاظ على سرية أي أسماء مستخدمين أو كلمات مرور أو بيانات اعتماد أخرى مرتبطة بالموقع (إن وجدت)؛",
            "عدم مشاركة بيانات الاعتماد الخاصة بكم (إن وجدت) المرتبطة بالموقع مع أي أطراف ثالثة، أو السماح بوصول غير مصرح به إلى حساباتكم (إن وجدت) على الموقع؛",
            "استخدام الموقع للغرض المخصص له فقط، والامتناع عن محاولات الوصول غير المصرح به أو الهندسة العكسية أو أي نشاط آخر يمس أمن الموقع أو زواره/مستخدميه؛",
            "عدم استخدام الموقع لأي غرض غير مشروع أو غير مصرح به، بما في ذلك على سبيل المثال لا الحصر القرصنة أو إرسال الرسائل المزعجة أو نشر البرمجيات الخبيثة؛",
            "الإبلاغ الفوري لمباشر عن أي ثغرات أو حوادث أمنية تكتشفونها.",
          ],
        },
      ],
    },
    {
      id: "ip",
      title: "حقوق الملكية الفكرية",
      blocks: [
        {
          type: "p",
          text: "تضمن مباشر أنها مالكة الموقع وبيانات مباشر أو مرخَّص لها باستخدامهما (بحسب الأحوال). وتقرون وتوافقون وتعلنون أن مباشر تحتفظ بجميع الحقوق وسندات الملكية والملكية الخاصة بحقوق ملكيتها الفكرية، بما في ذلك على سبيل المثال لا الحصر الموقع وبيانات مباشر، وأنه لا يوجد في هذه الشروط ما يُفسَّر على أنه يمنحكم أي حقوق ملكية فكرية تخص مباشر أو أياً من المتعاقدين الخارجيين معها. وتتعهدون بعدم التعدي على أي من حقوق الملكية الفكرية لمباشر (أو لأي من المتعاقدين الخارجيين معها).",
        },
      ],
    },
    {
      id: "indemnification",
      title: "التعويض",
      blocks: [
        {
          type: "p",
          text: "تتعهدون بتعويض مباشر ومسؤوليها وأعضاء مجلس إدارتها ومديريها وشركائها ومساهميها ووكلائها وخلفائها والمتنازل لهم منها و/أو أي متعاقدين خارجيين معها، وإبراء ذمتهم من أي خسائر يتكبدونها نتيجة أي من أفعالكم و/أو حالات امتناعكم، سواء شكَّل ذلك الفعل و/أو الامتناع إخلالاً بهذه الشروط والأحكام أم لا.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "القانون الواجب التطبيق وتسوية المنازعات",
      blocks: [
        {
          type: "p",
          text: "تخضع هذه الشروط والأحكام وتُفسَّر وفقاً لقوانين جمهورية مصر العربية. وتُسوَّى جميع المنازعات الناشئة عن هذه الشروط والأحكام أو المتصلة بها، بما في ذلك على سبيل المثال لا الحصر ما يتعلق بتفسيرها أو تنفيذها، تسوية نهائية عن طريق التحكيم وفقاً لقواعد التحكيم الصادرة عن مركز القاهرة الإقليمي للتحكيم التجاري الدولي («القواعد»). ويكون عدد المحكمين واحداً (1) يُعيَّن وفقاً لتلك القواعد، ويكون مقر التحكيم القاهرة، جمهورية مصر العربية، وتُجرى إجراءات التحكيم باللغة الإنجليزية.",
        },
      ],
    },
  ],
};

/* ─────────────────────── FRA DISCLOSURES ─────────────────────── */

const fraEn: LegalDoc = {
  ...chrome.en,
  eyebrow: "Regulatory",
  title: "FRA Disclosures",
  intro:
    "Mubasher Holding is licensed and supervised by the Egyptian Financial Regulatory Authority (FRA). The company record details below are published on the FRA's official company records register.",
  meta: ["FRA License No. 768", "Company Registration No. 669559"],
  sections: [
    {
      id: "identity",
      title: "Company Identity",
      blocks: [
        {
          type: "kv",
          rows: [
            { k: "Company Name (EN)", v: "Mubasher Holding" },
            { k: "Company Name (AR)", v: "مباشر كابيتال هولدنج للاستثمارات الماليه" },
            { k: "Company Registration No.", v: "669559", ltr: true },
            { k: "License No.", v: "768", ltr: true },
            { k: "Address", v: "22 Anwar Al Mofty Street, Taiba 2000 Administrative Building, Nasr City, Cairo, Egypt — 22 شارع أنور المفتي، مبنى طيبة 2000 الإداري، مدينة نصر، القاهرة" },
            { k: "Telephone", v: "+20 (0)2 2264 9911", ltr: true },
            { k: "Fax", v: "+20 (0)2 2264 9922/3", ltr: true },
          ],
        },
      ],
    },
    {
      id: "activities",
      title: "Licensed Activities",
      blocks: [
        { type: "p", text: "Mubasher Holding holds the following licensed activities on record with the FRA:" },
        {
          type: "table",
          head: ["License No.", "Licensed Activity", "License Date"],
          rows: [
            ["768", "Promotion and Underwriting of Securities — ترويج وتغطية الإكتتاب فى الأوراق المالية", "04 April 2021"],
            ["768", "Participation in Establishing Companies that Issue Securities or in Capital Increases — الإشتراك فى تأسيس الشركات التى تصدر أوراقا مالية أو فى زيادة رؤوس أموالها", "27 December 2018"],
          ],
        },
      ],
    },
    {
      id: "source",
      title: "Source",
      blocks: [
        { type: "p", text: "These disclosures are sourced from the FRA's public company records register:" },
        {
          type: "links",
          items: [
            { label: "FRA Company Record — License Activity 1", href: "https://fra.gov.eg/company_records/%D9%85%D8%A8%D8%A7%D8%B4%D8%B1-%D9%83%D8%A7%D8%A8%D9%8A%D8%AA%D8%A7%D9%84-%D9%87%D9%88%D9%84%D8%AF%D9%86%D8%AC-%D9%84%D9%84%D8%A7%D8%B3%D8%AA%D8%AB%D9%85%D8%A7%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D9%85/" },
            { label: "FRA Company Record — License Activity 2", href: "https://fra.gov.eg/company_records/%D9%85%D8%A8%D8%A7%D8%B4%D8%B1-%D9%83%D8%A7%D8%A8%D9%8A%D8%AA%D8%A7%D9%84-%D9%87%D9%88%D9%84%D8%AF%D9%86%D8%AC-%D9%84%D9%84%D8%A7%D8%B3%D8%AA%D8%AB%D9%85%D8%A7%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D9%85-2/" },
          ],
        },
      ],
    },
  ],
};

const fraAr: LegalDoc = {
  ...chrome.ar,
  eyebrow: "تنظيمي",
  title: "إفصاحات الهيئة العامة للرقابة المالية",
  intro:
    "شركة مباشر القابضة مرخصة وخاضعة لرقابة الهيئة العامة للرقابة المالية في جمهورية مصر العربية. وبيانات سجل الشركة أدناه منشورة في سجل الشركات الرسمي لدى الهيئة.",
  meta: ["ترخيص الهيئة رقم 768", "سجل تجاري رقم 669559"],
  sections: [
    {
      id: "identity",
      title: "هوية الشركة",
      blocks: [
        {
          type: "kv",
          rows: [
            { k: "اسم الشركة (بالإنجليزية)", v: "Mubasher Holding", ltr: true },
            { k: "اسم الشركة (بالعربية)", v: "مباشر كابيتال هولدنج للاستثمارات الماليه" },
            { k: "رقم السجل التجاري", v: "669559", ltr: true },
            { k: "رقم الترخيص", v: "768", ltr: true },
            { k: "العنوان", v: "22 شارع أنور المفتي، مبنى طيبة 2000 الإداري، مدينة نصر، القاهرة، جمهورية مصر العربية" },
            { k: "الهاتف", v: "+20 (0)2 2264 9911", ltr: true },
            { k: "الفاكس", v: "+20 (0)2 2264 9922/3", ltr: true },
          ],
        },
      ],
    },
    {
      id: "activities",
      title: "الأنشطة المرخصة",
      blocks: [
        { type: "p", text: "تحمل شركة مباشر القابضة الأنشطة المرخصة التالية المقيدة لدى الهيئة العامة للرقابة المالية:" },
        {
          type: "table",
          head: ["رقم الترخيص", "النشاط المرخص", "تاريخ الترخيص"],
          rows: [
            ["768", "ترويج وتغطية الإكتتاب فى الأوراق المالية", "4 أبريل 2021"],
            ["768", "الإشتراك فى تأسيس الشركات التى تصدر أوراقا مالية أو فى زيادة رؤوس أموالها", "27 ديسمبر 2018"],
          ],
        },
      ],
    },
    {
      id: "source",
      title: "المصدر",
      blocks: [
        { type: "p", text: "هذه الإفصاحات مأخوذة من سجل الشركات العام المنشور على الموقع الرسمي للهيئة العامة للرقابة المالية:" },
        {
          type: "links",
          items: [
            { label: "سجل الشركة لدى الهيئة — نشاط الترخيص الأول", href: "https://fra.gov.eg/company_records/%D9%85%D8%A8%D8%A7%D8%B4%D8%B1-%D9%83%D8%A7%D8%A8%D9%8A%D8%AA%D8%A7%D9%84-%D9%87%D9%88%D9%84%D8%AF%D9%86%D8%AC-%D9%84%D9%84%D8%A7%D8%B3%D8%AA%D8%AB%D9%85%D8%A7%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D9%85/" },
            { label: "سجل الشركة لدى الهيئة — نشاط الترخيص الثاني", href: "https://fra.gov.eg/company_records/%D9%85%D8%A8%D8%A7%D8%B4%D8%B1-%D9%83%D8%A7%D8%A8%D9%8A%D8%AA%D8%A7%D9%84-%D9%87%D9%88%D9%84%D8%AF%D9%86%D8%AC-%D9%84%D9%84%D8%A7%D8%B3%D8%AA%D8%AB%D9%85%D8%A7%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D9%85-2/" },
          ],
        },
      ],
    },
  ],
};

export const legalContent: Record<LegalSlug, Record<"en" | "ar", LegalDoc>> = {
  privacy: { en: privacyEn, ar: privacyAr },
  terms: { en: termsEn, ar: termsAr },
  fra: { en: fraEn, ar: fraAr },
};
