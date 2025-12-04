"use client";

import { baseUrl } from "@/redux/api/api";
import { useGoogleConnectionStatusQuery } from "@/redux/features/googleOAuth/googleOAuth.api";
import Link from "next/link";
import type { IGoogleConnection } from "@/types";

const Connection = () => {
const { data, isLoading } = useGoogleConnectionStatusQuery();

console.log("log from connection:",data)

if (isLoading) {
  return (
    <section className="rounded-md border border-gray-200 bg-white p-5 md:p-6">
      <p className="text-sm text-gray-500">Checking Google connection…</p>
    </section>
  );
}

const connection: IGoogleConnection | undefined = data;

const allGood = connection?.connected && connection?.hasRequiredScopes;

return (
  <section className="space-y-4 rounded-md border border-gray-200 bg-white p-5 md:p-6">
    {allGood ? (
      <div className="space-y-1">
        <p className="text-sm text-green-600 font-medium">
          ✅ Google connection is healthy. All scopes granted.
        </p>
        <p className="text-xs text-gray-500">
          Connected since:{" "}
          {connection?.createdAt
            ? new Date(connection.createdAt).toLocaleString()
            : "N/A"}
        </p>
      </div>
    ) : (
      <div className="space-y-2">
        <p className="text-sm text-red-600 font-medium">
          ⚠️ Google connection needs attention. Please reconnect.
        </p>
        <Link
          href={`${baseUrl}/google/connect`}
          className="inline-block text-sm font-medium text-emerald-600 underline underline-offset-2"
        >
          Reconnect Google
        </Link>
      </div>
    )}
  </section>
);
};

export default Connection;
