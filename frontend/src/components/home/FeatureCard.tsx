import type { LucideIcon } from "lucide-react";

export interface IFeatures {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "cyan" | "purple" | "pink";
}

const colorMap = {
  cyan: "bg-primary/10 text-primary border-primary/30 hover:border-primary/50 hover:glow-cyan",
  purple:
    "bg-secondary/10 text-secondary border-secondary/30 hover:border-secondary/50 hover:glow-purple",
  pink: "bg-accent/10 text-accent border-accent/30 hover:border-accent/50 hover:glow-pink",
};
const FeatureCard = ({ feature }: { feature: IFeatures }) => {
  const { icon: Icon, title, description, color } = feature;
  return (
    <div className={`rounded-lg border p-6 transition-all duration-300 ${colorMap[color]}`}>
      <Icon className="mb-4 h-8 w-8" />
      <h3 className="text-foreground mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
