// app/my-apps/page.tsx (or wherever MyApps lives)
"use client";

import { AppsList, CreateNewAppPopup } from "@/components";
import { useGetAppCountQuery } from "@/redux/features/apps/apps.api";
import { AppStatus } from "@/types";
import {
  ArchiveBoxIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { ComponentType, SVGProps, useState } from "react";

type TabId = AppStatus; // "development" | "production" | "archive"

const tabs: { id: TabId; label: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { id: "development", label: "Development", icon: WrenchScrewdriverIcon },
  { id: "production", label: "Production", icon: RocketLaunchIcon },
  { id: "archive", label: "Archive", icon: ArchiveBoxIcon },
];

export default function MyApps() {
  const [activeTab, setActiveTab] = useState<TabId>("development");
  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState("");

  const { data } = useGetAppCountQuery(undefined);

  return (
    <section className="h-full w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <h1 className="flex items-center gap-2 font-poppins text-[22px] font-medium text-gray-900">
          Apps
          <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-base font-medium text-gray-700">
            {data?.data.count || 0} apps
          </span>
        </h1>

        <div className="flex items-center justify-between gap-2">
          {/* Search */}
          <div className="relative" aria-label="Search App">
            <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Apps"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 w-[200px] rounded-md border border-gray-200 bg-white pr-3 pl-9 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 md:w-[240px]"
            />
          </div>

          {/* New apps */}
          <button
            onClick={() => setOpenModal(true)}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-200 bg-blue-600 px-3 text-sm font-normal text-white hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 shrink-0 text-white" />
            New App
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="relative mb-6">
        <ul className="flex gap-3 border-b border-gray-200" role="tablist">
          {tabs.map((tab) => (
            <li key={tab.id} role="none">
              <button
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="mr-2 inline-block h-4 w-4 align-text-bottom" />
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="h-full">
        {/* Development tab shows ALL apps for now */}
        {activeTab === "development" && (
          <AppsList status={activeTab} EmptyIcon={WrenchScrewdriverIcon} />
        )}

        {activeTab === "production" && <AppsList status={activeTab} EmptyIcon={RocketLaunchIcon} />}

        {activeTab === "archive" && <AppsList status={activeTab} EmptyIcon={ArchiveBoxIcon} />}
      </div>

      {/* Create New App Popup */}
      <CreateNewAppPopup openPopup={openModal} setOpenPopup={setOpenModal} />
    </section>
  );
}
