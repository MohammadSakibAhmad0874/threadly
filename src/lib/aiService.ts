import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIStyleInput, AIStyleRecommendation, GarmentType } from "@/types";

const CURATED_FALLBACKS: Record<GarmentType, AIStyleRecommendation> = {
  shirt: {
    title: "Crisp Cutaway Collar Linen Shirt",
    description:
      "Designed for effortless elegance in warm or temperate climates, with superior drape and structured neckline.",
    garment: "shirt",
    fitProfile: "Slim Fit",
    fabric: {
      name: "100% Pure Irish Melange Linen",
      whyRecommended:
        "Natural slub weave creates breathable texture that drapes cleanly without clinging.",
      weight: "180 GSM (Lightweight)",
    },
    details: {
      collar: "Cutaway Collar",
      cuffs: "Single Button Rounded",
      pockets: "No Pocket (Clean Modern)",
    },
    colorPalette: [
      { name: "Egyptian Ecru", hex: "#F3EDE2" },
      { name: "French Riviera Blue", hex: "#3B82F6" },
      { name: "Sage Mist", hex: "#8DA399" },
    ],
    stylingTip:
      "Pair with unstructured chinos or tailored linen trousers. Leave the top two buttons unfastened for a relaxed Mediterranean silhouette.",
  },
  trousers: {
    title: "High-Waisted Gurkha Tapered Trousers",
    description:
      "Vintage military tailoring meets modern bespoke comfort with self-fabric buckled waistband and forward pleats.",
    garment: "trousers",
    fitProfile: "Tailored Taper",
    fabric: {
      name: "Super 120s Tropical Wool & Silk",
      whyRecommended:
        "Resists creasing while offering natural stretch and unmatched fluid drape.",
      weight: "240 GSM (Midweight)",
    },
    details: {
      collar: "Gurkha Dual Buckle",
      cuffs: '1.5" Turned-Up Hem',
      pockets: "Slanted Slash Pockets",
    },
    colorPalette: [
      { name: "Charcoal Slate", hex: "#2D3748" },
      { name: "Warm Taupe", hex: "#A39382" },
      { name: "Deep Navy", hex: "#1A202C" },
    ],
    stylingTip:
      "Wear with a tucked-in shirt or knit polo to showcase the handcrafted side tab adjusters.",
  },
  suit: {
    title: "Modern Milanese 2-Piece Bespoke Suit",
    description:
      "Soft shoulder construction (spalla camicia), high gorge lapels, and half-canvas chest piece for supreme comfort.",
    garment: "suit",
    fitProfile: "Tailored Slim",
    fabric: {
      name: "Super 130s Merino Wool Twill",
      whyRecommended:
        "Refined luster, year-round breathability, and natural memory against wrinkling during travel.",
      weight: "260 GSM (Four-Season)",
    },
    details: {
      collar: '3.5" Notch Lapel with Milanese Buttonhole',
      cuffs: "4 Working Surgeon Horn Buttons",
      pockets: "Jetted Pockets with Slanted Breast Welt",
    },
    colorPalette: [
      { name: "Midnight Navy", hex: "#0F172A" },
      { name: "Graphite Charcoal", hex: "#334155" },
      { name: "Burgundy Silk Lining", hex: "#831843" },
    ],
    stylingTip:
      "Add a crisp white linen pocket square folded straight. Avoid belt loops; use internal waist side adjusters.",
  },
  kurta: {
    title: "Asymmetric Silk Bandhgala Kurta",
    description:
      "A contemporary fusion cut featuring a clean side placket and subtle tone-on-tone thread embroidery.",
    garment: "kurta",
    fitProfile: "Straight Comfort Fit",
    fabric: {
      name: "Raw Chanderi Silk-Cotton Blend",
      whyRecommended:
        "Rich regal sheen without feeling stiff or heavy during festive evenings.",
      weight: "160 GSM (Festive)",
    },
    details: {
      collar: "2.5cm Mandarin Stand",
      cuffs: "Concealed Placket Sleeve",
      pockets: "Dual Deep In-Seam Pockets",
    },
    colorPalette: [
      { name: "Imperial Emerald", hex: "#065F46" },
      { name: "Antique Gold", hex: "#C59B27" },
      { name: "Ivory Pearl", hex: "#FDFBF7" },
    ],
    stylingTip:
      "Pair with a tailored raw silk Nehru waistcoat or tapered churidar in contrasting ecru.",
  },
  blouse: {
    title: "Architectural Deep-V Princess Cut Blouse",
    description:
      "Engineered with concealed support, sculpted shoulder straps, and a precision-fitted bodice for all-day comfort.",
    garment: "blouse",
    fitProfile: "Precision Contoured",
    fabric: {
      name: "Brocade Mulberry Silk with Cotton Voile Lining",
      whyRecommended:
        "Holds architectural shape while pure cotton lining prevents skin irritation.",
      weight: "200 GSM (Structured)",
    },
    details: {
      collar: "Sweetheart Neckline with Deep V Back",
      cuffs: "Elbow Length with Gold Zari Piping",
      pockets: "Concealed Side Zipper",
    },
    colorPalette: [
      { name: "Crimson Ruby", hex: "#9F1239" },
      { name: "Royal Indigo", hex: "#1E1B4B" },
      { name: "Metallic Gold", hex: "#D97706" },
    ],
    stylingTip:
      "Match with heavy silk sarees or contrast against contemporary organza drapes.",
  },
  dress: {
    title: "Bespoke Sculpted Wrap Midi Dress",
    description:
      "Flattering diagonal bias drape with custom waist cinch and discreet side pockets.",
    garment: "dress",
    fitProfile: "Fit & Flare",
    fabric: {
      name: "Double-Georgette Viscose Blend",
      whyRecommended:
        "Fluid movement with matte sophistication that flows effortlessly.",
      weight: "210 GSM (Fluid)",
    },
    details: {
      collar: "Surplice V-Neckline",
      cuffs: "Gentle Fluted Cuffs",
      pockets: "Dual Hidden Side Pockets",
    },
    colorPalette: [
      { name: "Dusty Rose", hex: "#BE185D" },
      { name: "Champagne Sand", hex: "#E7E5E4" },
      { name: "Forest Green", hex: "#14532D" },
    ],
    stylingTip:
      "Add metallic jewelry and block heels for evening cocktails or flats for gallery visits.",
  },
};

