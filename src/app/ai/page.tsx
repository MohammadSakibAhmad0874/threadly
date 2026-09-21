"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GarmentType, AIStyleRecommendation } from "@/types";
import { useBookingStore } from "@/store/bookingStore";
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  Layers,
  Scissors,
  CheckCircle2,
  Palette,
  Lightbulb,
  Zap,
} from "lucide-react";

const OCCASIONS = [
  "Boardroom & Business Formal",
  "Destination Summer Wedding",
  "Cocktail Gala & Black Tie",
  "Festive Diwali & Eid Ethnic",
  "Smart Casual Weekend",
];

const PRESETS = [
  {
    label: "Goa Beach Wedding",
    garment: "shirt" as GarmentType,
    occasion: "Destination Summer Wedding",
    prompt: "A breathable, refined linen shirt for a sunset beach wedding. Something crisp that handles humidity.",
  },
  {
    label: "Executive Boardroom Suit",
    garment: "suit" as GarmentType,
    occasion: "Boardroom & Business Formal",
    prompt: "Charcoal or navy 2-piece power suit with sharp shoulders and modern tapered trousers.",
  },
  {
    label: "Festive Silk Kurta",
    garment: "kurta" as GarmentType,
    occasion: "Festive Diwali & Eid Ethnic",
    prompt: "Royal festive kurta with understated elegance and Nehru vest pairing in jewel tones.",
  },
  {
    label: "Saree Blouse for Sangeet",
    garment: "blouse" as GarmentType,
    occasion: "Festive Diwali & Eid Ethnic",
    prompt: "Modern deep back cut blouse with delicate piping that pairs with heavy Kanjeevaram silk.",
  },
];

