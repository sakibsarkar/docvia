"use client";

import type React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { MessageCircle, TrendingDown, TrendingUp, Users } from "lucide-react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

/* ---------- helpers ---------- */

function formatShort(date: Date) {
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function seededRand(seed: number) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// Make N daily points ending today
function makeSeries(days = 30) {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - (days - 1));

  return Array.from({ length: days }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const seed = Number(`${d.getFullYear()}${d.getMonth()}${d.getDate()}`);
    const r1 = seededRand(seed);
    const r2 = seededRand(seed + 7);
    const r3 = seededRand(seed + 13);

    const visitors = Math.round(5 + r1 * 20);
    const pageViews = Math.round(visitors * (1.3 + r2 * 0.8));
    const chatsAnswered = Math.round(visitors * (0.04 + r3 * 0.08) * 0.9);
    const chatsMissed = Math.max(0, Math.round(chatsAnswered * (0.05 + r2 * 0.08) - 0.3));

    return {
      date: d,
      label: formatShort(d),
      visitors,
      pageViews,
      chatsAnswered,
      chatsMissed,
    };
  });
}

function sum(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0);
}

function pctChange(current: number, prev: number) {
  if (prev === 0) return current === 0 ? 0 : 100;
  return ((current - prev) / prev) * 100;
}

function StatCard({
  title,
  value,
  change,
  footer,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  change?: number;
  footer?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  const positive = (change ?? 0) >= 0;
  return (
    <div className="bg-glow-blue rounded-lg border border-border bg-card/50 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-card/70">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm font-medium text-muted-foreground">{title}</div>
          <div className="mt-3 flex items-end justify-between">
            <div className="text-3xl font-bold tracking-tight text-foreground">{value}</div>
            {typeof change === "number" && (
              <span
                className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold ${
                  positive ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(change).toFixed(1)}%
              </span>
            )}
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

/* ---------- Cards Grid ---------- */

function Cards({ data }: { data: ReturnType<typeof makeSeries> }) {
  const today = data[data.length - 1];

  const last7 = data.slice(-7);
  const prev7 = data.slice(-14, -7);

  const visitorsChange = pctChange(
    sum(last7.map((d) => d.visitors)),
    sum(prev7.map((d) => d.visitors))
  );
  const pvChange = pctChange(
    sum(last7.map((d) => d.pageViews)),
    sum(prev7.map((d) => d.pageViews))
  );

  const answered7 = sum(last7.map((d) => d.chatsAnswered));
  const missed7 = sum(last7.map((d) => d.chatsMissed));
  const answeredPrev7 = sum(prev7.map((d) => d.chatsAnswered));
  const missedPrev7 = sum(prev7.map((d) => d.chatsMissed));

  const chatsAnsweredChange = pctChange(answered7, answeredPrev7);
  const chatsMissedChange = pctChange(missed7, missedPrev7);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <StatCard
        title="Visitors (today)"
        value={today.visitors}
        change={visitorsChange}
        footer="vs previous 7 days"
        icon={Users}
      />
      <StatCard
        title="Page Views (today)"
        value={today.pageViews}
        change={pvChange}
        footer="vs previous 7 days"
        icon={TrendingUp}
      />
      <StatCard
        title="Chats Answered (7d)"
        value={sum(data.slice(-7).map((d) => d.chatsAnswered))}
        change={chatsAnsweredChange}
        footer="vs previous 7 days"
        icon={MessageCircle}
      />
      <StatCard
        title="Chats Missed (7d)"
        value={sum(data.slice(-7).map((d) => d.chatsMissed))}
        change={chatsMissedChange}
        footer="vs previous 7 days"
        icon={TrendingDown}
      />
    </div>
  );
}

/* ---------- KPI compute for the bottom row ---------- */

function computeKpis(data: ReturnType<typeof makeSeries>) {
  const last7 = data.slice(-7);
  const answered7 = sum(last7.map((d) => d.chatsAnswered));
  const missed7 = sum(last7.map((d) => d.chatsMissed));
  const totalVisitors7 = Math.max(1, sum(last7.map((d) => d.visitors)));

  const positiveSentiment = 92 + (answered7 % 5) - (missed7 % 3);
  const engagement = 50 + Math.min(40, Math.round((answered7 / totalVisitors7) * 300));
  const availability = 88 + (95 - Math.min(95, missed7));

  return {
    positiveSentiment: Math.min(100, Math.max(0, Math.round(positiveSentiment))),
    engagement: Math.min(100, Math.max(0, Math.round(engagement))),
    availability: Math.min(100, Math.max(0, Math.round(availability))),
  };
}

/* ---------- KPI Card ---------- */

function KpiCard({ label, value }: { label: string; value: number }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="bg-glow-purple flex flex-col items-center justify-center rounded-lg border border-border bg-card/50 p-6 shadow-lg backdrop-blur-sm">
      <div className="relative h-32 w-32">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-border"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-primary transition-all duration-500"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-foreground">{value}%</div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

/* ---------- Charts ---------- */

function VisitorsLineChart({ data }: { data: ReturnType<typeof makeSeries> }) {
  const chartData = data.slice(-14).map((d) => ({
    label: d.label,
    visitors: d.visitors,
    pageViews: d.pageViews,
  }));

  return (
    <Card className="bg-glow-blue rounded-lg border border-border/50 bg-card/30 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-primary/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Visitors & Page Views
        </CardTitle>
        <CardDescription className="text-muted-foreground">Last 14 days trend</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            visitors: {
              label: "Visitors",
              color: "#3b82f6",
            },
            pageViews: {
              label: "Page Views",
              color: "#6366f1",
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
              <Line
                type="monotone"
                dataKey="pageViews"
                stroke="#6366f1"
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
}

function ChatsBarChart({ data }: { data: ReturnType<typeof makeSeries> }) {
  const chartData = data.slice(-14).map((d) => ({
    label: d.label,
    answered: d.chatsAnswered,
    missed: d.chatsMissed,
  }));

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
}

/* ---------- Page ---------- */

export default function DashboardPage() {
  const fullSeries = useMemo(() => makeSeries(30), []);

  const { positiveSentiment, engagement, availability } = useMemo(
    () => computeKpis(fullSeries),
    [fullSeries]
  );

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your chatbot performance and analytics
        </p>
      </div>

      {/* Stats Grid */}
      <Cards data={fullSeries} />

      {/* Charts Section */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Analytics & Insights</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <VisitorsLineChart data={fullSeries} />
          <ChatsBarChart data={fullSeries} />
        </div>
      </div>

      {/* KPI Row */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Performance Metrics</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <KpiCard label="Positive Sentiment" value={positiveSentiment} />
          <KpiCard label="Engagement Rate" value={engagement} />
          <KpiCard label="Availability" value={availability} />
        </div>
      </div>
    </section>
  );
}
