"use client";

import { Chart } from "@/components";
import { useMemo, useState } from "react";
import { DateObject } from "react-multi-date-picker";

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
}: {
  title: string;
  value: string | number;
  change?: number;
  footer?: string;
}) {
  const positive = (change ?? 0) >= 0;
  return (
    <div className="rounded-md border border-gray-300 bg-white p-4 shadow-sm">
      <div className="text-sm text-zinc-500">{title}</div>
      <div className="mt-1 flex items-end justify-between">
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        {typeof change === "number" && (
          <span
            className={`text-xs font-medium ${positive ? "text-emerald-600" : "text-rose-600"}`}
          >
            {positive ? "▲" : "▼"} {Math.abs(change).toFixed(1)}%
          </span>
        )}
      </div>
      {footer && <div className="mt-2 text-xs text-zinc-400">{footer}</div>}
    </div>
  );
}

/* ---------- right-column cards (4) ---------- */

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
    <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
      <StatCard
        title="Visitors (today)"
        value={today.visitors}
        change={visitorsChange}
        footer="vs previous 7 days"
      />
      <StatCard
        title="Page Views (today)"
        value={today.pageViews}
        change={pvChange}
        footer="vs previous 7 days"
      />
      <StatCard
        title="Chats Answered (7d)"
        value={sum(data.slice(-7).map((d) => d.chatsAnswered))}
        change={chatsAnsweredChange}
        footer="vs previous 7 days"
      />
      <StatCard
        title="Chats Missed (7d)"
        value={sum(data.slice(-7).map((d) => d.chatsMissed))}
        change={chatsMissedChange}
        footer="vs previous 7 days"
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

  const positiveSentiment = 92 + (answered7 % 5) - (missed7 % 3); // same “pleasing demo” math
  const engagement = 50 + Math.min(40, Math.round((answered7 / totalVisitors7) * 300));
  const availability = 88 + (95 - Math.min(95, missed7));

  return {
    positiveSentiment: Math.min(100, Math.max(0, Math.round(positiveSentiment))),
    engagement: Math.min(100, Math.max(0, Math.round(engagement))),
    availability: Math.min(100, Math.max(0, Math.round(availability))),
  };
}

/* ---------- Page ---------- */

export default function UserPage() {
  const today = useMemo(() => new DateObject(), []);
  const last7Days = [new DateObject(today).subtract(6, "days"), new DateObject(today)];

  const [selectedRange, setSelectedRange] = useState<DateObject[] | null>(last7Days);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string | null>("last7days");

  // ensure we have enough points for the chosen preset
  const seriesLength = useMemo(() => {
    switch (selectedTimeFilter) {
      case "last14days":
        return 14;
      case "last30days":
        return 30;
      case "last90days":
        return 90;
      default:
        return 30;
    }
  }, [selectedTimeFilter]);

  const fullSeries = useMemo(() => makeSeries(seriesLength), [seriesLength]);

  const filtered = useMemo(() => {
    if (selectedTimeFilter === "liveNow") return fullSeries.slice(-1); // point-in-time
    if (selectedRange && selectedRange.length >= 2) {
      const [start, end] = selectedRange;
      const startJS = start.toDate();
      const endJS = end.toDate();
      return fullSeries.filter((d) => d.date >= startJS && d.date <= endJS);
    }
    return fullSeries;
  }, [fullSeries, selectedRange, selectedTimeFilter]);

  const { positiveSentiment, engagement, availability } = useMemo(
    () => computeKpis(filtered),
    [filtered]
  );

  const handleFilterChange = (dates: DateObject[] | null, tf?: string | null) => {
    setSelectedRange(dates);
    setSelectedTimeFilter(tf ?? null);
  };

  return (
    <section className="space-y-6">
      <h1 className="flex items-center font-poppins text-[22px] font-medium">Dashboard</h1>

      {/* Top row: left chart, right 4 cards */}
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="flex-1">
          <Chart
            data={filtered}
            value={selectedRange}
            selectedTimeFilter={selectedTimeFilter}
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex flex-col xl:w-[520px]">
          <Cards data={filtered} />
        </div>
      </div>

      {/* Bottom full-width KPI row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="Positive Sentiment" value={`${positiveSentiment}%`} />
        <StatCard title="Engagement" value={`${engagement}%`} />
        <StatCard title="Availability" value={`${availability}%`} />
      </div>
    </section>
  );
}
