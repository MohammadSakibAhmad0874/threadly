"use client";

import { Star, ShieldCheck, Heart, Award, Users } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Vikram Malhotra",
    city: "Mumbai, Bandra West",
    garment: "3-Piece Tuxedo & 2 Shirts",
    review: "I had an important gala and absolutely zero time to visit a boutique. The master tailor came to my flat, measured 14 points, and delivered the tux 4 days later. The chest drape and shoulder slope were cleaner than Savile Row RTW suits I’ve spent 4x on.",
    rating: 5,
    tag: "Wedding Event",
  },
  {
    name: "Ananya Deshmukh",
    city: "Bengaluru, Indiranagar",
    garment: "Designer Saree Blouse",
    review: "Blouses are notoriously hard to get right with local tailors. Threadly's tailor understood the exact deep-back cut and padded structure I asked for. Delivered directly to my office. Didn't even need a single alteration!",
    rating: 5,
    tag: "Festive Saree",
  },
  {
    name: "Rohan & Priya Sengupta",
    city: "Delhi NCR, Gurgaon",
    garment: "Linen Kurtas & Trousers",
    review: "Used the 'Sample Garment' feature by giving them my favorite Ralph Lauren shirt. The replicated shirts fit 100% identically! Being able to track every stitch in real time on my phone is such a breath of fresh air.",
    rating: 5,
    tag: "Everyday Formal",
  },
];

const STATS = [
  { value: "14,500+", label: "Garments Tailored", icon: Award },
  { value: "99.2%", label: "First-Time Fit Accuracy", icon: ShieldCheck },
  { value: "14 Cities", label: "Doorstep Coverage", icon: Users },
  { value: "4.92 / 5", label: "Average Customer Rating", icon: Star },
];

export default function TrustSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {STATS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] text-center space-y-2 hover:border-[var(--primary)]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mx-auto">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs text-[var(--muted-foreground)] font-medium">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5" />
            Loved By Connoisseurs
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight">
            Stories From Our Clients
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)]">
            Read how thousands of professionals and families simplified bespoke tailoring with Threadly.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-surface-primary border border-[var(--border-subtle)] p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-surface-secondary text-[var(--muted-foreground)]">
                    {t.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed italic mb-6">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <div className="font-bold text-xs text-[var(--foreground)]">
                  {t.name}
                </div>
                <div className="text-[11px] text-[var(--muted-foreground)]">
                  {t.city} • <span className="text-[var(--primary)]">{t.garment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
