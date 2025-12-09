"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: number;
  durationMonths: number;
  appLimit: number;
  customization: boolean;
  trialPeriodDays: number;
  isActive: boolean;
  order: number;
  createdAt: string;
}

const plans: Plan[] = [
  {
    id: "dd583a7d-2a28-4610-9ce3-b0875362dbe8",
    name: "Basic (Free)",
    price: 0,
    durationMonths: 1,
    appLimit: 1,
    customization: false,
    trialPeriodDays: 30,
    isActive: true,
    order: 0,
    createdAt: "2025-12-04T12:07:00.610Z",
  },
  {
    id: "dd583a7d-2a28-4610-9cr3-b0974362dbe8",
    name: "Standard",
    price: 100,
    durationMonths: 1,
    appLimit: 5,
    customization: true,
    trialPeriodDays: 0,
    isActive: true,
    order: 1,
    createdAt: "2025-12-04T12:07:00.610Z",
  },
  {
    id: "dd583a7d-2a28-4610-9cr3-b0875362dbe8",
    name: "Premium",
    price: 200,
    durationMonths: 1,
    appLimit: 5,
    customization: true,
    trialPeriodDays: 0,
    isActive: true,
    order: 2,
    createdAt: "2025-12-04T12:07:00.610Z",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      {/* Header */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
            <span className="text-xs font-semibold tracking-wide text-primary">NEW</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold text-balance text-foreground md:text-6xl">
            Powerful Pricing for Every Scale
          </h1>
          <p className="mb-8 text-lg text-balance text-muted-foreground">
            Start free today. Scale with confidence. Upgrade whenever you're ready for advanced
            features.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {plans.map((plan, index) => {
            const isPopular = index === 2; // Premium is popular
            return (
              <div key={plan.id} className="flex h-full flex-col">
                <Card
                  className={`flex flex-1 flex-col p-8 transition-all duration-300 hover:shadow-lg ${
                    isPopular
                      ? "border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10 md:z-10 md:scale-105"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  {/* Header */}
                  <div className="mb-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-foreground">{plan.name}</h2>
                      {isPopular && (
                        <span className="inline-block rounded-full border border-primary/50 bg-primary/20 px-3 py-1">
                          <span className="text-xs font-semibold text-primary">Recommended</span>
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      {plan.trialPeriodDays > 0 && (
                        <p className="text-sm text-primary">
                          {plan.trialPeriodDays}-day free trial
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-8 text-muted-foreground">
                    {index === 0
                      ? "Perfect for getting started and exploring our platform."
                      : index === 1
                        ? "For growing teams that need more apps and customization."
                        : "For power users and enterprises that need everything."}
                  </p>

                  {/* Features */}
                  <ul className="mb-8 flex-1 space-y-4">
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-foreground">
                        {plan.appLimit} app{plan.appLimit !== 1 ? "s" : ""}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-foreground">
                        {plan.customization ? "Full customization" : "Basic features"}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-foreground">Community support</span>
                    </li>
                    {plan.customization && (
                      <>
                        <li className="flex items-start gap-3">
                          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="text-foreground">Priority support</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="text-foreground">Advanced analytics</span>
                        </li>
                      </>
                    )}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={`w-full py-6 text-base font-semibold transition-all duration-300 ${
                      isPopular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                    variant={isPopular ? "default" : "outline"}
                  >
                    {plan.price === 0 ? "Start Free" : "Choose Plan"}
                  </Button>
                </Card>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mx-auto mt-20 max-w-2xl">
          <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {[
              {
                q: "Can I upgrade my plan anytime?",
                a: "Yes, upgrade or downgrade your plan at any time with changes taking effect immediately.",
              },
              {
                q: "Is there a long-term commitment?",
                a: "No, all plans are month-to-month with no contracts or hidden fees.",
              },
              {
                q: "Do you offer custom enterprise plans?",
                a: "Yes, contact our sales team for custom solutions tailored to your needs.",
              },
            ].map((faq, i) => (
              <Card key={i} className="border-border/50 p-6">
                <h4 className="mb-2 font-semibold text-foreground">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
