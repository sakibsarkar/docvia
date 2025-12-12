import { BarChart3, Globe, Lock, MessageSquare, Users, Zap } from "lucide-react";
const coreFeatures = [
  {
    icon: Zap,
    title: "Lightning Fast Setup",
    description:
      "Get your chatbot up and running in under 5 minutes. Just drop in our widget, paste your App ID, and you're live.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description:
      "Bank-level encryption, SOC 2 compliance, and GDPR ready. Your data is protected with industry-leading security standards.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description:
      "Deploy on any framework or platform. Supports React, Vue, Angular, WordPress, and plain HTML with first-class Next.js integration.",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description:
      "Advanced NLP ensures your chatbot understands context, handles complex queries, and provides human-like responses.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track conversations, measure satisfaction, and monitor performance with comprehensive analytics dashboards.",
  },
  {
    icon: Users,
    title: "Multi-user Workspaces",
    description:
      "Collaborate with your team, manage permissions, and create multiple apps per workspace with role-based access control.",
  },
];
const CoreFeatures = () => {
  return (
    <section className="border-b border-border/40 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Core Features</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Build, deploy, and scale AI chatbots with powerful features designed for modern
            applications.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coreFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="group rounded-xl border border-border/40 bg-background/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
