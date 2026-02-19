import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Heart, ArrowRight, Users, Package, DollarSign, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-chikan.jpg";
import { useLang } from "@/contexts/LanguageContext";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const testimonials = [
  { name: "Fatima Bi", role: "Artisan, Lucknow", quote: "ChikanSetu helped me understand the true value of my work. I now earn 3x more than before." },
  { name: "Priya Sharma", role: "Buyer, Delhi", quote: "Knowing my kurta is genuinely handmade and the artisan was paid fairly — that means everything." },
  { name: "Raza Khan", role: "Boutique Owner, Mumbai", quote: "The trend reports and bulk ordering system transformed how we source authentic Chikankari." },
];

export default function Index() {
  const { t } = useLang();

  const stats = [
    { icon: Users, value: "5,000+", label: t.artisansEmpowered },
    { icon: Package, value: "12,000+", label: t.productsListed },
    { icon: DollarSign, value: "₹2.4Cr", label: t.fairWagesPaid },
    { icon: Award, value: "98%", label: t.authenticityRate },
  ];

  const steps = [
    { icon: Heart, title: t.step1Title, description: t.step1Desc },
    { icon: Shield, title: t.step2Title, description: t.step2Desc },
    { icon: TrendingUp, title: t.step3Title, description: t.step3Desc },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Chikankari embroidery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
        </div>
        <div className="relative container px-4 md:px-8 py-32">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/20 text-accent mb-6 border border-accent/30">
              {t.heroTag}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 text-ivory">
              {t.heroTitle1}{" "}
              <span className="text-gradient-gold">{t.heroTitle2}</span>
            </h1>
            <p className="text-lg md:text-xl text-ivory/70 mb-10 max-w-lg leading-relaxed font-body">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/shop">{t.shopBtn} <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/auth">{t.artisanBtn}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-secondary">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
                <s.icon className="w-8 h-8 mx-auto mb-3 text-accent" />
                <div className="text-3xl md:text-4xl font-display font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{t.howItWorks}</h2>
            <p className="text-muted-foreground max-w-md mx-auto">{t.howSubtitle}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative bg-card rounded-xl p-8 shadow-warm border border-border/50 text-center group hover:shadow-gold transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/20 transition-colors">
                  <step.icon className="w-7 h-7 text-accent" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">{t.step} {i + 1}</div>
                <h3 className="text-xl font-display font-semibold mb-3 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary">
        <div className="container px-4 md:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{t.voices}</h2>
            <p className="text-muted-foreground max-w-md mx-auto">{t.voicesSubtitle}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimony, i) => (
              <motion.div key={testimony.name} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-card rounded-xl p-8 shadow-warm border border-border/50">
                <p className="text-foreground/80 italic mb-6 leading-relaxed">"{testimony.quote}"</p>
                <div>
                  <div className="font-display font-semibold text-foreground">{testimony.name}</div>
                  <div className="text-sm text-muted-foreground">{testimony.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              {t.ctaTitle1} <span className="text-gradient-gold">{t.ctaTitle2}</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10">{t.ctaSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild><Link to="/shop">{t.exploreCollection}</Link></Button>
              <Button variant="outline" size="lg" asChild><Link to="/auth">{t.becomePartner}</Link></Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
