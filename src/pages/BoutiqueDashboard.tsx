import { motion } from "framer-motion";
import { Package, MessageSquare, Palette, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/contexts/LanguageContext";

export default function BoutiqueDashboard() {
  const { t } = useLang();

  const features = [
    { icon: Package, title: "Bulk Orders", desc: "Place wholesale orders directly with verified artisans at negotiated prices." },
    { icon: MessageSquare, title: "Direct Messaging", desc: "Communicate directly with artisans for custom requirements and timelines." },
    { icon: Palette, title: "Custom Designs", desc: "Request bespoke Chikankari designs tailored to your boutique's collection." },
    { icon: BarChart3, title: t.trendAdvisory, desc: t.trendAdvisoryDesc },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">{t.boutiquePartners}</h1>
            <p className="text-muted-foreground mb-10">Source authentic Chikankari at scale for your business.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-8 border border-border/50 shadow-warm hover:shadow-gold transition-shadow"
              >
                <f.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{f.desc}</p>
                <Button variant="outline" size="sm">Get Started</Button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
