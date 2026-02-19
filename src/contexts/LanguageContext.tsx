import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi" | "ur";

export interface Translations {
  // Nav
  home: string;
  shop: string;
  artisan: string;
  about: string;
  registerArtisan: string;
  login: string;
  logout: string;
  myDashboard: string;
  // Hero
  heroTag: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  shopBtn: string;
  artisanBtn: string;
  // Stats
  artisansEmpowered: string;
  productsListed: string;
  fairWagesPaid: string;
  authenticityRate: string;
  // How it works
  howItWorks: string;
  howSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step: string;
  // Testimonials
  voices: string;
  voicesSubtitle: string;
  // CTA
  ctaTitle1: string;
  ctaTitle2: string;
  ctaSubtitle: string;
  exploreCollection: string;
  becomePartner: string;
  // Auth
  signIn: string;
  signUp: string;
  email: string;
  password: string;
  fullName: string;
  selectRole: string;
  buyer: string;
  boutique: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  signingIn: string;
  creatingAccount: string;
  welcomeBack: string;
  joinChikanSetu: string;
  authSubtitle: string;
  role: string;
  phone: string;
  // Artisan dashboard
  namasteKarigar: string;
  artisanSubtitle: string;
  totalEarnings: string;
  pendingPayments: string;
  activeOrders: string;
  trendingDesigns: string;
  quickActions: string;
  addProduct: string;
  myInventory: string;
  trendAdvisory: string;
  walletPayments: string;
  addProductDesc: string;
  myInventoryDesc: string;
  trendAdvisoryDesc: string;
  walletDesc: string;
  // Shop
  shopTitle: string;
  shopSubtitle: string;
  searchPlaceholder: string;
  filters: string;
  all: string;
  certified: string;
  viewDetails: string;
  addToCart: string;
  // Admin
  adminTitle: string;
  adminSubtitle: string;
  totalArtisans: string;
  verifiedProducts: string;
  openDisputes: string;
  avgIncomeUplift: string;
  districtPerformance: string;
  district: string;
  revenue: string;
  // Footer
  quickLinks: string;
  support: string;
  artisanPortal: string;
  aboutUs: string;
  buyerHelp: string;
  boutiquePartners: string;
  admin: string;
  copyright: string;
  // Product form
  productName: string;
  stitchType: string;
  fabricType: string;
  timeTaken: string;
  materialCost: string;
  fairPrice: string;
  suggestedPrice: string;
  uploadImage: string;
  submitProduct: string;
  // General
  loading: string;
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  search: string;
  verification: string;
  verified: string;
  pending: string;
}

