import { Bot, BrainCircuit, CheckCircle2, Database, Languages } from "lucide-react";
const aiCapabilities = [
  {
    icon: BrainCircuit,
    title: "Intelligent Understanding",
    description: "Powered by state-of-the-art language models that understand context and intent.",
    points: [
      "Context-aware conversations",
      "Intent recognition",
      "Entity extraction",
      "Sentiment analysis",
    ],
  },
  {
    icon: Database,
    title: "Knowledge Base Integration",
    description: "Connect your documentation, FAQs, and content sources for accurate responses.",
    points: [
      "Google Docs integration",
      "Custom data sources",
      "Real-time content updates",
      "Semantic search",
    ],
  },
  {
    icon: Languages,
    title: "Multilingual Support",
    description: "Communicate with users in their preferred language automatically.",
    points: [
      "50+ languages supported",
      "Auto-detection",
      "Real-time translation",
      "Cultural context awareness",
    ],
  },
  {
    icon: Bot,
    title: "Smart Automation",
    description: "Automate repetitive tasks and workflows to save time and improve efficiency.",
    points: ["Automated responses", "Task scheduling", "Workflow triggers", "API integrations"],
  },
];
const AiCapabilities = () => {
  return (
    <section className="border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Advanced AI Capabilities</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Leverage cutting-edge AI technology to provide exceptional user experiences.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {aiCapabilities.map((capability, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/10">
                  <capability.icon className="h-5 w-5 text-secondary" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">{capability.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{capability.description}</p>
                <ul className="mt-3 space-y-1">
                  {capability.points.map((point, pidx) => (
                    <li key={pidx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiCapabilities;
