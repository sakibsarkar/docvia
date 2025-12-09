import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
const Hero = () => {
  return (
    <section className="grid-bg relative overflow-hidden py-20 md:py-32">
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute right-10 bottom-20 h-72 w-72 animate-pulse rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center md:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-sm">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">AI CHATBOT PLATFORM</span>
        </div>

        {/* Main Heading */}
        <h1 className="mb-6 text-5xl leading-tight font-bold text-balance text-foreground md:text-7xl">
          The easiest way to build
          <br />
          effective AI chatbot.
        </h1>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-2xl text-lg text-balance text-muted-foreground">
          Build AI chatbots for websites in minutes to automate customer support, lead generation,
          sales, and more.
        </p>

        {/* CTA Buttons */}
        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="group bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Start for free
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-sm text-muted-foreground">No credit card required</p>
        </div>
      </div>
      <Image
        className="absolute bottom-0 left-0 z-[1] w-[100%] object-cover opacity-[0.8] blur-[10px]"
        src={"/images/glow_cmp.png"}
        alt=""
        width={1905}
        height={1103}
      />
    </section>
  );
};

export default Hero;
