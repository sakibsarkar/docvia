import { CheckCircle2, Palette } from "lucide-react";

const customizationFeatures = [
  {
    title: "Custom Branding",
    description:
      "Upload your logo, set brand colors, and customize fonts to match your website perfectly.",
  },
  {
    title: "Widget Positioning",
    description: "Place the chat widget anywhere on your page with flexible positioning options.",
  },
  {
    title: "Conversation Styling",
    description: "Customize message bubbles, buttons, and UI elements to match your design system.",
  },
  {
    title: "Welcome Messages",
    description: "Create custom greetings and prompts to guide users through conversations.",
  },
  {
    title: "Custom Actions",
    description: "Define custom buttons, quick replies, and interactive elements for better UX.",
  },
];

const Customization = () => {
  return (
    <section className="border-b border-border/40 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Complete Customization Control</h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Make the chatbot truly yours with full control over appearance, behavior, and
              branding. Match your brand perfectly with our comprehensive customization options.
            </p>
            <div className="space-y-4">
              {customizationFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="flex aspect-square items-center justify-center rounded-2xl border border-border/40 bg-gradient-to-br from-accent/10 to-transparent p-8 backdrop-blur-sm">
              <div className="text-center">
                <Palette className="mx-auto mb-4 h-20 w-20 text-accent" />
                <p className="text-muted-foreground">Visual customization preview</p>
              </div>
            </div>
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-accent/20 to-transparent blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customization;
