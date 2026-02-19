import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Globe, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLang, Language } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const langOptions: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ur", label: "اردو" },
];

const roleRoutes: Record<string, string> = {
  artisan: "/artisan",
  buyer: "/shop",
  boutique: "/boutique",
  admin: "/admin",
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, lang, setLang } = useLang();
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: t.home, href: "/" },
    { label: t.shop, href: "/shop" },
    { label: t.artisan, href: "/artisan" },
    { label: t.about, href: "/about" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex items-center justify-between h-16 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight">
            Chikan<span className="text-gradient-gold">Setu</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === l.href ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Language picker */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-secondary"
            >
              <Globe className="w-4 h-4" />
              {langOptions.find((l) => l.code === lang)?.label}
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full right-0 mt-1 bg-card border border-border rounded-xl shadow-warm overflow-hidden min-w-[130px]"
                >
                  {langOptions.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-secondary ${
                        lang === l.code ? "text-accent font-medium bg-accent/5" : "text-foreground"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {user && profile ? (
            <div className="flex items-center gap-2">
              <Link
                to={roleRoutes[profile.role] || "/"}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-secondary"
              >
                <LayoutDashboard className="w-4 h-4" />
                {t.myDashboard}
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="flex items-center gap-1.5">
                <LogOut className="w-4 h-4" />
                {t.logout}
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/auth">{t.login}</Link>
              </Button>
              <Button variant="hero" size="sm" asChild>
                <Link to="/auth">{t.registerArtisan}</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    location.pathname === l.href ? "text-accent" : "text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              ))}

              {/* Mobile language switcher */}
              <div className="flex gap-2 flex-wrap">
                {langOptions.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      lang === l.code
                        ? "bg-accent text-accent-foreground border-accent"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {user && profile ? (
                <>
                  <Link
                    to={roleRoutes[profile.role] || "/"}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-base font-medium text-foreground"
                  >
                    <LayoutDashboard className="w-5 h-5 text-accent" />
                    {t.myDashboard}
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => { handleSignOut(); setMobileOpen(false); }}>
                    <LogOut className="w-4 h-4 mr-1.5" />
                    {t.logout}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/auth" onClick={() => setMobileOpen(false)}>{t.login}</Link>
                  </Button>
                  <Button variant="hero" size="sm" asChild>
                    <Link to="/auth" onClick={() => setMobileOpen(false)}>{t.registerArtisan}</Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
