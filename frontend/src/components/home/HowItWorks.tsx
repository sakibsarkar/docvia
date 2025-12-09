import { Globe, MessageSquare, Package } from "lucide-react";
import Image from "next/image";
import StepCard from "./StepCard";

const steps = [
  {
    number: 1,
    icon: Globe,
    title: "Create an app",
    description: "Add your website URL, Google Docs ID, and upload your service account JSON.",
  },
  {
    number: 2,
    icon: Package,
    title: "Install the widget",
    description: "Embed our npm package and initialize the chat with your App ID.",
  },
  {
    number: 3,
    icon: MessageSquare,
    title: "Start chatting",
    description: "Say hello & query your docs on-demand and send generated prompts to the model.",
  },
];
const HowItWorks = () => {
  return (
    <section className="border-t border-border/40 py-20 md:py-32">
      <div className="relative container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="mb-16 text-center text-4xl font-bold text-balance md:text-5xl">
          How it works
        </h2>
        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connection Lines - hidden on mobile */}
          <div className="pointer-events-none absolute top-24 right-0 left-0 hidden h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent md:block" />

          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
        <Image
          src="/svgs/neon_bg_grid.svg"
          alt="hero"
          width={1000}
          height={1000}
          className="absolute top-0 left-0 max-w-[1000px] object-contain"
        />{" "}
      </div>
    </section>
  );
};

export default HowItWorks;
