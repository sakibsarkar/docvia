import { Button } from "@/components/ui/button";
import CtaButton from "../ui/blocks/CtaButton";

const FeatureCta = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
          <div className="rounded-2xl border border-border/40 bg-background/80 p-12 backdrop-blur-sm">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to get started?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Join thousands of businesses using our platform to create intelligent AI chatbots that
              users love.
            </p>
            <div className="flex items-center justify-center gap-4">
              <CtaButton text="Start Free Trial" />
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCta;
