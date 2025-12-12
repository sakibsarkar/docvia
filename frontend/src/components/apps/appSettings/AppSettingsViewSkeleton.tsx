import Skeleton from "@/components/ui/blocks/Skeleton";

const AppSettingsViewSkeleton = () => {
  return (
    <div className="w-full space-y-8 p-6">
      {/* Connected Google Doc Section */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" /> {/* Title */}
        <Skeleton className="h-4 w-72" /> {/* Subtitle */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10" /> {/* Icon */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" /> {/* File name */}
              <Skeleton className="h-3 w-28" /> {/* Connected on */}
            </div>
          </div>
          <Skeleton className="h-8 w-20 rounded" /> {/* Change button */}
        </div>
        <Skeleton className="mt-2 h-10 w-full" /> {/* Note box */}
      </div>

      {/* Other Settings Section */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" /> {/* Title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" /> {/* Auto-sync title */}
              <Skeleton className="h-3 w-56" /> {/* Auto-sync subtitle */}
            </div>
            <Skeleton className="h-6 w-12 rounded" /> {/* Toggle */}
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-4 w-28" /> {/* Notifications title */}
              <Skeleton className="h-3 w-52" /> {/* Notifications subtitle */}
            </div>
            <Skeleton className="h-6 w-12 rounded" /> {/* Toggle */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSettingsViewSkeleton;
