import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const filters = ["All", "Tepchi", "Phanda", "Murri", "Jaali", "Shadow Work"];

const products = [
  { id: 1, name: "White Chikankari Kurta", artisan: "Fatima Bi", price: "₹3,200", stitch: "Tepchi", rating: 4.8, certified: true },
  { id: 2, name: "Pastel Chikan Dupatta", artisan: "Noor Jahan", price: "₹1,800", stitch: "Shadow Work", rating: 4.6, certified: true },
  { id: 3, name: "Chikankari Saree - White", artisan: "Amina Khatoon", price: "₹8,500", stitch: "Jaali", rating: 4.9, certified: true },
  { id: 4, name: "Cotton Chikan Palazzo Set", artisan: "Razia Begum", price: "₹2,400", stitch: "Murri", rating: 4.5, certified: false },
  { id: 5, name: "Chikan Embroidered Kurta", artisan: "Shabnam", price: "₹4,100", stitch: "Phanda", rating: 4.7, certified: true },
  { id: 6, name: "Lucknowi Anarkali", artisan: "Husna Bi", price: "₹5,600", stitch: "Tepchi", rating: 4.8, certified: true },
];

export default function BuyerShop() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Shop Authentic Chikankari
            </h1>
            <p className="text-muted-foreground mb-8">
              Every piece is handcrafted by Lucknow's finest artisans.
            </p>
          </motion.div>

          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            <Button variant="outline" size="default">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((f, i) => (
              <button
                key={f}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl border border-border/50 overflow-hidden shadow-warm hover:shadow-gold transition-shadow group"
              >
                <div className="h-56 bg-secondary flex items-center justify-center">
                  <span className="text-4xl">🧵</span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-semibold text-foreground leading-tight">{p.name}</h3>
                    {p.certified && (
                      <Shield className="w-5 h-5 text-accent flex-shrink-0 ml-2" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">by {p.artisan}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span className="px-2 py-0.5 rounded bg-secondary text-xs">{p.stitch}</span>
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                      {p.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-display font-bold text-foreground">{p.price}</span>
                    <Button variant="hero" size="sm">View Details</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
