"use client";

import { SearchBar } from "@/components";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Shortcuts = () => {
  const [search, setSearch] = useState("");
  return (
    <section>
      {/* Top bar with custom dropdown */}
      <div className="mb-6 rounded-md border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search"
            widthClassName="w-[340px]"
          />

          <button className="flex items-center gap-1 rounded bg-blue-500 px-4 py-2 text-[14px] text-white hover:bg-blue-600">
            <PlusIcon className="h-4 w-4 text-white" />
            Add Shortcut
          </button>
        </div>
      </div>
    </section>
  );
};

export default Shortcuts;
