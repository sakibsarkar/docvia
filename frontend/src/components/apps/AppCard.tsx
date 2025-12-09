"use client";

import { IApp } from "@/types";
import dateUtils from "@/utils/date";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ProjectCard({ app }: { app: IApp }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    if (openDropdown) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  return (
    <div className="rounded-[5px] border bg-backup p-[0.5px] pl-[1px] backdrop-blur-[35px] duration-[0.3s] hover:scale-[1.02] hover:bg-muted-foreground">
      <Link
        href={`/dashboard/apps/${app.id}`}
        className="primaryRadialGradient relative flex items-start gap-4 rounded-[4px] border border-border px-4 py-6 shadow-sm transition"
      >
        {/* Card body */}

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
          <span className="text-sm font-semibold text-foreground">
            {app.appName?.[0]?.toUpperCase()}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          {/* Title row */}
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium text-foreground">{app.appName}</h3>
          </div>

          {/* Domain (optional) */}
          {app.authorizedOrigin && (
            <p className="mt-0.5 truncate text-sm text-gray-600">{app.authorizedOrigin}</p>
          )}

          {/* Updated */}
          {app.updatedAt && (
            <div className="mt-2 text-xs text-gray-500">
              Edited {dateUtils.formatToMMMdddYYYY(app.updatedAt)}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
