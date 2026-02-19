import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DollarSign, Package, TrendingUp, PlusCircle, BarChart3, Wallet, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function ArtisanDashboard() {
  const { t } = useLang();
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  const cards = [
    { icon: DollarSign, label: t.totalEarnings, value: "₹48,500", change: "+12% this month" },
    { icon: Wallet, label: t.pendingPayments, value: "₹8,200", change: "3 orders" },
    { icon: Package, label: t.activeOrders, value: "7", change: "2 new today" },
    { icon: TrendingUp, label: t.trendingDesigns, value: "Tepchi, Phanda", change: "High demand" },
  ];

  const quickLinks = [
    { icon: PlusCircle, label: t.addProduct, href: "#", desc: t.addProductDesc },
    { icon: Package, label: t.myInventory, href: "#", desc: t.myInventoryDesc },
    { icon: BarChart3, label: t.trendAdvisory, href: "#", desc: t.trendAdvisoryDesc },
    { icon: Wallet, label: t.walletPayments, href: "#", desc: t.walletDesc },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">{t.loading}</div>
      </div>
    );
  }

  if (!user) return null;

  if (profile?.role !== "artisan" && profile?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-center p-8">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold mb-2">Artisan Access Only</h2>
            <p className="text-muted-foreground mb-4">This dashboard is for registered artisans.</p>
            <Button variant="hero" asChild><Link to="/auth">Register as Artisan</Link></Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              {t.namasteKarigar}
            </h1>
            <p className="text-muted-foreground mb-2">{profile?.full_name || profile?.email}</p>
            <p className="text-muted-foreground mb-8">{t.artisanSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {cards.map((c, i) => (
              <motion.div
                key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-5 border border-border/50 shadow-warm"
              >
                <c.icon className="w-6 h-6 text-accent mb-3" />
                <div className="text-2xl font-display font-bold text-foreground">{c.value}</div>
                <div className="text-sm text-muted-foreground">{c.label}</div>
                <div className="text-xs text-accent mt-1">{c.change}</div>
              </motion.div>
            ))}
          </div>

          <h2 className="font-display text-xl font-semibold text-foreground mb-4">{t.quickActions}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((q, i) => (
              <motion.div key={q.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                <Link to={q.href} className="block bg-card rounded-xl p-6 border border-border/50 shadow-warm hover:shadow-gold transition-shadow group">
                  <q.icon className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold text-foreground">{q.label}</div>
                  <div className="text-sm text-muted-foreground">{q.desc}</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
