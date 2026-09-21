import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import GarmentCatalog from "@/components/landing/GarmentCatalog";
import FabricGuidance from "@/components/landing/FabricGuidance";
import MeasurementMethods from "@/components/landing/MeasurementMethods";
import PricingEstimator from "@/components/landing/PricingEstimator";
import TrustSection from "@/components/landing/TrustSection";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <HowItWorks />
      <GarmentCatalog />
      <FabricGuidance />
      <MeasurementMethods />
      <PricingEstimator />
      <TrustSection />
    </div>
  );
}
