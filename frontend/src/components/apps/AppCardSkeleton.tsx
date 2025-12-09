import Skeleton from "../ui/Skeleton";

const AppCardSkeleton = () => {
  return (
    <div className="rounded-[5px] border bg-backup p-[0.5px] pl-[1px] backdrop-blur-[35px]">
      <div className="primaryRadialGradient relative flex items-start gap-4 rounded-[4px] border border-border px-4 py-6 shadow-sm">
        {/* Left icon box */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
          <Skeleton className="h-6 w-6" />
        </div>

        {/* Right content */}
        <div className="min-w-0 flex-1">
          {/* Title row */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Domain */}
          <Skeleton className="mt-1 h-3 w-40" />

          {/* Updated text */}
          <Skeleton className="mt-3 h-3 w-24" />
        </div>
      </div>
    </div>
  );
};

export default AppCardSkeleton;