const en: Translations = {
  home: "Home", shop: "Shop", artisan: "Artisan", about: "About",
  registerArtisan: "Register as Artisan", login: "Login", logout: "Logout",
  myDashboard: "My Dashboard",
  heroTag: "One District One Product — Lucknow",
  heroTitle1: "Empowering Lucknow's",
  heroTitle2: "Chikan Karigars",
  heroSubtitle: "Fair prices. Authentic craftsmanship. Transparent trade. Bridging artisans to the world, one stitch at a time.",
  shopBtn: "Shop Authentic Chikan", artisanBtn: "Register as Artisan",
  artisansEmpowered: "Artisans Empowered", productsListed: "Products Listed",
  fairWagesPaid: "Fair Wages Paid", authenticityRate: "Authenticity Rate",
  howItWorks: "How ChikanSetu Works", howSubtitle: "A simple, transparent process that puts artisans first.",
  step1Title: "Artisans Create", step1Desc: "Skilled karigars upload their handcrafted Chikankari pieces with transparent pricing.",
  step2Title: "AI Verifies", step2Desc: "Our authenticity engine validates handmade quality and generates certification.",
  step3Title: "Fair Trade Happens", step3Desc: "Buyers purchase with confidence through escrow payments. Artisans earn fair wages.",
  step: "Step",
  voices: "Voices of Change", voicesSubtitle: "Stories from the artisans and buyers who make ChikanSetu a movement.",
  ctaTitle1: "Every Purchase Preserves a", ctaTitle2: "Legacy",
  ctaSubtitle: "Join thousands supporting Lucknow's centuries-old craft tradition while getting beautiful, authentic handmade pieces.",
  exploreCollection: "Explore Collection", becomePartner: "Become a Partner",
  signIn: "Sign In", signUp: "Sign Up", email: "Email", password: "Password",
  fullName: "Full Name", selectRole: "Select your role", buyer: "Buyer", boutique: "Boutique / Wholesaler",
  alreadyHaveAccount: "Already have an account? Sign in", dontHaveAccount: "Don't have an account? Sign up",
  signingIn: "Signing in…", creatingAccount: "Creating account…",
  welcomeBack: "Welcome Back", joinChikanSetu: "Join ChikanSetu",
  authSubtitle: "Supporting Lucknow's Chikankari artisans", role: "Role", phone: "Phone",
  namasteKarigar: "Namaste, Karigar! 🙏", artisanSubtitle: "Your artisan dashboard — track orders, earnings, and trends.",
  totalEarnings: "Total Earnings", pendingPayments: "Pending Payments",
  activeOrders: "Active Orders", trendingDesigns: "Trending Designs",
  quickActions: "Quick Actions", addProduct: "Add Product", myInventory: "My Inventory",
  trendAdvisory: "Trend Advisory", walletPayments: "Wallet & Payments",
  addProductDesc: "Upload a new Chikankari piece", myInventoryDesc: "Manage your listed products",
  trendAdvisoryDesc: "AI-powered market insights", walletDesc: "Track earnings and withdrawals",
  shopTitle: "Authentic Chikankari", shopSubtitle: "Every piece handcrafted with love, verified for authenticity.",
  searchPlaceholder: "Search products…", filters: "Filters", all: "All", certified: "Certified",
  viewDetails: "View Details", addToCart: "Add to Cart",
  adminTitle: "Admin Dashboard", adminSubtitle: "Platform analytics and management.",
  totalArtisans: "Total Artisans", verifiedProducts: "Verified Products",
  openDisputes: "Open Disputes", avgIncomeUplift: "Avg Income Uplift",
  districtPerformance: "District Performance", district: "District", revenue: "Revenue",
  quickLinks: "Quick Links", support: "Support", artisanPortal: "Artisan Portal",
  aboutUs: "About Us", buyerHelp: "Buyer Help", boutiquePartners: "Boutique Partners",
  admin: "Admin", copyright: "ChikanSetu. Empowering artisans, one stitch at a time.",
  productName: "Product Name", stitchType: "Stitch Type", fabricType: "Fabric Type",
  timeTaken: "Time Taken (hours)", materialCost: "Material Cost (₹)", fairPrice: "Fair Minimum Price",
  suggestedPrice: "Suggested Price", uploadImage: "Upload Image", submitProduct: "Submit Product",
  loading: "Loading…", save: "Save", cancel: "Cancel", edit: "Edit", delete: "Delete",
  search: "Search", verification: "Verification", verified: "Verified", pending: "Pending",
};

