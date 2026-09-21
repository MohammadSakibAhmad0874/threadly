"use client";

import { CheckCircle2, HelpCircle, Layers, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function FabricGuidance() {
  return (
    <section className="py-20 bg-surface-secondary/40 border-y border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Fabric Flexibility
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight">
            Bring Your Own Fabric, Or Let Us Source It
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)]">
            Whether you bought heirloom silk in Varanasi, fine linen from Italy, or need us to supply premium Egyptian cotton, we handle your fabric with utmost care.
          </p>
        </div>

        {/* 2 Big Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {/* Option A: Customer Fabric */}
          <div className="rounded-2xl bg-surface-primary border border-[var(--border-subtle)] p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)]">
                Provide Your Own Fabric
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                Hand your fabric to our master tailor during the doorstep measurement visit. We’ll measure the yardage on the spot, tag it with an RFID barcoded bag, and inspect for flaws.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-[var(--foreground)]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Doorstep pickup included at zero extra cost</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[var(--foreground)]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Complimentary pre-wash spongeing to prevent shrinkage</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[var(--foreground)]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Excess fabric returned cleanly folded with your order</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
              <Link
                href="/book?fabric=provide_own"
                className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-colors"
              >
                Book with My Fabric
              </Link>
            </div>
          </div>

          {/* Option B: Threadly Mill Sourcing */}
          <div className="rounded-2xl bg-surface-primary border border-[var(--border-subtle)] p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase">
                Full Convenience
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)]">
                Source Through THREADLY
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                Don’t have time to fabric hunt? Choose from our curated catalog of Raymond, Arvind Mills, Loro Piana, and organic linen swatches brought directly to your home.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-[var(--foreground)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                  <span>Tailor carries physical swatch book of 60+ fabrics</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[var(--foreground)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                  <span>Pure Egyptian Giza cotton, Irish linen, Super 120s wool</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[var(--foreground)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                  <span>Guaranteed authentic mill certifications & color fastness</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
              <Link
                href="/book?fabric=source_threadly"
                className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl bg-surface-secondary hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-[var(--foreground)] text-xs font-bold transition-colors"
              >
                Explore Mill Sourcing
              </Link>
            </div>
          </div>
        </div>

        {/* Fabric Requirement Guide Quick Table */}
        <div className="rounded-2xl bg-surface-primary border border-[var(--border-subtle)] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <h4 className="text-sm font-bold text-[var(--foreground)]">
              Standard Fabric Length Estimation Guide
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-surface-secondary">
              <div className="font-semibold text-[var(--foreground)]">Full Shirt</div>
              <div className="text-[var(--primary)] font-bold mt-1">1.6 – 2.0 m</div>
              <div className="text-[10px] text-[var(--muted-foreground)]">36" or 58" width</div>
            </div>
            <div className="p-3 rounded-lg bg-surface-secondary">
              <div className="font-semibold text-[var(--foreground)]">Trouser</div>
              <div className="text-[var(--primary)] font-bold mt-1">1.2 – 1.4 m</div>
              <div className="text-[10px] text-[var(--muted-foreground)]">58" standard width</div>
            </div>
            <div className="p-3 rounded-lg bg-surface-secondary">
              <div className="font-semibold text-[var(--foreground)]">2-Piece Suit</div>
              <div className="text-[var(--primary)] font-bold mt-1">3.0 – 3.2 m</div>
              <div className="text-[10px] text-[var(--muted-foreground)]">58" suit suiting</div>
            </div>
            <div className="p-3 rounded-lg bg-surface-secondary">
              <div className="font-semibold text-[var(--foreground)]">Long Kurta</div>
              <div className="text-[var(--primary)] font-bold mt-1">2.2 – 2.5 m</div>
              <div className="text-[10px] text-[var(--muted-foreground)]">Knee length</div>
            </div>
            <div className="p-3 rounded-lg bg-surface-secondary">
              <div className="font-semibold text-[var(--foreground)]">Saree Blouse</div>
              <div className="text-[var(--primary)] font-bold mt-1">0.8 – 1.0 m</div>
              <div className="text-[10px] text-[var(--muted-foreground)]">Padded / Sleeves</div>
            </div>
            <div className="p-3 rounded-lg bg-surface-secondary">
              <div className="font-semibold text-[var(--foreground)]">Maxi Dress</div>
              <div className="text-[var(--primary)] font-bold mt-1">3.0 – 3.5 m</div>
              <div className="text-[10px] text-[var(--muted-foreground)]">Full flare</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
