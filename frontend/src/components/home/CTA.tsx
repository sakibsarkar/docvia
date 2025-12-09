import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const benefits = ["Unlimited apps", "Real-time analytics", "Custom training"];

const CTA = () => {
  return (
    <section className="border-border/40 relative overflow-hidden border-t py-20 md:py-32">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-secondary/5 absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 transform rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-balance text-4xl font-bold md:text-5xl">
            Get started free, upgrade anytime
          </h2>

          <p className="text-muted-foreground mb-8 text-lg">
            Build an AI chatbot for free. When you&apos;re ready, unlock higher limits and advanced
            controls.
          </p>

          {/* Benefits */}
          <div className="text-muted-foreground mb-8 flex flex-col items-center justify-center gap-4 text-sm sm:flex-row">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="text-primary h-4 w-4" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan group w-full sm:w-auto"
            >
              Create your first app
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="w-full bg-transparent sm:w-auto">
              Explore examples
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
