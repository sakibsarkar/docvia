import { BarChart3, Boxes, Globe, Lock, MessageSquare, Settings } from "lucide-react";
import FeatureCard, { IFeatures } from "./FeatureCard";

const features: IFeatures[] = [
  {
    icon: Settings,
    title: "5-minute setup",
    description: "Drop in our widget, paste your App ID, and start chatting with your users.",
    color: "cyan",
  },
  {
    icon: Lock,
    title: "Secure by default",
    description: "Use a service account and don't send sensitive data. Keep your data safe.",
    color: "purple",
  },
  {
    icon: Boxes,
    title: "Configurable apps",
    description: "Create multiple apps per workspace—each with its own settings and fine-tuning.",
    color: "pink",
  },
  {
    icon: MessageSquare,
    title: "Quality answers",
    description:
      "We pair your Google Docs for real-time and ground model responses in your content.",
    color: "cyan",
  },
  {
    icon: Globe,
    title: "Works anywhere",
    description:
      "Use it on any framework or static site. First-class Next.js integration included.",
    color: "purple",
  },
  {
    icon: BarChart3,
    title: "Built-in analytics",
    description: "Track conversations, satisfaction, and lead capture to prove ROI.",
    color: "pink",
  },
];
const Features = () => {
  return (
    <section className="border-border/40 border-t py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="mb-12 text-balance text-center text-4xl font-bold md:text-5xl">
          Everything you need to launch
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
