"use client";

import { useRef, useState, useEffect } from "react";
import DatePicker, { DateObject, DatePickerRef } from "react-multi-date-picker";

const quickOptions = [
  { label: "Live Now", timeFilter: "liveNow" },
  { label: "Last 7 Days", timeFilter: "last7days" },
  { label: "This Week", timeFilter: "thisWeek" },
  { label: "Last Week", timeFilter: "lastWeek" },
  { label: "This Month", timeFilter: "thisMonth" },
  { label: "Last Month", timeFilter: "lastMonth" },
  { label: "Last 14 Days", timeFilter: "last14days" },
  { label: "Last 30 Days", timeFilter: "last30days" },
  { label: "Last 90 Days", timeFilter: "last90days" },
  // { label: "Last 12 Months", timeFilter: "last12months" }, // optional
  { label: "Custom", timeFilter: null },
];

interface AnalyticsOverviewFilterProps {
  value: DateObject[] | null;
  selectedTimeFilter?: string | null;
  onChange: (dates: DateObject[] | null, timeFilter?: string | null) => void;
}

const AnalyticsOverviewFilter = ({
  value,
  selectedTimeFilter,
  onChange,
}: AnalyticsOverviewFilterProps) => {
  const datePickerRef = useRef<DatePickerRef | null>(null);
  const [activeLabel, setActiveLabel] = useState<string>("Custom");

  useEffect(() => {
    if (selectedTimeFilter) {
      const matched = quickOptions.find((q) => q.timeFilter === selectedTimeFilter);
      setActiveLabel(matched ? matched.label : "Custom");
    } else {
      setActiveLabel("Custom");
    }
  }, [selectedTimeFilter]);

  const handleQuickSelect = (label: string, timeFilter: string | null) => {
    setActiveLabel(label);

    // Live Now: emit no range, just the timeFilter
    if (timeFilter === "liveNow") {
      onChange(null, "liveNow");
      return;
    }

    if (timeFilter) {
      const today = new DateObject();
      let range: DateObject[] | null = null;

      switch (timeFilter) {
        case "last7days":
          range = [new DateObject(today).subtract(6, "days"), new DateObject(today)];
          break;
        case "last14days":
          range = [new DateObject(today).subtract(13, "days"), new DateObject(today)];
          break;
        case "last30days":
          range = [new DateObject(today).subtract(29, "days"), new DateObject(today)];
          break;
        case "last90days":
          range = [new DateObject(today).subtract(89, "days"), new DateObject(today)];
          break;
        // case "last12months":
        //   range = [new DateObject(today).subtract(364, "days"), new DateObject(today)];
        //   break;
        case "thisMonth":
          range = [new DateObject(today).set("day", 1), new DateObject(today)];
          break;
        case "lastMonth": {
          const jsDate = new Date();
          const year = jsDate.getFullYear();
          const month = jsDate.getMonth();
          const lastDay = new Date(year, month, 0);
          const end = new DateObject(lastDay);
          const start = new DateObject(lastDay).set("day", 1);
          range = [start, end];
          break;
        }
        case "thisWeek": {
          const start = new DateObject(today).subtract(today.weekDay.index, "days");
          range = [start, new DateObject(today)];
          break;
        }
        case "lastWeek": {
          const dayOfWeek = today.weekDay.index;
          const end = new DateObject(today).subtract(dayOfWeek + 1, "days");
          const start = new DateObject(end).subtract(6, "days");
          range = [start, end];
          break;
        }
        default:
          range = null;
      }
      onChange(range, timeFilter);
    } else {
      datePickerRef.current?.openCalendar?.();
    }
  };

  const handleCustomChange = (dates: DateObject[] | null) => {
    onChange(dates, null);
  };

  return (
    <div className="flex items-center gap-4">
      <DatePicker
        ref={datePickerRef}
        value={value || undefined}
        onChange={handleCustomChange}
        range
        rangeHover
        dateSeparator=" - "
        className="date-range-calendar flex flex-row-reverse gap-4"
        inputClass="date-range-input"
        maxDate={new Date()}
        format="DD-MM-YYYY"
        calendarPosition="bottom-right"
        offsetY={0}
        offsetX={0}
      >
        <div className="flex flex-col gap-2 p-4">
          {quickOptions.map(({ label, timeFilter }) => (
            <button
              key={label}
              type="button"
              className={`cursor-pointer rounded-md border px-3 py-1 text-sm whitespace-nowrap transition ${
                activeLabel === label
                  ? "bg-blue-500 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleQuickSelect(label, timeFilter)}
            >
              {label}
            </button>
          ))}
        </div>
      </DatePicker>
    </div>
  );
};

export default AnalyticsOverviewFilter;
