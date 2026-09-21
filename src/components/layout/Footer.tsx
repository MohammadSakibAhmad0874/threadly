"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-secondary border-t border-[var(--border-subtle)] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center font-bold text-lg font-serif">
                T
              </span>
              <span className="font-serif text-xl font-bold text-[var(--foreground)] tracking-tight">
                THREADLY
              </span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Bespoke, made-to-measure tailoring delivered to your doorstep. We bring master tailors and precise fit technology right into your home.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Service available in 14 cities across India
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--muted-foreground)]">
              <li><Link href="/book?garment=shirt" className="hover:text-[var(--primary)] transition-colors">Bespoke Shirts</Link></li>
              <li><Link href="/book?garment=suit" className="hover:text-[var(--primary)] transition-colors">2-Piece & 3-Piece Suits</Link></li>
              <li><Link href="/book?garment=kurta" className="hover:text-[var(--primary)] transition-colors">Kurtas & Sherwanis</Link></li>
              <li><Link href="/book?garment=trousers" className="hover:text-[var(--primary)] transition-colors">Trousers & Chinos</Link></li>
              <li><Link href="/book?garment=blouse" className="hover:text-[var(--primary)] transition-colors">Saree Blouses & Lehengas</Link></li>
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-4">
              Experience
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--muted-foreground)]">
              <li><Link href="/ai" className="hover:text-[var(--primary)] transition-colors">THREADLY Style AI</Link></li>
              <li><Link href="/orders/track" className="hover:text-[var(--primary)] transition-colors">Live Stitch Tracker</Link></li>
              <li><Link href="/landing#how-it-works" className="hover:text-[var(--primary)] transition-colors">How It Works</Link></li>
              <li><Link href="/profile" className="hover:text-[var(--primary)] transition-colors">Measurement Profiles</Link></li>
              <li><Link href="/landing#pricing" className="hover:text-[var(--primary)] transition-colors">Transparent Pricing</Link></li>
            </ul>
          </div>

          {/* Guarantee & Help */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-4">
              Fit Guarantee
            </h4>
            <div className="p-3.5 rounded-xl bg-surface-primary border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--foreground)]">
                <span className="text-amber-500">★</span>
                100% Perfect Fit Promise
              </div>
              <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
                If it does not fit like a glove, our tailor visits for free alterations within 7 days. No questions asked.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border-subtle)] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
          <p>© {new Date().getFullYear()} THREADLY Tailoring Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[var(--primary)] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[var(--primary)] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[var(--primary)] cursor-pointer">Support: 1800-FIT-THREAD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
