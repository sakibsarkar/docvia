import { Code, Cpu, Database, Globe, Settings, Shield } from "lucide-react";

const integrationFeatures = [
  {
    icon: Code,
    title: "Easy Integration",
    description: "Single line of code to embed. No complex setup or configuration required.",
  },
  {
    icon: Globe,
    title: "Cross-platform",
    description: "Works on web, mobile web, and can be integrated into native apps.",
  },
  {
    icon: Settings,
    title: "API Access",
    description: "Full REST API for custom integrations and advanced functionality.",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description: "HTTPS only, encrypted data transfer, and secure authentication.",
  },
  {
    icon: Cpu,
    title: "High Performance",
    description: "CDN-delivered, cached assets, and optimized for fast loading times.",
  },
  {
    icon: Database,
    title: "Scalable Infrastructure",
    description: "Auto-scaling to handle traffic spikes without any downtime.",
  },
];
const Integration = () => {
  return (
    <section className="border-b border-border/40 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Deploy Anywhere, Integrate Everything
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Works seamlessly with your existing tools and can be deployed on any platform.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {integrationFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border/40 bg-background/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/50"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integration;
