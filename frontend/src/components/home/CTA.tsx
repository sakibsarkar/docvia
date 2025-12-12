import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import CtaButton from "../ui/blocks/CtaButton";

const benefits = ["Unlimited apps", "Real-time analytics", "Custom training"];

const CTA = () => {
  return (
    <section className="relative overflow-hidden border-t border-border/40 py-20 md:py-32">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-balance md:text-5xl">
            Get started free, upgrade anytime
          </h2>

          <p className="mb-8 text-lg text-muted-foreground">
            Build an AI chatbot for free. When you&apos;re ready, unlock higher limits and advanced
            controls.
          </p>

          {/* Benefits */}
          <div className="mb-8 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:flex-row">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton text="Create your first app" />
            <Link href="/register">
              <Button size="lg" variant="outline" className="w-full bg-transparent sm:w-auto">
                Explore examples
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
