import type { LucideIcon } from "lucide-react";

interface IStep {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}
const StepCard = ({ step }: { step: IStep }) => {
  const { number, icon: Icon, title, description } = step;
  return (
    <div className="relative">
      {/* Number Badge */}
      <div className="bg-primary text-primary-foreground glow-cyan absolute -left-4 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
        {number}
      </div>

      {/* Card */}
      <div className="border-border/40 bg-card/50 hover:bg-card/80 hover:border-primary/50 hover:glow-cyan rounded-lg border p-6 transition-all duration-300">
        <Icon className="text-primary mb-4 h-8 w-8" />
        <h3 className="text-foreground mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
