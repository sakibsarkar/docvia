"use client";

import AppOverview from "@/components/dashboard/AppOverview";
import AppSelector from "@/components/dashboard/AppSelector";
import ChatStatisticsBarchart from "@/components/dashboard/ChatStatisticsBarchart";
import VisitorLineChart from "@/components/dashboard/VisitorLineChart";
import { useMemo, useState } from "react";

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

export default function DashboardPage() {
  const fullSeries = useMemo(() => makeSeries(30), []);

  const { positiveSentiment, engagement, availability } = useMemo(
    () => computeKpis(fullSeries),
    [fullSeries]
  );

  const [appId, setAppId] = useState("");

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your chatbot performance and analytics
        </p>
      </div>
      <AppSelector onChange={setAppId} />

      {/* Stats Grid */}
      <AppOverview appId={appId} />

      {/* Charts Section */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Analytics & Insights</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <VisitorLineChart appId={appId} />
          <ChatStatisticsBarchart appId={appId} />
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
