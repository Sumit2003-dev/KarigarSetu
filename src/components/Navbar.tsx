import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Artisan", href: "/artisan" },
  { label: "About", href: "/about" },
];

const languages = ["English", "हिन्दी", "اردو"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState(0);
  const location = useLocation();

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
          <button
            onClick={() => setLang((l) => (l + 1) % languages.length)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="w-4 h-4" />
            {languages[lang]}
          </button>
          <Button variant="hero" size="sm" asChild>
            <Link to="/artisan">Register as Artisan</Link>
          </Button>
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
                  className="text-base font-medium text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <button
                onClick={() => setLang((l) => (l + 1) % languages.length)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <Globe className="w-4 h-4" />
                {languages[lang]}
              </button>
              <Button variant="hero" size="sm" asChild>
                <Link to="/artisan" onClick={() => setMobileOpen(false)}>Register as Artisan</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