export default function StyleAIPage() {
  const router = useRouter();
  const { setGarment, setCustomizations, setFabric, setStep } = useBookingStore();

  const [garment, setSelectedGarment] = useState<GarmentType>("shirt");
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [freeformPrompt, setFreeformPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIStyleRecommendation | null>(null);

  const handleGenerate = async (presetPrompt?: string, presetGarment?: GarmentType, presetOccasion?: string) => {
    setLoading(true);
    const activeGarment = presetGarment || garment;
    const activeOccasion = presetOccasion || occasion;
    const activePrompt = presetPrompt !== undefined ? presetPrompt : freeformPrompt;

    try {
      const res = await fetch("/api/ai/style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          garment: activeGarment,
          occasion: activeOccasion,
          notes: activePrompt,
        }),
      });

      const data = await res.json();
      if (data.recommendation) {
        setResult(data.recommendation);
      }
    } catch (err) {
      console.error("AI recommendation failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToBooking = () => {
    if (!result) return;
    setGarment(result.garment);
    setCustomizations({
      fit: result.fitProfile,
      collar: result.details.collar,
      cuff: result.details.cuffs,
      pockets: result.details.pockets,
      specialNotes: `AI Style Advice: ${result.title}. Tip: ${result.stylingTip}`,
    });
    setFabric({
      type: "source_threadly",
      material: result.fabric.name,
      notes: result.fabric.whyRecommended,
    });
    setStep(2);
    router.push(`/book?garment=${result.garment}&ai=true`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>THREADLY Style AI</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] tracking-tight">
          Your Personal Bespoke Stylist
        </h1>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
          Powered by generative AI and centuries of tailoring heritage. Tell us your event or aesthetic goal, and we’ll architect the ideal silhouette, fabric, and finishing touches.
        </p>
      </div>

      {/* Preset Inspiration Chips */}
      <div className="space-y-2 text-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block">
          One-Click Inspiration Prompts:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setSelectedGarment(p.garment);
                setOccasion(p.occasion);
                setFreeformPrompt(p.prompt);
                handleGenerate(p.prompt, p.garment, p.occasion);
              }}
              className="px-3 py-1.5 rounded-full bg-surface-secondary hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--foreground)] transition-colors"
            >
              ✨ {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Card */}
      <div className="rounded-3xl bg-surface-primary border border-[var(--border-subtle)] p-6 sm:p-10 shadow-xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Garment */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] block mb-2">
              Garment Type
            </label>
            <select
              value={garment}
              onChange={(e) => setSelectedGarment(e.target.value as GarmentType)}
              className="w-full px-3.5 py-3 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs font-semibold text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none"
            >
              <option value="shirt">Bespoke Dress / Casual Shirt</option>
              <option value="suit">2-Piece / 3-Piece Suit</option>
              <option value="kurta">Ethnic Kurta & Nehru Jacket</option>
              <option value="trousers">Tailored Trousers & Chinos</option>
              <option value="blouse">Designer Saree Blouse</option>
              <option value="dress">Custom Dress / Jumpsuit</option>
            </select>
          </div>

          {/* Occasion */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] block mb-2">
              Occasion & Dress Code
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs font-semibold text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none"
            >
              {OCCASIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Freeform Prompt */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] block mb-2">
            Tell the AI Stylist About Your Vibe & Preferences
          </label>
          <textarea
            rows={3}
            placeholder="e.g. I prefer crisp minimal cuts, lighter shades like sage or ecru, and need it to look sharp on stage during an keynote talk..."
            value={freeformPrompt}
            onChange={(e) => setFreeformPrompt(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-[var(--border-subtle)] text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none"
          />
        </div>

        {/* Generate Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => handleGenerate()}
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold text-xs sm:text-sm shadow-xl shadow-[var(--primary)]/25 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Crafting Bespoke Recommendation...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Bespoke Styling</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Recommendation Output Result Card */}
      {result && (
        <div className="rounded-3xl bg-surface-primary border border-[var(--border-subtle)] p-6 sm:p-10 shadow-2xl space-y-8 animate-in slide-in-from-bottom-6 duration-500">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-500 uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                Curated Recommendation
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                {result.title}
              </h2>
            </div>

            <button
              onClick={handleApplyToBooking}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs sm:text-sm font-bold shadow-lg transition-all self-start sm:self-auto"
            >
              <span>Apply to Booking & Schedule Tailor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed italic">
            "{result.description}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Fabric Suggestion */}
            <div className="p-6 rounded-2xl bg-surface-secondary/70 border border-[var(--border-subtle)] space-y-3">
              <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Recommended Textile</span>
              </div>
              <h3 className="text-base font-bold text-[var(--foreground)]">
                {result.fabric.name}
              </h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                {result.fabric.whyRecommended}
              </p>
              <div className="pt-2 text-[11px] text-[var(--primary)] font-semibold">
                Weight / Weave: {result.fabric.weight}
              </div>
            </div>

            {/* Silhouette & Details */}
            <div className="p-6 rounded-2xl bg-surface-secondary/70 border border-[var(--border-subtle)] space-y-3">
              <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-xs uppercase tracking-wider">
                <Scissors className="w-4 h-4" />
                <span>Silhouette & Finishes</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-surface-primary">
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Fit</span>
                  <span className="font-bold text-[var(--foreground)]">{result.fitProfile}</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-primary">
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Collar / Lapel</span>
                  <span className="font-bold text-[var(--foreground)]">{result.details.collar}</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-primary">
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Cuffs / Hem</span>
                  <span className="font-bold text-[var(--foreground)]">{result.details.cuffs}</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-primary">
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Pockets</span>
                  <span className="font-bold text-[var(--foreground)]">{result.details.pockets}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Color Palette Swatches */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
              <Palette className="w-4 h-4 text-[var(--primary)]" />
              <span>Recommended Color Palette</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {result.colorPalette.map((color, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface-secondary border border-[var(--border-subtle)]"
                >
                  <div
                    className="w-4 h-4 rounded-full border border-black/20 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="text-xs font-semibold text-[var(--foreground)]">{color.name}</div>
                  <span className="font-mono text-[10px] text-[var(--muted-foreground)]">{color.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Styling Tip */}
          <div className="p-4 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-start gap-3 text-xs">
            <Lightbulb className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[var(--foreground)]">Master Stylist Tip: </span>
              <span className="text-[var(--muted-foreground)]">{result.stylingTip}</span>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="text-center pt-4 border-t border-[var(--border-subtle)]">
            <button
              onClick={handleApplyToBooking}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs sm:text-sm font-bold shadow-lg transition-all"
            >
              <span>Continue with this Custom Spec in Booking Wizard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
