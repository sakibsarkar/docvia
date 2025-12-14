import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useGetAppVisitorStatisticsQuery } from "@/redux/features/apps/appStatistics.api";
import dateUtils from "@/utils/date";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
const VisitorLineChart = ({ appId }: { appId?: string }) => {
  const { data } = useGetAppVisitorStatisticsQuery(appId || "", {
    skip: !appId,
  });

  const chartData =
    data?.data?.map((d) => ({
      label: dateUtils.formatToMMMdddYYYY(d.date),
      visitors: d.count,
    })) || [];
  return (
    <Card className="bg-glow-blue rounded-lg border border-border/50 bg-card/30 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-primary/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Visitors</CardTitle>
        <CardDescription className="text-muted-foreground">Last 30 days trend</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            visitors: {
              label: "Visitors",
              color: "#3b82f6",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
              <XAxis dataKey="label" stroke="#666" style={{ fontSize: "12px" }} />
              <YAxis stroke="#666" style={{ fontSize: "12px" }} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                contentStyle={{
                  backgroundColor: "rgba(15, 15, 15, 0.95)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "8px",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#3b82f6"
                dot={false}
                strokeWidth={2.5}
                isAnimationActive
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default VisitorLineChart;
