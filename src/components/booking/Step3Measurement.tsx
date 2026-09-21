"use client";

import { MeasurementMethod } from "@/types";
import { Ruler, Shirt, UserCheck, CheckCircle2, ArrowLeft, ArrowRight, Shield } from "lucide-react";
import { useUserStore } from "@/store/userStore";

interface Step3MeasurementProps {
  method: MeasurementMethod;
  onSelectMethod: (method: MeasurementMethod) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Measurement({
  method,
  onSelectMethod,
  onNext,
  onBack,
}: Step3MeasurementProps) {
  const { user } = useUserStore();

  const options = [
    {
      id: "doorstep_tailor" as MeasurementMethod,
      title: "Doorstep Master Tailor Visit",
      badge: "Recommended for 1st Time",
      desc: "A master tailor comes to your doorstep with digital measuring instruments. We record 14 anatomical checkpoints, shoulder slope, and posture profile.",
      icon: Ruler,
      points: [
        "Complimentary doorstep appointment",
        "14 anatomical checkpoints mapped",
        "Saved permanently to your Threadly account",
      ],
    },
    {
      id: "sample_garment" as MeasurementMethod,
      title: "Hand Over Sample Garment",
      badge: "Zero Contact & Fast",
      desc: "Hand over your best-fitting garment (shirt, trousers, or kurta) during fabric pickup. We digitally measure each seam and return your sample safely with the final delivery.",
      icon: Shirt,
      points: [
        "100% replica of your favorite fit",
        "Safe return guaranteed in garment bag",
        "No measuring tape appointment required",
      ],
    },
    {
      id: "stored_profile" as MeasurementMethod,
      title: "Use Saved Fit Profile",
      badge: user?.measurements ? "Profile Ready" : "No Profile Found",
      desc: user?.measurements
        ? `Use your verified measurements: Chest ${user.measurements.chest || 40}", Waist ${user.measurements.waist || 34}", Inseam ${user.measurements.inseam || 32}".`
        : "You haven't saved a measurement profile yet. You can still choose this, and our tailor will calibrate your default profile during this order.",
      icon: UserCheck,
      points: [
        "Fastest checkout experience",
        "Instant re-ordering with historical adjustments",
        "Editable anytime in your profile",
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-[var(--foreground)]">
          Choose How We Measure You
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
          Every body is unique. Select your preferred method to achieve a tailored millimeter-accurate fit.
        </p>
      </div>

      {/* Options Stack */}
      <div className="space-y-4">
        {options.map((opt) => {
          const isSel = method === opt.id;
          const Icon = opt.icon;
          return (
            <div
              key={opt.id}
              onClick={() => onSelectMethod(opt.id)}
              className={`cursor-pointer rounded-2xl p-6 border transition-all duration-200 relative flex flex-col sm:flex-row items-start gap-5 ${
                isSel
                  ? "border-[var(--primary)] bg-[var(--primary)]/5 ring-2 ring-[var(--primary)]/20 shadow-md"
                  : "border-[var(--border-subtle)] bg-surface-primary hover:border-[var(--border-strong)] hover:bg-surface-secondary/40"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isSel
                    ? "bg-[var(--primary)] text-white"
                    : "bg-surface-secondary text-[var(--primary)]"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-[var(--foreground)]">
                    {opt.title}
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                    {opt.badge}
                  </span>
                </div>

                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  {opt.desc}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                  {opt.points.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[var(--foreground)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="self-end sm:self-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSel
                      ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                      : "border-[var(--border-subtle)] bg-surface-primary"
                  }`}
                >
                  {isSel && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fit Guarantee Callout */}
      <div className="p-4 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] flex items-center gap-3">
        <Shield className="w-5 h-5 text-amber-500 flex-shrink-0" />
        <div className="text-xs">
          <span className="font-bold text-[var(--foreground)]">Threadly Fit Promise: </span>
          <span className="text-[var(--muted-foreground)]">
            Whichever method you choose, if the fit isn't right on delivery, we provide free doorstep alteration within 7 days.
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--border-subtle)]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs sm:text-sm font-semibold shadow-md transition-all"
        >
          <span>Next: Fabric Handover Options</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
