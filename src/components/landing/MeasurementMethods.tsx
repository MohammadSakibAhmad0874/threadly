"use client";

import { Ruler, Shirt, UserCheck, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

const METHODS = [
  {
    id: "doorstep_tailor",
    title: "Doorstep Master Tailor",
    subtitle: "Recommended for 1st time",
    description: "A professional tailoring master arrives with specialized measuring instruments. We record 14 body measurements, shoulder slope, and posture profile for an anatomical fit.",
    icon: Ruler,
    highlights: ["14 body checkpoints", "Shoulder slope & posture check", "Stored permanently for re-orders"],
  },
  {
    id: "sample_garment",
    title: "Clone a Sample Garment",
    subtitle: "Fastest & zero physical interaction",
    description: "Have a favorite shirt, kurta, or trouser that fits you like a dream? Hand it over to our courier during fabric pickup. We digitally digitize its exact seams and return it unblemished.",
    icon: Shirt,
    highlights: ["Laser seam digitization", "Sample safely returned with delivery", "No tape measure needed"],
  },
  {
    id: "stored_profile",
    title: "Saved Fit Profile",
    subtitle: "Instant 1-click checkout",
    description: "Once we’ve measured you once, your custom digital fit profile is saved securely to your account. Future orders skip measurement appointments completely.",
    icon: UserCheck,
    highlights: ["1-click re-ordering", "Adjustable if your weight shifts", "Multiple family profiles allowed"],
  },
];

export default function MeasurementMethods() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold uppercase tracking-wider">
            <Ruler className="w-3.5 h-3.5" />
            Precision Fit Technology
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-tight">
            Three Ways To Get Your Accurate Fit
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)]">
            Forget awkward self-measurements or vague S/M/L charts. We offer tailored precision that fits your real body shape.
          </p>
        </div>

        {/* 3 Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {METHODS.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className="rounded-2xl bg-surface-primary border border-[var(--border-subtle)] p-8 hover:border-[var(--primary)]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="text-[11px] font-semibold text-[var(--primary)] uppercase tracking-wider block mb-1">
                    {m.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">
                    {m.description}
                  </p>

                  <div className="space-y-2 border-t border-[var(--border-subtle)] pt-4">
                    {m.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-[var(--foreground)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href={`/book?measurement=${m.id}`}
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-surface-secondary hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--foreground)] transition-colors"
                  >
                    Select Option →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-surface-primary border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-[var(--foreground)]">
              Our 100% Fit Guarantee
            </h4>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
              If any garment does not fit exactly to your liking, our tailor visits for free alterations within 7 days of delivery.
            </p>
          </div>
          <Link
            href="/book"
            className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-semibold whitespace-nowrap"
          >
            Book with Confidence
          </Link>
        </div>

      </div>
    </section>
  );
}
