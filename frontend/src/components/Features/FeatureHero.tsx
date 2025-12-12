import { Sparkles } from "lucide-react";
import Link from "next/link";
import CtaButton from "../ui/blocks/CtaButton";
import { Button } from "../ui/button";

const FeatureHero = () => {
  return (
    <section className="border-b border-border/40 py-20 md:py-32">
      <div className="container mx-auto px-4 text-center md:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary">
          <Sparkles className="h-4 w-4" />
          <span>Powered by Advanced AI</span>
        </div>
        <h1 className="mb-6 text-5xl font-bold text-balance md:text-6xl lg:text-7xl">
          Everything you need to build <br />
          <span className="text-primary">effective AI chatbots</span>
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl text-balance text-muted-foreground">
          From lightning-fast setup to enterprise-grade security, our platform gives you all the
          tools to create intelligent chatbots that delight your users.
        </p>
        <div className="flex items-center justify-center gap-4">
          <CtaButton text="Start Building" />
          <Link target="_blank" href={"https://npmjs.com/docvia"}>
            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureHero;
