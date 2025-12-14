import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useGetAppChatStatisticsQuery } from "@/redux/features/apps/appStatistics.api";
import dateUtils from "@/utils/date";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";
const ChatStatisticsBarchart = ({ appId }: { appId?: string }) => {
  const { data } = useGetAppChatStatisticsQuery(appId || "", {
    skip: !appId,
  });
  const chartData =
    data?.data?.map((d) => ({
      label: dateUtils.formatToMMMdddYYYY(d.date),
      answered: d.answered,
      missed: d.missed,
    })) || [];

  return (
    <Card className="bg-glow-purple rounded-lg border border-border/50 bg-card/30 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-secondary/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Chat Performance</CardTitle>
        <CardDescription className="text-muted-foreground">
          Answered vs Missed chats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            answered: {
              label: "Answered",
              color: "#10b981",
            },
            missed: {
              label: "Missed",
              color: "#ef4444",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
              <XAxis dataKey="label" stroke="#666" style={{ fontSize: "12px" }} />
              <YAxis stroke="#666" style={{ fontSize: "12px" }} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                contentStyle={{
                  backgroundColor: "rgba(15, 15, 15, 0.95)",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  borderRadius: "8px",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Bar
                dataKey="answered"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
                isAnimationActive
                animationDuration={1000}
              />
              <Bar
                dataKey="missed"
                fill="#ef4444"
                radius={[8, 8, 0, 0]}
                isAnimationActive
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChatStatisticsBarchart;
