import PricingPlans from "./PricingPlans";

const PricingSection = () => {
  return (
    <section className="relative border-t border-border/40 py-20 md:py-32">
      {/* Background glow effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 bottom-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 left-0 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <div className="relative z-10 mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-primary uppercase">
            Simple, Transparent Pricing
          </p>
          <h2 className="mb-6 text-4xl font-bold text-balance text-foreground md:text-5xl">
            Choose the perfect plan for your needs
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free and upgrade as you grow. No credit card required for the basic plan.
          </p>
        </div>

        {/* Pricing cards */}
        <PricingPlans />

        {/* Footer note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          All plans include 24/7 support and our standard feature set. Questions?{" "}
          <a href="#faq" className="text-primary hover:underline">
            Check our FAQ
          </a>
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
