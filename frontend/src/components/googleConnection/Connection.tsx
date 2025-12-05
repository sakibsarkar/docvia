"use client";

import { baseUrl } from "@/redux/api/api";
import { useGoogleConnectionStatusQuery } from "@/redux/features/googleOAuth/googleOAuth.api";
import type { IGoogleConnection } from "@/types";
import Link from "next/link";
import ConnectionDivSkeleton from "./ConnectionDivSkeleton";
import { Check, CloudAlert, RefreshCcw } from "lucide-react";

const Connection = () => {
  const { data, isLoading } = useGoogleConnectionStatusQuery();

  if (isLoading) {
    return <ConnectionDivSkeleton />;
  }

  const connection: IGoogleConnection | undefined = data;
  const allGood = connection?.connected && connection?.hasRequiredScopes;

  return (
    <section className="bg-card overflow-hidden rounded-lg border border-border shadow-sm">
      <div
        className={`p-6 transition-colors duration-300 ${
          allGood
            ? "bg-gradient-to-r from-emerald-50/50 to-cyan-50/50"
            : "bg-gradient-to-r from-red-50/50 to-amber-50/50"
        }`}
      >
        <div className="flex flex-col gap-4">
          {/* Header Section with Icon and Status */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {allGood ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-5 w-5 text-emerald-600" />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <CloudAlert className="h-5 w-5 text-red-600" />
                </div>
              )}
              <div>
                <h3 className="text-foreground text-base font-semibold">Google Connection</h3>
                <p
                  className={`text-sm font-medium ${allGood ? "text-emerald-700" : "text-red-700"}`}
                >
                  {allGood ? "✓ Healthy & Connected" : "⚠ Needs Attention"}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                allGood ? "bg-emerald-100/80 text-emerald-700" : "bg-red-100/80 text-red-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${allGood ? "bg-emerald-600" : "bg-red-600"}`}
              ></span>
              {allGood ? "Active" : "Disconnected"}
            </div>
          </div>

          {/* Details Section */}
          {allGood && (
            <div className="space-y-2 rounded-md bg-white/50 p-3">
              {connection?.picture || connection?.name || connection?.email ? (
                <div className="mb-3 flex items-center gap-3 border-b border-border pb-3">
                  {/* {connection?.picture && (
                    <img
                      src={connection.picture || "/placeholder.svg"}
                      alt={connection.name || "User avatar"}
                      className="h-10 w-10 rounded-full border border-border"
                      crossOrigin="anonymous"
                    />
                  )} */}
                  <div className="flex-1">
                    {connection?.name && (
                      <p className="text-foreground text-sm font-semibold">{connection.name}</p>
                    )}
                    {connection?.email && (
                      <p className="text-muted-foreground text-xs">{connection.email}</p>
                    )}
                  </div>
                </div>
              ) : null}

              <p className="text-muted-foreground text-xs">
                <span className="text-foreground font-medium">All Scopes Granted</span>
              </p>
              <p className="text-muted-foreground text-xs">
                Connected since:{" "}
                <span className="text-foreground font-medium">
                  {connection?.createdAt
                    ? new Date(connection.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </span>
              </p>
            </div>
          )}

          {/* Action Section */}
          {!allGood && (
            <div className="rounded-md bg-white/50 p-3">
              <p className="text-muted-foreground mb-3 text-xs">
                Your Google connection has expired or is missing required scopes. Please reconnect
                to continue.
              </p>
              <Link
                href={`${baseUrl}/google/connect`}
                className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-700"
              >
                <RefreshCcw className="h-4 w-4" />
                Reconnect Google
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Connection;