const hi: Translations = {
  home: "होम", shop: "दुकान", artisan: "कारीगर", about: "हमारे बारे में",
  registerArtisan: "कारीगर के रूप में पंजीकरण करें", login: "लॉगिन", logout: "लॉगआउट",
  myDashboard: "मेरा डैशबोर्ड",
  heroTag: "एक जिला एक उत्पाद — लखनऊ",
  heroTitle1: "लखनऊ के",
  heroTitle2: "चिकन कारीगरों को सशक्त बनाना",
  heroSubtitle: "उचित मूल्य। प्रामाणिक शिल्प। पारदर्शी व्यापार। कारीगरों को दुनिया से जोड़ना, एक टांके से।",
  shopBtn: "असली चिकन खरीदें", artisanBtn: "कारीगर के रूप में पंजीकरण करें",
  artisansEmpowered: "सशक्त कारीगर", productsListed: "सूचीबद्ध उत्पाद",
  fairWagesPaid: "उचित वेतन भुगतान", authenticityRate: "प्रामाणिकता दर",
  howItWorks: "चिकनसेतु कैसे काम करता है", howSubtitle: "एक सरल, पारदर्शी प्रक्रिया जो कारीगरों को पहले रखती है।",
  step1Title: "कारीगर बनाते हैं", step1Desc: "कुशल कारीगर पारदर्शी मूल्य निर्धारण के साथ अपनी हस्तनिर्मित चिकनकारी कृतियाँ अपलोड करते हैं।",
  step2Title: "AI सत्यापित करता है", step2Desc: "हमारा प्रामाणिकता इंजन हस्तनिर्मित गुणवत्ता को मान्य करता है और प्रमाणन उत्पन्न करता है।",
  step3Title: "उचित व्यापार होता है", step3Desc: "खरीदार एस्क्रो भुगतान के माध्यम से आत्मविश्वास के साथ खरीदते हैं। कारीगरों को उचित वेतन मिलता है।",
  step: "चरण",
  voices: "बदलाव की आवाज़ें", voicesSubtitle: "उन कारीगरों और खरीदारों की कहानियाँ जो चिकनसेतु को एक आंदोलन बनाते हैं।",
  ctaTitle1: "हर खरीद एक", ctaTitle2: "विरासत को बचाती है",
  ctaSubtitle: "हज़ारों लोगों के साथ जुड़ें जो लखनऊ की सदियों पुरानी शिल्प परंपरा का समर्थन करते हैं।",
  exploreCollection: "संग्रह देखें", becomePartner: "साझेदार बनें",
  signIn: "साइन इन करें", signUp: "साइन अप करें", email: "ईमेल", password: "पासवर्ड",
  fullName: "पूरा नाम", selectRole: "अपनी भूमिका चुनें", buyer: "खरीदार", boutique: "बुटीक / थोक विक्रेता",
  alreadyHaveAccount: "पहले से खाता है? साइन इन करें", dontHaveAccount: "खाता नहीं है? साइन अप करें",
  signingIn: "साइन इन हो रहा है…", creatingAccount: "खाता बन रहा है…",
  welcomeBack: "वापस स्वागत है", joinChikanSetu: "चिकनसेतु से जुड़ें",
  authSubtitle: "लखनऊ के चिकनकारी कारीगरों का समर्थन", role: "भूमिका", phone: "फ़ोन",
  namasteKarigar: "नमस्ते, कारीगर! 🙏", artisanSubtitle: "आपका कारीगर डैशबोर्ड — ऑर्डर, कमाई और रुझानों को ट्रैक करें।",
  totalEarnings: "कुल कमाई", pendingPayments: "लंबित भुगतान",
  activeOrders: "सक्रिय ऑर्डर", trendingDesigns: "ट्रेंडिंग डिज़ाइन",
  quickActions: "त्वरित कार्य", addProduct: "उत्पाद जोड़ें", myInventory: "मेरी सूची",
  trendAdvisory: "ट्रेंड सलाह", walletPayments: "वॉलेट और भुगतान",
  addProductDesc: "एक नई चिकनकारी कृति अपलोड करें", myInventoryDesc: "अपने सूचीबद्ध उत्पाद प्रबंधित करें",
  trendAdvisoryDesc: "AI-संचालित बाज़ार अंतर्दृष्टि", walletDesc: "कमाई और निकासी ट्रैक करें",
  shopTitle: "असली चिकनकारी", shopSubtitle: "प्रत्येक टुकड़ा प्रेम से हस्तनिर्मित, प्रामाणिकता के लिए सत्यापित।",
  searchPlaceholder: "उत्पाद खोजें…", filters: "फ़िल्टर", all: "सभी", certified: "प्रमाणित",
  viewDetails: "विवरण देखें", addToCart: "कार्ट में जोड़ें",
  adminTitle: "एडमिन डैशबोर्ड", adminSubtitle: "प्लेटफ़ॉर्म विश्लेषण और प्रबंधन।",
  totalArtisans: "कुल कारीगर", verifiedProducts: "सत्यापित उत्पाद",
  openDisputes: "खुले विवाद", avgIncomeUplift: "औसत आय वृद्धि",
  districtPerformance: "जिला प्रदर्शन", district: "जिला", revenue: "राजस्व",
  quickLinks: "त्वरित लिंक", support: "सहायता", artisanPortal: "कारीगर पोर्टल",
  aboutUs: "हमारे बारे में", buyerHelp: "खरीदार सहायता", boutiquePartners: "बुटीक भागीदार",
  admin: "एडमिन", copyright: "चिकनसेतु। कारीगरों को सशक्त बनाना, एक टांके से।",
  productName: "उत्पाद का नाम", stitchType: "टांका प्रकार", fabricType: "कपड़े का प्रकार",
  timeTaken: "लगा समय (घंटे)", materialCost: "सामग्री लागत (₹)", fairPrice: "न्यूनतम उचित मूल्य",
  suggestedPrice: "सुझाया मूल्य", uploadImage: "छवि अपलोड करें", submitProduct: "उत्पाद जमा करें",
  loading: "लोड हो रहा है…", save: "सहेजें", cancel: "रद्द करें", edit: "संपादित करें", delete: "हटाएं",
  search: "खोजें", verification: "सत्यापन", verified: "सत्यापित", pending: "लंबित",
};