export async function getStyleRecommendation(
  input: AIStyleInput
): Promise<AIStyleRecommendation> {
  const apiKey = process.env.GEMINI_API_KEY;
  const fallback =
    CURATED_FALLBACKS[input.garment] || CURATED_FALLBACKS.shirt;

  // No valid key — return curated fallback immediately
  if (!apiKey || apiKey === "your_api_key_here" || apiKey.length < 10) {
    return {
      ...fallback,
      title: `${input.occasion ? input.occasion + ": " : ""}${fallback.title}`,
      description: input.notes
        ? `${input.notes} — Tailored with ${fallback.fabric.name}. ${fallback.description}`
        : fallback.description,
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    // Use gemini-2.0-flash with JSON mode to prevent empty outputs
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.8,
        maxOutputTokens: 1024,
      },
    });

    const prompt = `You are a professional fashion consultant for a bespoke tailoring service called THREADLY.
A customer wants a styling recommendation.

Garment type: ${input.garment}
Occasion: ${input.occasion || "Casual"}
Special notes: ${input.notes || "None"}

Respond ONLY with a JSON object matching this exact schema:
{
  "title": "string — creative garment title",
  "description": "string — 2 sentence design description",
  "garment": "${input.garment}",
  "fitProfile": "string — e.g. Slim Fit, Regular Fit, Tailored Taper",
  "fabric": {
    "name": "string — fabric name",
    "whyRecommended": "string — reason",
    "weight": "string — GSM and season"
  },
  "details": {
    "collar": "string",
    "cuffs": "string",
    "pockets": "string"
  },
  "colorPalette": [
    {"name": "string", "hex": "#RRGGBB"},
    {"name": "string", "hex": "#RRGGBB"},
    {"name": "string", "hex": "#RRGGBB"}
  ],
  "stylingTip": "string — practical styling advice"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    if (!text || text.trim().length === 0) {
      throw new Error("Empty model response");
    }

    // Strip any accidental markdown fences
    const cleanJson = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    const parsed = JSON.parse(cleanJson);
    return parsed as AIStyleRecommendation;
  } catch (err) {
    console.warn("Gemini generation fallback used:", err);
    return {
      ...fallback,
      title: `${input.occasion ? input.occasion + ": " : ""}${fallback.title}`,
    };
  }
}
