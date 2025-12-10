"use client";

import ManageSubscription from "@/components/dashboard/subscriptionManage/ManageSubscription";
import SubscriptionManageViewSkeleton from "@/components/dashboard/subscriptionManage/SubscriptionManageViewSkeleton";
import ChoosePricingPlans from "@/components/pricing/ChoosePricingPlans";
import { useGetCurrentSubscriptionDetailsQuery } from "@/redux/features/subscription/subscription.api";
import dateUtils from "@/utils/date";
import { AlertCircle, CheckCircle2 } from "lucide-react";

// Get duration label
const getDurationLabel = (months?: number) => {
  if (!months) return "";
  if (months === 1) return "Monthly";
  if (months === 12) return "Yearly";
  return `${months} months`;
};
const SubscriptionManageView = () => {
  const { data, isLoading } = useGetCurrentSubscriptionDetailsQuery(undefined);

  const subscriptionData = data?.data;
  const plan = subscriptionData?.planInfo;
  const isFreePlan = plan?.price === 0;
  const isUnlimited = plan?.appLimit === -1;

  if (isLoading) {
    return <SubscriptionManageViewSkeleton />;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-semibold text-foreground">Subscription & Billing</h1>
          <p className="text-sm text-muted-foreground">
            Manage your subscription plan and billing details
          </p>
        </div>

        {/* Status Badge and Active Plan */}
        <div className="mb-6 rounded-[6px] bg-backup p-[0.5px] pl-[1px] backdrop-blur-[35px]">
          <div className="primaryRadialGradient rounded-[5px] border border-border p-6">
            {/* Active Status */}
            <div className="mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Active Subscription</span>
            </div>

            {/* Plan Card */}
            <div className="mb-6">
              <h2 className="mb-4 text-lg font-semibold text-primary">Current Plan</h2>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  {/* Plan Name */}
                  <div>
                    <p className="text-primaryuppercase mb-2 text-xs font-medium tracking-wide text-muted-foreground">
                      Plan Name
                    </p>
                    <p className="text-xl font-semibold text-foreground">{plan?.name}</p>
                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-primaryuppercase mb-2 text-xs font-medium tracking-wide text-muted-foreground">
                      Price
                    </p>
                    <p className="text-xl font-semibold text-foreground">
                      {isFreePlan ? "Free" : `$${plan?.price}`}
                    </p>
                    {!isFreePlan ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        per {getDurationLabel(plan?.durationMonths).toLowerCase()}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* App Limit */}
                  <div>
                    <p className="text-primaryuppercase mb-2 text-xs font-medium tracking-wide text-muted-foreground">
                      App Limit
                    </p>
                    <p className="text-xl font-semibold text-foreground">
                      {plan?.appCreated || 0} / {isUnlimited ? "Unlimited" : plan?.appLimit}
                    </p>
                  </div>

                  {/* Billing Frequency */}
                  <div>
                    {isFreePlan ? (
                      <>
                        <p className="text-primaryuppercase mb-2 text-xs font-medium tracking-wide text-muted-foreground">
                          Expires On
                        </p>
                        <p className="text-xl font-semibold text-destructive">
                          {dateUtils.formatToMMMdddYYYY(
                            dateUtils.getExpirationDate(
                              subscriptionData?.createdAt,
                              plan.trialPeriodDays
                            )
                          )}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-primaryuppercase mb-2 text-xs font-medium tracking-wide text-foreground">
                          Frequency
                        </p>
                        <p className="text-xl font-semibold text-primary">
                          {getDurationLabel(plan?.durationMonths)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Features */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold text-primary">Plan Features</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600" />
                  <span className="text-sm text-foreground">
                    {isUnlimited ? "Unlimited" : plan?.appLimit} app
                    {plan?.appLimit !== 1 ? "s" : ""} allowed
                  </span>
                </div>
                {plan?.customization && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-600" />
                    <span className="text-sm text-foreground">Full customization enabled</span>
                  </div>
                )}
              </div>
            </div>
            {isFreePlan ? <ChoosePricingPlans /> : <ManageSubscription />}
          </div>
        </div>

        {/* Billing Details */}
        <div className="mb-6 rounded-[6px] bg-backup p-[0.5px] pl-[1px] backdrop-blur-[35px]">
          <div className="primaryRadialGradient rounded-lg border border-border p-6">
            <h2 className="mb-4 text-lg font-semibold text-primary">Billing Details</h2>

            <div className="space-y-4">
              {/* Subscription Start */}
              <div className="border-b pb-4" style={{ borderColor: "#e2e8f0" }}>
                <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground">
                  Subscription Start
                </p>
                <p className="text-base font-medium text-foreground">
                  {dateUtils.formatToMMMdddYYYY(subscriptionData?.startDate)}
                </p>
              </div>

              {/* Next Billing Date */}
              <div className="border-b pb-4" style={{ borderColor: "#e2e8f0" }}>
                <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground">
                  Next Billing Date
                </p>
                <p className="text-base font-medium text-foreground">
                  {dateUtils.formatToMMMdddYYYY(subscriptionData?.nextBillingDate)}
                </p>
              </div>

              {/* Status */}
              <div>
                <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground">
                  Status
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-600"></div>
                  <p className="text-base font-medium text-primary capitalize">
                    {subscriptionData?.status}
                  </p>
                </div>
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