const ur: Translations = {
  home: "ہوم", shop: "دکان", artisan: "کاریگر", about: "ہمارے بارے میں",
  registerArtisan: "کاریگر کے طور پر رجسٹر کریں", login: "لاگ ان", logout: "لاگ آؤٹ",
  myDashboard: "میرا ڈیش بورڈ",
  heroTag: "ایک ضلع ایک مصنوع — لکھنؤ",
  heroTitle1: "لکھنؤ کے",
  heroTitle2: "چکن کاریگروں کو بااختیار بنانا",
  heroSubtitle: "منصفانہ قیمتیں۔ مستند دستکاری۔ شفاف تجارت۔ کاریگروں کو دنیا سے جوڑنا، ایک سلائی سے۔",
  shopBtn: "اصلی چکن خریدیں", artisanBtn: "کاریگر کے طور پر رجسٹر کریں",
  artisansEmpowered: "بااختیار کاریگر", productsListed: "درج مصنوعات",
  fairWagesPaid: "منصفانہ اجرت ادا", authenticityRate: "صداقت کی شرح",
  howItWorks: "چکن سیتو کیسے کام کرتا ہے", howSubtitle: "ایک سادہ، شفاف عمل جو کاریگروں کو پہلے رکھتا ہے۔",
  step1Title: "کاریگر بناتے ہیں", step1Desc: "ہنر مند کاریگر شفاف قیمتوں کے ساتھ اپنے ہاتھ سے بنے چکنکاری کے ٹکڑے اپلوڈ کرتے ہیں۔",
  step2Title: "AI تصدیق کرتا ہے", step2Desc: "ہمارا صداقت انجن ہاتھ سے بنے معیار کی تصدیق کرتا ہے اور سرٹیفکیشن تیار کرتا ہے۔",
  step3Title: "منصفانہ تجارت ہوتی ہے", step3Desc: "خریدار ایسکرو ادائیگیوں کے ذریعے اعتماد کے ساتھ خریداری کرتے ہیں۔ کاریگر منصفانہ اجرت کماتے ہیں۔",
  step: "مرحلہ",
  voices: "تبدیلی کی آوازیں", voicesSubtitle: "ان کاریگروں اور خریداروں کی کہانیاں جو چکن سیتو کو ایک تحریک بناتے ہیں۔",
  ctaTitle1: "ہر خریداری ایک", ctaTitle2: "وراثت کو محفوظ رکھتی ہے",
  ctaSubtitle: "ہزاروں لوگوں کے ساتھ شامل ہوں جو لکھنؤ کی صدیوں پرانی دستکاری روایت کی حمایت کرتے ہیں۔",
  exploreCollection: "مجموعہ دیکھیں", becomePartner: "شراکت دار بنیں",
  signIn: "سائن ان کریں", signUp: "سائن اپ کریں", email: "ای میل", password: "پاس ورڈ",
  fullName: "پورا نام", selectRole: "اپنا کردار منتخب کریں", buyer: "خریدار", boutique: "بوتیک / تھوک فروش",
  alreadyHaveAccount: "پہلے سے اکاؤنٹ ہے؟ سائن ان کریں", dontHaveAccount: "اکاؤنٹ نہیں ہے؟ سائن اپ کریں",
  signingIn: "سائن ان ہو رہا ہے…", creatingAccount: "اکاؤنٹ بن رہا ہے…",
  welcomeBack: "واپس خوش آمدید", joinChikanSetu: "چکن سیتو میں شامل ہوں",
  authSubtitle: "لکھنؤ کے چکنکاری کاریگروں کی حمایت", role: "کردار", phone: "فون",
  namasteKarigar: "السلام علیکم، کاریگر! 🙏", artisanSubtitle: "آپ کا کاریگر ڈیش بورڈ — آرڈر، کمائی اور رجحانات ٹریک کریں۔",
  totalEarnings: "کل کمائی", pendingPayments: "زیر التوا ادائیگیاں",
  activeOrders: "فعال آرڈر", trendingDesigns: "ٹرینڈنگ ڈیزائن",
  quickActions: "فوری اعمال", addProduct: "مصنوع شامل کریں", myInventory: "میری انوینٹری",
  trendAdvisory: "ٹرینڈ مشاورت", walletPayments: "والیٹ اور ادائیگیاں",
  addProductDesc: "ایک نیا چکنکاری ٹکڑا اپلوڈ کریں", myInventoryDesc: "اپنی درج مصنوعات منظم کریں",
  trendAdvisoryDesc: "AI سے چلنے والی مارکیٹ بصیرت", walletDesc: "کمائی اور نکاسی ٹریک کریں",
  shopTitle: "اصلی چکنکاری", shopSubtitle: "ہر ٹکڑا محبت سے ہاتھ سے بنایا، صداقت کے لیے تصدیق شدہ۔",
  searchPlaceholder: "مصنوعات تلاش کریں…", filters: "فلٹر", all: "تمام", certified: "تصدیق شدہ",
  viewDetails: "تفصیلات دیکھیں", addToCart: "کارٹ میں شامل کریں",
  adminTitle: "ایڈمن ڈیش بورڈ", adminSubtitle: "پلیٹ فارم تجزیات اور انتظام۔",
  totalArtisans: "کل کاریگر", verifiedProducts: "تصدیق شدہ مصنوعات",
  openDisputes: "کھلے تنازعات", avgIncomeUplift: "اوسط آمدنی میں اضافہ",
  districtPerformance: "ضلع کارکردگی", district: "ضلع", revenue: "آمدنی",
  quickLinks: "فوری لنکس", support: "مدد", artisanPortal: "کاریگر پورٹل",
  aboutUs: "ہمارے بارے میں", buyerHelp: "خریدار مدد", boutiquePartners: "بوتیک شراکت دار",
  admin: "ایڈمن", copyright: "چکن سیتو۔ کاریگروں کو بااختیار بنانا، ایک سلائی سے۔",
  productName: "مصنوع کا نام", stitchType: "سلائی کی قسم", fabricType: "کپڑے کی قسم",
  timeTaken: "لگا وقت (گھنٹے)", materialCost: "مواد کی لاگت (₹)", fairPrice: "منصفانہ کم از کم قیمت",
  suggestedPrice: "تجویز کردہ قیمت", uploadImage: "تصویر اپلوڈ کریں", submitProduct: "مصنوع جمع کریں",
  loading: "لوڈ ہو رہا ہے…", save: "محفوظ کریں", cancel: "منسوخ کریں", edit: "ترمیم کریں", delete: "حذف کریں",
  search: "تلاش کریں", verification: "تصدیق", verified: "تصدیق شدہ", pending: "زیر التوا",
};

const translations: Record<Language, Translations> = { en, hi, ur };

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en", setLang: () => {}, t: en, dir: "ltr",
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem("cs_lang") as Language) || "en";
  });

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("cs_lang", l);
  };

  const dir = lang === "ur" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
