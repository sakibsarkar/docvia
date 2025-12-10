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
      <div className="glow-cyan absolute -top-4 -left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {number}
      </div>

      {/* Card */}
      <div className="rounded-[8px] bg-backup p-[0.5px] pl-[1px] backdrop-blur-[35px]">
        <div className="hover:glow-cyan primaryRadialGradient rounded-lg border border-border/40 p-6 transition-all duration-300 hover:border-primary/50 hover:bg-card/80">
          <Icon className="mb-4 h-8 w-8 text-primary" />
          <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
