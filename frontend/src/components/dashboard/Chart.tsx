"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

import { AnalyticsOverview } from "@/components";
import { DateObject } from "react-multi-date-picker";

type Point = {
  label: string;
  visitors: number;
  pageViews: number;
};

export default function Chart({
  data,
  value,
  selectedTimeFilter,
  onChange,
}: {
  data: Point[];
  value: DateObject[] | null;
  selectedTimeFilter: string | null;
  onChange: (dates: DateObject[] | null, timeFilter?: string | null) => void;
}) {
  return (
    <div className="rounded-md border border-gray-300 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="Live Visitors">Live Visitors</h3>
        <div className="xl:w-[250px]">
          <div className="rounded-md border border-gray-300 bg-white p-2 shadow">
            <AnalyticsOverview
              value={value}
              selectedTimeFilter={selectedTimeFilter}
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 12, right: 12, top: 8, bottom: 8 }}>
            <defs>
              <linearGradient id="gVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} />
                <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="label" interval={data.length > 12 ? 2 : 0} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: 12 }} labelStyle={{ fontWeight: 600 }} />
            <Legend />
            <Area
              type="monotone"
              dataKey="visitors"
              name="Visitors"
              stroke="currentColor"
              fill="url(#gVisitors)"
            />
            <Line
              type="monotone"
              dataKey="pageViews"
              name="Page Views"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
