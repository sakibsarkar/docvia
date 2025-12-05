import React from 'react';
import Skeleton from '../ui/Skeleton';

const ConnectionDivSkeleton = () => {
    return (
            <section className="bg-card overflow-hidden rounded-lg border border-border shadow-sm">
        <div className="p-6">
          <div className="flex flex-col gap-4">
            {/* Header Section */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-3 w-24 rounded" />
                </div>
              </div>

              {/* Status Badge */}
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            {/* Details Section */}
            <div className="space-y-2 rounded-md bg-white/50 p-3">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-3 w-32 rounded" />
            </div>

            {/* Action Section */}
            <div className="rounded-md bg-white/50 p-3">
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-5/6 rounded" />
              <Skeleton className="mt-3 h-8 w-36 rounded" />
            </div>
          </div>
        </div>
      </section>
    );
};

export default ConnectionDivSkeleton;