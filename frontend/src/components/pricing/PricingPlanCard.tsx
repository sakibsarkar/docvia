import { Button } from "@/components/ui/button";
import { IPlan } from "@/types/plan";
import { Check } from "lucide-react";

const PricingPlanCard = ({ plan }: { plan: IPlan }) => {
  const { name, price, appLimit, customization, trialPeriodDays } = plan;
  const isPopular = name.toLowerCase().includes("premium");
  const features = [
    appLimit === -1 ? "Unlimited apps" : `Up to ${appLimit} app${appLimit > 1 ? "s" : ""}`,
    customization ? "Customization enabled" : "Limited customization",
    trialPeriodDays > 0 ? `${trialPeriodDays} day free trial` : "No trial period",
    "Analytics & insights",
    "Priority support",
  ];
  return (
    <div className="p-[0.5px 0.5px 0.5px 1px] z-3 rounded-[17px] border-1 border-[transparent] bg-[#72768a36] backdrop-blur-[35px]">
      <div
        className={`primaryRadialGradient relative rounded-[18px] border transition-all duration-300 ${
          isPopular
            ? "border-primary/50 shadow-lg shadow-primary/20 md:z-10 md:scale-105"
            : "border-border/40 hover:border-primary/30"
        }`}
      >
        {isPopular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Most Popular
            </span>
          </div>
        )}

        <div className="p-8">
          {/* Header */}
          <h3 className="mb-2 text-2xl font-bold">{name}</h3>
          <div className="mb-6">
            <span className="text-4xl font-bold">${price}</span>
            <span className="ml-2 text-muted-foreground">/month</span>
          </div>

          {/* CTA Button */}
          <Button size="lg" className="mb-8 w-full" variant={isPopular ? "default" : "outline"}>
            {price === 0 ? "Start Free" : "Get Started"}
          </Button>

          {/* Features */}
          <div className="space-y-4">
            <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              What&apos;s included
            </p>
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlanCard;
