import { useGetAppStatisticsOverviewQuery } from "@/redux/features/apps/appStatistics.api";
import { MessageCircle, TrendingDown, Users } from "lucide-react";

function StatCard({
  title,
  value,
  footer,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  footer?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className="bg-glow-blue rounded-lg border border-border bg-card/50 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-card/70">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
          </div>
          {footer && <div className="mt-2 text-xs text-muted-foreground">{footer}</div>}
        </div>
        {Icon && (
          <div className="ml-4 rounded-lg bg-primary/10 p-3 text-primary">
            <Icon width={24} height={24} />
          </div>
        )}
      </div>
    </div>
  );
}
const AppOverview = ({ appId }: { appId?: string }) => {
  const { data } = useGetAppStatisticsOverviewQuery(appId || "", {
    skip: !appId,
  });

  const result = data?.data;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <StatCard title="Visitors (30d)" value={result?.visitCount || 0} icon={Users} />

      <StatCard
        title="Chats Answered (30d)"
        value={result?.answeredChats || 0}
        icon={MessageCircle}
      />
      <StatCard title="Chats Missed (30d)" value={result?.missedChats || 0} icon={TrendingDown} />
    </div>
  );
};

export default AppOverview;
