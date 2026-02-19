import { motion } from "framer-motion";
import { Users, ShieldCheck, AlertTriangle, TrendingUp, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const districts = [
  { name: "Lucknow Central", artisans: 1420, revenue: "₹48L" },
  { name: "Chowk", artisans: 980, revenue: "₹32L" },
  { name: "Aminabad", artisans: 860, revenue: "₹28L" },
  { name: "Kaiserbagh", artisans: 740, revenue: "₹22L" },
  { name: "Daliganj", artisans: 620, revenue: "₹18L" },
];

export default function AdminDashboard() {
  const { t } = useLang();
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  const stats = [
    { icon: Users, label: t.totalArtisans, value: "5,142" },
    { icon: ShieldCheck, label: t.verifiedProducts, value: "11,870" },
    { icon: AlertTriangle, label: t.openDisputes, value: "23" },
    { icon: TrendingUp, label: t.avgIncomeUplift, value: "+68%" },
  ];

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="text-muted-foreground">{t.loading}</div></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">{t.adminTitle}</h1>
            <p className="text-muted-foreground mb-8">{t.adminSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-5 border border-border/50 shadow-warm"
              >
                <s.icon className="w-6 h-6 text-accent mb-3" />
                <div className="text-2xl font-display font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            {t.districtPerformance}
          </h2>
          <div className="bg-card rounded-xl border border-border/50 shadow-warm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left p-4 font-semibold text-foreground">{t.district}</th>
                    <th className="text-left p-4 font-semibold text-foreground">{t.totalArtisans}</th>
                    <th className="text-left p-4 font-semibold text-foreground">{t.revenue}</th>
                  </tr>
                </thead>
                <tbody>
                  {districts.map((d) => (
                    <tr key={d.name} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="p-4 text-foreground font-medium">{d.name}</td>
                      <td className="p-4 text-muted-foreground">{d.artisans.toLocaleString()}</td>
                      <td className="p-4 text-accent font-semibold">{d.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
