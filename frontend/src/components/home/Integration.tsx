import { BookOpen, Code2, Globe, Layout, PieChart, Zap } from "lucide-react";

const integrations = [
  { icon: Globe, label: "Global" },
  { icon: Code2, label: "Widgets" },
  { icon: Layout, label: "Vercel" },
  { icon: Zap, label: "Next.js" },
  { icon: BookOpen, label: "Docs" },
  { icon: PieChart, label: "Analytics" },
];
const Integration = () => {
  return (
    <section className="border-border/40 border-t py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <p className="text-muted-foreground mb-12 text-center text-sm font-semibold uppercase tracking-wider">
          Plug & play on any site
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {integrations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="border-border/40 bg-card/50 hover:bg-card/80 hover:border-primary/50 hover:glow-cyan group flex cursor-pointer flex-col items-center justify-center rounded-lg border p-4 text-center transition-all duration-300 md:p-6"
              >
                <Icon className="text-primary group-hover:text-secondary mb-2 h-6 w-6 transition-colors md:h-8 md:w-8" />
                <p className="text-muted-foreground group-hover:text-foreground text-xs font-medium transition-colors md:text-sm">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Integration;
