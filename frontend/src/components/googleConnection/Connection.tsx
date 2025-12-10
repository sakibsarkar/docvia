"use client";

import { baseUrl } from "@/redux/api/api";
import { useGoogleConnectionStatusQuery } from "@/redux/features/googleOAuth/googleOAuth.api";
import type { IGoogleConnection } from "@/types";
import { Check, ShieldAlert as CloudAlert, RefreshCcw } from "lucide-react";
import Link from "next/link";
import ConnectionDivSkeleton from "./ConnectionDivSkeleton";

const Connection = () => {
  const { data, isLoading } = useGoogleConnectionStatusQuery();

  if (isLoading) {
    return <ConnectionDivSkeleton />;
  }

  const connection: IGoogleConnection | undefined = data;
  const allGood = connection?.connected && connection?.hasRequiredScopes;

  return (
    <section className="bg-glow-blue overflow-hidden rounded-lg border border-border bg-card">
      <div
        className={`p-6 transition-colors duration-300 ${
          allGood
            ? "bg-gradient-to-r from-blue-950/20 to-indigo-950/20"
            : "bg-gradient-to-r from-red-950/20 to-orange-950/20"
        }`}
      >
        <div className="flex flex-col gap-4">
          {/* Header Section with Icon and Status */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {allGood ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-900/50 bg-blue-950/40">
                  <Check className="h-5 w-5 text-blue-400" />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-red-900/50 bg-red-950/40">
                  <CloudAlert className="h-5 w-5 text-red-400" />
                </div>
              )}
              <div>
                <h3 className="text-base font-semibold text-foreground">Google Connection</h3>
                <p className={`text-sm font-medium ${allGood ? "text-blue-300" : "text-red-300"}`}>
                  {allGood ? "✓ Healthy & Connected" : "⚠ Needs Attention"}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                allGood
                  ? "border border-blue-900/50 bg-blue-950/40 text-blue-300"
                  : "border border-red-900/50 bg-red-950/40 text-red-300"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${allGood ? "bg-blue-400" : "bg-red-400"}`}
              ></span>
              {allGood ? "Active" : "Disconnected"}
            </div>
          </div>

          {/* Details Section */}
          {allGood && (
            <div className="space-y-2 rounded-md border border-blue-900/30 bg-blue-950/20 p-3">
              {connection?.picture || connection?.name || connection?.email ? (
                <div className="mb-3 flex items-center gap-3 border-b border-blue-900/30 pb-3">
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
                      <p className="text-sm font-semibold text-foreground">{connection.name}</p>
                    )}
                    {connection?.email && (
                      <p className="text-xs text-muted-foreground">{connection.email}</p>
                    )}
                  </div>
                </div>
              ) : null}

              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">All Scopes Granted</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Connected since:{" "}
                <span className="font-medium text-foreground">
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
            <div className="rounded-md border border-red-900/30 bg-red-950/20 p-3">
              <p className="mb-3 text-xs text-muted-foreground">
                Your Google connection has expired or is missing required scopes. Please reconnect
                to continue.
              </p>
              <Link
                href={`${baseUrl}/google/connect`}
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
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
