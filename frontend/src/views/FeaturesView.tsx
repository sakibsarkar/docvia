import AiCapabilities from "@/components/Features/AiCapabilities";
import Analytics from "@/components/Features/Analytics";
import CoreFeatures from "@/components/Features/CoreFeatures";
import Customization from "@/components/Features/Customization";
import FeatureCta from "@/components/Features/FeatureCta";
import FeatureHero from "@/components/Features/FeatureHero";
import Integration from "@/components/Features/Integration";

const FeaturesView = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <FeatureHero />
      <CoreFeatures />
      <AiCapabilities />
      <Customization />
      <Analytics />
      <Integration />
      <FeatureCta />
    </main>
  );
};

export default FeaturesView;
