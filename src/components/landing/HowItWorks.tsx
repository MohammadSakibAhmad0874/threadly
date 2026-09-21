"use client";

import { Scissors, Ruler, PackageCheck, Sparkles, Shirt } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    step: "01",
    title: "Choose Style & Options",
    description: "Pick from shirts, suits, kurtas, trousers or blouses. Customize collar styles, cuffs, pleats, pockets, and lapels with live preview.",
    icon: Shirt,
    badge: "Step 1",
  },
  {
    step: "02",
    title: "Doorstep Measurement",
    description: "A certified master tailor arrives at your preferred time slot with precision measuring instruments. Or simply hand over your favorite fitting sample garment.",
    icon: Ruler,
    badge: "Step 2",
  },
  {
    step: "03",
    title: "Fabric Handover",
    description: "Provide your own fabric during the tailor visit, or select from Threadly's curated mills collection. Our expert checks yardage, grain, and shrinkage pre-wash.",
    icon: Scissors,
    badge: "Step 3",
  },
  {
    step: "04",
    title: "Handcrafted Delivery",
    description: "Track every stitch live from pattern cutting to ironing. Your finished garment arrives steamed, boxed, and backed by our 100% Free Fit Alteration guarantee.",
    icon: PackageCheck,
    badge: "Step 4",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-surface-secondary/40 border-y border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Simple 4-Step Process
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight">
            How THREADLY Works
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)]">
            We’ve eliminated everything unpleasant about traditional tailoring: travelling in traffic, bargaining, vague delivery timelines, and ill-fitting surprises.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-2xl bg-surface-primary border border-[var(--border-subtle)] p-6 hover:border-[var(--primary)]/50 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Step badge & number */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-surface-secondary text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:bg-[var(--primary)]/10 transition-colors">
                      {item.badge}
                    </span>
                    <span className="font-mono text-3xl font-extrabold text-[var(--border-subtle)] group-hover:text-[var(--primary)]/30 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Heading & description */}
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]/60 text-right">
                  <span className="text-xs font-medium text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom banner CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[var(--primary)]/15 via-[var(--primary)]/5 to-transparent border border-[var(--primary)]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-[var(--foreground)]">
              Already have fabric at home waiting to be stitched?
            </h4>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
              Schedule a doorstep tailor pickup today. Slots available morning to evening.
            </p>
          </div>
          <Link
            href="/book"
            className="px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold text-sm shadow-md transition-all whitespace-nowrap"
          >
            Book Slot Now
          </Link>
        </div>

      </div>
    </section>
  );
}
