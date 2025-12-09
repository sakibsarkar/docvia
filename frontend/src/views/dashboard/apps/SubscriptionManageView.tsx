"use client";

import SubscriptionManageViewSkeleton from "@/components/dashboard/subscriptionManage/SubscriptionManageViewSkeleton";
import { useGetCurrentSubscriptionDetailsQuery } from "@/redux/features/subscription/subscription.api";
import { AlertCircle, CheckCircle2, CreditCard } from "lucide-react";

// Mock subscription data - replace with actual API call
const subscriptionData = {
  id: "3286267e-1bd5-4d02-a33b-f72cb24481e1",
  userId: "33f4d9a5-8784-42cf-b52a-fa9efcb62b46",
  planId: "dd583a7d-2a28-4610-9cr3-b0875362dbe8",
  price: 200,
  trialPeriodDays: 0,
  startDate: "2025-12-09T06:26:59.551Z",
  status: "active",
  isActive: true,
  createdAt: "2025-12-09T06:26:59.557Z",
  planInfo: {
    name: "Premium",
    price: 200,
    trialPeriodDays: 0,
    appLimit: 5,
    customization: true,
    durationMonths: 1,
  },
  nextBillingDate: "2026-01-09T06:27:18.000Z",
};
const SubscriptionManageView = () => {
  const { data, isLoading } = useGetCurrentSubscriptionDetailsQuery(undefined);

  const subscriptionData = data?.data;
  const plan = subscriptionData?.planInfo;
  const isUnlimited = plan?.appLimit === -1;

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get duration label
  const getDurationLabel = (months?: number) => {
    if (!months) return "";
    if (months === 1) return "Monthly";
    if (months === 12) return "Yearly";
    return `${months} months`;
  };

  if (isLoading) {
    return <SubscriptionManageViewSkeleton />;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">Subscription & Billing</h1>
          <p className="text-sm text-gray-600">Manage your subscription plan and billing details</p>
        </div>

        {/* Status Badge and Active Plan */}
        <div
          className="mb-6 rounded-lg border p-6"
          style={{ borderColor: "#e2e8f0", backgroundColor: "#ffffff" }}
        >
          {/* Active Status */}
          <div className="mb-6 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-600">Active Subscription</span>
          </div>

          {/* Plan Card */}
          <div className="mb-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Current Plan</h2>
            <div
              className="rounded-lg border p-6"
              style={{
                borderColor: "#e2e8f0",
                backgroundColor: "#f9fafb",
              }}
            >
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {/* Plan Name */}
                <div>
                  <p className="mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase">
                    Plan Name
                  </p>
                  <p className="text-xl font-semibold text-gray-900">{plan?.name}</p>
                </div>

                {/* Price */}
                <div>
                  <p className="mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase">
                    Price
                  </p>
                  <p className="text-xl font-semibold text-gray-900">${plan?.price}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    per {getDurationLabel(plan?.durationMonths).toLowerCase()}
                  </p>
                </div>

                {/* App Limit */}
                <div>
                  <p className="mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase">
                    App Limit
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {plan?.appCreated || 0} / {isUnlimited ? "Unlimited" : plan?.appLimit}
                  </p>
                </div>

                {/* Billing Frequency */}
                <div>
                  <p className="mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase">
                    Frequency
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {getDurationLabel(plan?.durationMonths)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Features */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Plan Features</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600" />
                <span className="text-sm text-gray-700">
                  {isUnlimited ? "Unlimited" : plan?.appLimit} app{plan?.appLimit !== 1 ? "s" : ""}{" "}
                  allowed
                </span>
              </div>
              {plan?.customization && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600" />
                  <span className="text-sm text-gray-700">Full customization enabled</span>
                </div>
              )}
            </div>
          </div>
          <button
            className="w-full rounded-lg px-6 py-3 font-medium transition-colors"
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          >
            <CreditCard className="mr-2 inline h-4 w-4" />
            Manage Subscription
          </button>
        </div>

        {/* Billing Details */}
        <div
          className="mb-6 rounded-lg border p-6"
          style={{ borderColor: "#e2e8f0", backgroundColor: "#ffffff" }}
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Billing Details</h2>

          <div className="space-y-4">
            {/* Subscription Start */}
            <div className="border-b pb-4" style={{ borderColor: "#e2e8f0" }}>
              <p className="mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase">
                Subscription Start
              </p>
              <p className="text-base font-medium text-gray-900">
                {formatDate(subscriptionData?.startDate)}
              </p>
            </div>

            {/* Next Billing Date */}
            <div className="border-b pb-4" style={{ borderColor: "#e2e8f0" }}>
              <p className="mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase">
                Next Billing Date
              </p>
              <p className="text-base font-medium text-gray-900">
                {formatDate(subscriptionData?.nextBillingDate)}
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase">
                Status
              </p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-600"></div>
                <p className="text-base font-medium text-gray-900 capitalize">
                  {subscriptionData?.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div
          className="rounded-lg border p-4"
          style={{
            borderColor: "#fbbf24",
            backgroundColor: "#fffbeb",
          }}
        >
          <div className="flex gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
            <div>
              <p className="mb-1 text-sm font-medium text-yellow-800">Need Help?</p>
              <p className="text-xs text-yellow-700">
                If you have any questions about your subscription or need assistance, please contact
                our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManageView;
