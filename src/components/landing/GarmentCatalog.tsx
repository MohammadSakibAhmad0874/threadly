"use client";

import Link from "next/link";
import { ArrowUpRight, Scissors, Clock, Sparkles } from "lucide-react";

export interface GarmentCatalogItem {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  deliveryDays: number;
  description: string;
  fabricNeeded: string;
  popularStyles: string[];
  emoji: string;
}

export const CATALOG_ITEMS: GarmentCatalogItem[] = [
  {
    id: "shirt",
    name: "Bespoke Dress & Casual Shirts",
    category: "Menswear & Unisex",
    basePrice: 699,
    deliveryDays: 3,
    description: "Hand-finished collars, mother-of-pearl buttons, split yoke and precise shoulder slope.",
    fabricNeeded: "1.6 – 2.0 meters",
    popularStyles: ["Cutaway Collar", "French Cuff", "Band Collar", "Slim Tapered"],
    emoji: "👔",
  },
  {
    id: "trousers",
    name: "Tailored Trousers & Chinos",
    category: "Menswear & Unisex",
    basePrice: 899,
    deliveryDays: 4,
    description: "Curved waistbands, side adjusters or belt loops, reinforced crotch lining, clean break.",
    fabricNeeded: "1.2 – 1.4 meters",
    popularStyles: ["Gurkha Waistband", "Double Pleat", "Flat Front", "Tapered Ankle"],
    emoji: "👖",
  },
  {
    id: "suit",
    name: "2-Piece & 3-Piece Bespoke Suits",
    category: "Formal & Wedding",
    basePrice: 3499,
    deliveryDays: 7,
    description: "Half-canvas or full-canvas construction, hand-padded lapels, horn buttons, custom silk lining.",
    fabricNeeded: "3.2 – 3.8 meters",
    popularStyles: ["Peak Lapel", "Notch Lapel", "Double Breasted", "Tuxedo Shawl"],
    emoji: "🧥",
  },
  {
    id: "kurta",
    name: "Ethnic Kurtas & Nehru Jackets",
    category: "Ethnic & Festive",
    basePrice: 799,
    deliveryDays: 4,
    description: "Traditional plackets, concealed pockets, side slits, hand-embroidered or clean minimalist.",
    fabricNeeded: "2.2 – 2.5 meters",
    popularStyles: ["Mandarin Placket", "Asymmetric Kurta", "Bundi / Nehru Vest", "Pathani"],
    emoji: "🥻",
  },
  {
    id: "blouse",
    name: "Designer Saree Blouses",
    category: "Womenswear",
    basePrice: 649,
    deliveryDays: 3,
    description: "Built-in bra padding, princess cut, custom neck drops, hook/zipper closures, piped armholes.",
    fabricNeeded: "0.8 – 1.0 meter",
    popularStyles: ["Princess Cut", "Boat Neck", "Deep Back with Latkan", "Sleeveless High Neck"],
    emoji: "👗",
  },
  {
    id: "dress",
    name: "Custom Dresses & Jumpsuits",
    category: "Womenswear",
    basePrice: 1199,
    deliveryDays: 5,
    description: "Custom waist cinch, darts for flattering silhouettes, hidden zippers, bespoke pocket addition.",
    fabricNeeded: "2.5 – 3.5 meters",
    popularStyles: ["Fit & Flare", "Wrap Midi", "Utility Jumpsuit", "Maxi Dress"],
    emoji: "✨",
  },
];

export default function GarmentCatalog() {
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold uppercase tracking-wider">
              <Scissors className="w-3.5 h-3.5" />
              Tailoring Services
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight">
              Crafted To Your Exact Dimensions
            </h2>
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-xl">
              From boardroom crisp shirts to royal wedding sherwanis and red carpet dresses. All stitched with surgical precision.
            </p>
          </div>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline self-start md:self-auto"
          >
            <span>Start custom order</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid of Garments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATALOG_ITEMS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-surface-primary border border-[var(--border-subtle)] p-6 hover:border-[var(--primary)]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Emoji + Category + Price */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {item.emoji}
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[var(--muted-foreground)] uppercase font-semibold block">
                      Stitching from
                    </span>
                    <span className="text-xl font-extrabold text-[var(--foreground)]">
                      ₹{item.basePrice}
                    </span>
                  </div>
                </div>

                {/* Name & category */}
                <div className="mb-2">
                  <span className="text-[11px] text-[var(--primary)] font-medium">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {item.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Popular Style Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.popularStyles.map((style) => (
                    <span
                      key={style}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-surface-secondary text-[var(--muted-foreground)] border border-[var(--border-subtle)]"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta bottom */}
              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Ready in {item.deliveryDays} days</span>
                </div>

                <Link
                  href={`/book?garment=${item.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[var(--primary)] group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Book This</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
