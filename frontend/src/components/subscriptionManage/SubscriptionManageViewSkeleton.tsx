import Skeleton from "@/components/ui/blocks/Skeleton";

const SubscriptionManageViewSkeleton = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="mb-2 h-8 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Main Card Skeleton */}
        <div className="mb-6 rounded-lg border border-border bg-card p-6">
          {/* Status Badge Skeleton */}
          <div className="mb-6 flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Plan Card Skeleton */}
          <div className="mb-6">
            <Skeleton className="mb-4 h-6 w-24" />
            <div className="rounded-lg border border-border p-6">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="mb-2 h-4 w-16" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Skeleton */}
          <div className="mb-6">
            <Skeleton className="mb-3 h-5 w-32" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          </div>

          {/* Button Skeleton */}
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* Billing Details Skeleton */}
        <div className="mb-6 rounded-lg border border-border bg-card p-6">
          <Skeleton className="mb-4 h-6 w-32" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-b border-border pb-4">
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-5 w-40" />
              </div>
            ))}
          </div>
        </div>

        {/* Help Section Skeleton */}
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex gap-3">
            <Skeleton className="h-5 w-5 flex-shrink-0 rounded-full" />
            <div className="flex-1">
              <Skeleton className="mb-2 h-4 w-20" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="mt-1 h-3 w-5/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManageViewSkeleton;
