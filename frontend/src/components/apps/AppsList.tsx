// components/AppsList.tsx
import { AppCard } from "@/components";
import { IApp } from "@/types";
import { InboxIcon } from "lucide-react";
import { ComponentType, SVGProps } from "react";

type EmptyStateProps = {
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  before: string;
  highlightText: string;
  after: string;
};

const EmptyState = ({ Icon = InboxIcon, after, before, highlightText }: EmptyStateProps) => {
  return (
    <div className="col-span-full flex min-h-[300px] flex-col items-center justify-center text-center">
      <Icon className="mb-3 h-8 w-8 text-gray-400" />
      <h2 className="text-lg font-semibold text-gray-900">{""}</h2>
      <p className="mt-2 max-w-md text-sm text-gray-400">
        {before}

        {highlightText ? (
          <span className="rounded px-1 font-semibold text-gray-700">{highlightText}</span>
        ) : (
          " "
        )}
        {after}
      </p>
    </div>
  );
};

export type AppsListProps = {
  EmptyIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  apps: IApp[];
  isFetching: boolean;
  status: string;
};

const AppsList = ({ apps = [], EmptyIcon, isFetching, status }: AppsListProps) => {
  return (
    <>
      {apps.length ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {apps?.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : isFetching ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <EmptyState before="No" highlightText={status} after="apps found" Icon={EmptyIcon} />
        </div>
      )}
    </>
  );
};

export default AppsList;
