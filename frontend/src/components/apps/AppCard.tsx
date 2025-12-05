"use client";

import { IApp } from "@/types";
import { Archive, BookCopy, EllipsisVertical } from "lucide-react";

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
    <div className="group relative rounded-md border border-gray-200 bg-white px-4 py-6 shadow-sm transition hover:border-gray-300 hover:shadow-md">
      {/* More button */}
      <div className="absolute top-4 right-2">
        <button
          ref={buttonRef}
          onClick={() => setOpenDropdown((v) => !v)}
          type="button"
          aria-label="Open context menu"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-white hover:text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <EllipsisVertical className="h-5 w-5" />
        </button>
      </div>

      {/* Dropdown */}
      {openDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-12 right-2 w-48 rounded-lg border border-gray-200 bg-white p-1 shadow-lg ring-1 ring-black/5"
        >
          <div className="py-1">
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-50"
            >
              <BookCopy className="h-4 w-4 text-gray-500" />
              <span>Duplicate App</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-50"
            >
              <Archive className="h-4 w-4 text-gray-500" />
              <span>Move to Archive</span>
            </button>
          </div>
        </div>
      )}

      {/* Card body */}
      <Link href={`/dashboard/apps/${app.id}`} className="block outline-none">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 ring-1 ring-gray-200 ring-inset">
            <span className="text-sm font-semibold">{app.appName?.[0]?.toUpperCase()}</span>
          </div>

          <div className="min-w-0 flex-1">
            {/* Title row */}
            <div className="flex items-center gap-2">
              <h3 className="truncate font-medium text-gray-900">{app.appName}</h3>
            </div>

            {/* Domain (optional) */}
            {app.authorizedOrigin && (
              <p className="mt-0.5 truncate text-sm text-gray-600">{app.authorizedOrigin}</p>
            )}

            {/* Updated */}
            {app.updatedAt && (
              <div className="mt-2 text-xs text-gray-500">Edited {app.updatedAt}</div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
