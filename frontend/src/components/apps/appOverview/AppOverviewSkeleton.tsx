import Skeleton from "@/components/ui/Skeleton";

const AppOverviewSkeleton = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <Skeleton className="mb-4 h-6 w-32" />

      {/* Main Card */}
      <div className="space-y-6 rounded-lg border border-border p-6">
        {/* App Name Section */}
        <div className="grid grid-cols-2 gap-1">
          <div className="w-full space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="right-6 w-full space-y-3">
            <Skeleton className="h-24 w-24 rounded-md" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
        {/* Status and App ID Section */}
        <div className="grid grid-cols-2 gap-8">
          {/* Status */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-10 w-20" />
          </div>

          {/* App ID */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="mb-2 h-4 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-12" />
            </div>
          </div>
        </div>

        {/* Website URL Section */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-96" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Description Section */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-32 w-full" />
        </div>

        {/* Save Button */}
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Delete App Section */}
      <div className="space-y-4 rounded-lg border border-border p-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="ml-auto h-10 w-48" />
      </div>

      {/* Profile Image Skeleton (for right side of main card) */}
    </div>
  );
};

export default AppOverviewSkeleton;
