import { Footer, Header } from "@/components";
import CodeSnippet from "@/components/home/CodeSnippet";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Integration from "@/components/home/Integration";
import WhyBuilt from "@/components/home/WhyBuilt";
import PricingSection from "@/components/pricing/PricingSection";

const HomeView = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Integration />
      <Features />
      <HowItWorks />
      <CodeSnippet />
      <WhyBuilt />
      <PricingSection />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
};

export default HomeView;
