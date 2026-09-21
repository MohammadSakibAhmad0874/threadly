"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Clock, Scissors, Ruler, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[var(--primary)]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>India's Most Loved Doorstep Tailoring Experience</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--foreground)] tracking-tight leading-[1.12]">
              Your Perfect Fit,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-amber-400 to-[var(--primary-dark)]">
                Without Leaving Home.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Skip the trips to crowded markets and frustrating trial rooms. Book a master tailor to your doorstep for precision measurements, hand over your fabric, and receive bespoke handcrafted garments in as little as 3 days.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold text-base shadow-lg shadow-[var(--primary)]/25 hover:shadow-xl hover:shadow-[var(--primary)]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Book a Tailor Visit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/ai"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-surface-secondary hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-[var(--foreground)] font-semibold text-base transition-all duration-200 group"
              >
                <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
                <span>Try AI Style Advisor</span>
              </Link>
            </div>

            {/* Micro Trust Proofs */}
            <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[var(--muted-foreground)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Free 7-Day Fit Alterations</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-500" />
                <span>Express 72h Delivery Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-amber-500" />
                <span>Master Tailors (10+ Yrs Exp.)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card — Interactive Order Simulator Preview */}
              <div className="relative rounded-2xl bg-surface-primary/95 border border-[var(--border-subtle)] p-6 shadow-2xl backdrop-blur-md overflow-hidden">
                {/* Decorative stitch border header */}
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                    <span className="text-xs font-mono text-[var(--muted-foreground)] ml-2">LIVE THREAD TRACKER</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    In Progress
                  </span>
                </div>

                {/* Garment Preview Item */}
                <div className="mt-5 flex items-center gap-4 p-3.5 rounded-xl bg-surface-secondary/70 border border-[var(--border-subtle)]">
                  <div className="w-14 h-14 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center text-2xl font-serif">
                    👔
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[var(--foreground)] truncate">
                      Pure Linen Cutaway Collar Shirt
                    </h4>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Order #THR-2026-89412 • Egyptian White
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--primary)]/15 text-[var(--primary)] font-medium">
                        Custom Tailored
                      </span>
                      <span className="text-[10px] text-[var(--muted-foreground)]">
                        ETA: Tomorrow, 5 PM
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Steps Mini-Timeline */}
                <div className="mt-6 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[var(--foreground)]">Home Measurement Complete</span>
                        <span className="text-[10px] text-[var(--muted-foreground)]">10:30 AM</span>
                      </div>
                      <p className="text-[11px] text-[var(--muted-foreground)]">Master Tailor R. Sharma (14 checkpoints)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[var(--foreground)]">Fabric Handover & QC</span>
                        <span className="text-[10px] text-[var(--muted-foreground)]">11:15 AM</span>
                      </div>
                      <p className="text-[11px] text-[var(--muted-foreground)]">2.4m Cotton Linen inspected & tagged</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs flex-shrink-0 animate-pulse">
                      <Scissors className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[var(--primary)]">Master Cutting & Stitching</span>
                        <span className="text-[10px] text-amber-500 font-medium">Active Now</span>
                      </div>
                      <p className="text-[11px] text-[var(--muted-foreground)]">Needlework at bespoke atelier workshop</p>
                    </div>
                  </div>
                </div>

                {/* Quick Action Button inside preview */}
                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
                  <Link
                    href="/orders/THR-2026-DEMO1"
                    className="block w-full py-2.5 px-4 text-center rounded-lg bg-surface-secondary hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--foreground)] transition-colors"
                  >
                    View Live Simulation Tracker →
                  </Link>
                </div>
              </div>

              {/* Floating Stat Badge 1 */}
              <div className="absolute -bottom-6 -left-6 bg-surface-primary/95 border border-[var(--border-subtle)] p-3.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[var(--foreground)]">14 Body Points</div>
                  <div className="text-[11px] text-[var(--muted-foreground)]">Laser-accurate fitting</div>
                </div>
              </div>

              {/* Floating Stat Badge 2 */}
              <div className="absolute -top-4 -right-4 bg-surface-primary/95 border border-[var(--border-subtle)] p-3 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2 hidden sm:flex">
                <span className="text-amber-400 text-sm">★★★★★</span>
                <span className="text-xs font-bold text-[var(--foreground)]">4.9/5</span>
                <span className="text-[10px] text-[var(--muted-foreground)]">(12,000+ Fits)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
