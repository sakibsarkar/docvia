import { BarChart3, Clock, FileText, Users } from "lucide-react";

const analyticsFeatures = [
  {
    icon: BarChart3,
    title: "Conversation Metrics",
    description:
      "Track total conversations, response times, resolution rates, and user satisfaction scores.",
  },
  {
    icon: Users,
    title: "User Insights",
    description:
      "Understand your audience with detailed user demographics, behavior patterns, and engagement data.",
  },
  {
    icon: Clock,
    title: "Performance Monitoring",
    description:
      "Monitor uptime, response speed, and system health with real-time performance dashboards.",
  },
  {
    icon: FileText,
    title: "Conversation Logs",
    description:
      "Access complete conversation histories, export transcripts, and analyze chat patterns.",
  },
];

const Analytics = () => {
  return (
    <section className="border-b border-border/40 bg-gradient-to-b from-secondary/5 to-transparent py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <div className="flex aspect-square items-center justify-center rounded-2xl border border-border/40 bg-gradient-to-br from-secondary/10 to-transparent p-8 backdrop-blur-sm">
              <div className="text-center">
                <BarChart3 className="mx-auto mb-4 h-20 w-20 text-secondary" />
                <p className="text-muted-foreground">Real-time analytics dashboard</p>
              </div>
            </div>
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tl from-secondary/20 to-transparent blur-3xl" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Powerful Analytics & Insights</h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Track every conversation, measure performance, and make data-driven decisions to
              improve your chatbot over time.
            </p>
            <div className="space-y-4">
              {analyticsFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10">
                    <feature.icon className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
