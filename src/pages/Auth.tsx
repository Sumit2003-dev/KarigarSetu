import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLang } from "@/contexts/LanguageContext";
import { Globe, Eye, EyeOff } from "lucide-react";

const roles = [
  { value: "buyer", label_key: "buyer" as const, icon: "🛍️" },
  { value: "artisan", label_key: "artisan" as const, icon: "🧵" },
  { value: "boutique", label_key: "boutique" as const, icon: "🏬" },
];

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedRole, setSelectedRole] = useState("buyer");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { signIn, signUp } = useAuth();
  const { t, lang, setLang } = useLang();
  const navigate = useNavigate();

  const langOptions: { code: "en" | "hi" | "ur"; label: string }[] = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "ur", label: "اردو" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (isSignUp) {
      const { error } = await signUp(email, password, fullName, selectedRole);
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Account created! Please check your email to verify, then sign in.");
        setIsSignUp(false);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate("/");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Language picker */}
      <div className="absolute top-4 right-4 flex gap-2">
        {langOptions.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              lang === l.code
                ? "bg-accent text-accent-foreground border-accent"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex justify-center mb-8">
          <span className="font-display text-3xl font-bold text-foreground">
            Chikan<span className="text-gradient-gold">Setu</span>
          </span>
        </Link>

        <div className="bg-card rounded-2xl border border-border/50 shadow-warm p-8">
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            {isSignUp ? t.joinChikanSetu : t.welcomeBack}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">{t.authSubtitle}</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-accent/10 border border-accent/20 text-sm text-accent">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1.5">
                <Label htmlFor="fullName">{t.fullName}</Label>
                <Input
                  id="fullName"
                  placeholder={t.fullName}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label>{t.selectRole}</Label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setSelectedRole(r.value)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                        selectedRole === r.value
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-muted-foreground hover:border-accent/50"
                      }`}
                    >
                      <span className="text-xl">{r.icon}</span>
                      <span>{t[r.label_key]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading
                ? isSignUp ? t.creatingAccount : t.signingIn
                : isSignUp ? t.signUp : t.signIn}
            </Button>
          </form>

          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(""); setSuccess(""); }}
            className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            {isSignUp ? t.alreadyHaveAccount : t.dontHaveAccount}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
