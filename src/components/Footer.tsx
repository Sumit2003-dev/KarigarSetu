import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold mb-3">
              Chikan<span className="text-gold">Setu</span>
            </h3>
            <p className="text-primary-foreground/70 text-sm max-w-sm leading-relaxed">
              Bridging Lucknow's timeless Chikankari artisans to the world — ensuring fair prices,
              authentic craftsmanship, and economic empowerment.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gold-light">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/shop" className="hover:text-primary-foreground transition-colors">Shop</Link></li>
              <li><Link to="/artisan" className="hover:text-primary-foreground transition-colors">Artisan Portal</Link></li>
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gold-light">Support</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/buyer" className="hover:text-primary-foreground transition-colors">Buyer Help</Link></li>
              <li><Link to="/boutique" className="hover:text-primary-foreground transition-colors">Boutique Partners</Link></li>
              <li><Link to="/admin" className="hover:text-primary-foreground transition-colors">Admin</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} ChikanSetu. Empowering artisans, one stitch at a time.
        </div>
      </div>
    </footer>
  );
}
