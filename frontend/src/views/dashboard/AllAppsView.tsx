"use client";
import { AppsList, CreateNewAppPopup } from "@/components";
import useDebounce from "@/hooks/useDebounce";
import { useGetAppsQuery } from "@/redux/features/apps/apps.api";
import { AppStatus } from "@/types";
import { AppWindow, Archive, Plus, Rocket, Search, Wrench } from "lucide-react";
import { ComponentType, SVGProps, useState } from "react";

type TabId = AppStatus | "all";

const tabs: { id: TabId; label: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { id: "all", label: "All Apps", icon: AppWindow },
  { id: "active", label: "Active Apps", icon: Rocket },
  { id: "inactive", label: "Inactive Apps", icon: Wrench },
];
const AllAppsView = () => {
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("all");

  const [search, setSearch] = useDebounce("");

  const { data, isFetching } = useGetAppsQuery({
    isActive: activeTab === "all" ? undefined : String(activeTab === "active"),
    searchTerm: search,
  });
  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <h1 className="flex items-center gap-2 font-poppins text-[22px] font-medium text-foreground">
          Apps
          <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-base font-medium text-gray-700">
            {data?.meta.totalDoc || 0} apps
          </span>
        </h1>

        <div className="flex items-center justify-between gap-2">
          {/* Search */}
          <div className="relative" aria-label="Search App">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Apps"
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-[200px] rounded-md border border-border bg-white pr-3 pl-9 text-[14px] text-background placeholder-background/50 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 md:w-[240px]"
            />
          </div>

          {/* New apps */}
          <button
            onClick={() => setOpenModal(true)}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-200 bg-blue-600 px-3 text-sm font-normal text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 shrink-0 text-white" />
            New App
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="relative mb-6">
        <ul className="flex gap-3 border-b border-border" role="tablist">
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
        <AppsList
          status={activeTab == "all" ? "" : activeTab}
          apps={data?.data || []}
          isFetching={isFetching}
          EmptyIcon={Archive}
        />
      </div>

      {/* Create New App Popup */}
      <CreateNewAppPopup openPopup={openModal} setOpenPopup={setOpenModal} />
    </section>
  );
};

export default AllAppsView;
