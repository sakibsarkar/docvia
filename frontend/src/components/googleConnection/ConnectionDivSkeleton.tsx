import Skeleton from "../ui/Skeleton";

const ConnectionDivSkeleton = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      {/* Header: App Name + Image */}
      <div className="flex items-start justify-between">
        <div className="mr-8 flex-1 space-y-4">
          <Skeleton className="h-4 w-32" /> {/* "App Name" label */}
          <Skeleton className="h-10 w-64" /> {/* Input field */}
        </div>

        <div className="flex flex-col items-center space-y-3">
          <Skeleton className="h-24 w-24 rounded-full" /> {/* Avatar */}
          <Skeleton className="h-9 w-32" /> {/* Change Image button */}
          <Skeleton className="h-3 w-40" /> {/* "JPG, GIF or PNG. 1MB max." */}
        </div>
      </div>

      {/* Status */}
      <div className="w-full space-y-3">
        <Skeleton className="h-4 w-20" />
        <div className="flex w-full items-center space-x-4">
          <Skeleton className="h-6 w-20 rounded-full" /> {/* "Inactive" pill */}
          <Skeleton className="h-8 w-12 rounded-full" /> {/* Toggle switch skeleton */}
        </div>
      </div>

      {/* App ID */}
      <div className="flex items-center justify-between">
        <div className="mr-8 flex-1 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full max-w-md" />
        </div>
        <Skeleton className="h-10 w-20" /> {/* Copy button */}
      </div>

      {/* Website URL */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full max-w-lg" />
      </div>

      {/* Description */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-32 w-full" /> {/* Textarea */}
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <Skeleton className="h-12 w-64 rounded-lg" />
      </div>

      {/* Delete App Section */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-8">
        <div className="space-y-1">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-12 w-48 rounded-lg" /> {/* Delete button */}
      </div>
    </div>
  );
};

export default ConnectionDivSkeleton;
