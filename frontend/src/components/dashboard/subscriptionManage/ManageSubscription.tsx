import { useLazyGetSubscriptionManagingPortalUrlQuery } from "@/redux/features/subscription/subscription.api";
import { CreditCard, Loader } from "lucide-react";
import { toast } from "sonner";

const ManageSubscription = () => {
  const [getPortalUrl, { isLoading, data }] = useLazyGetSubscriptionManagingPortalUrlQuery();
  const handleGetPortalUrl = async () => {
    if (isLoading || data?.data.url) return;
    const res = await getPortalUrl(undefined);
    const err = res.error;
    if (err) {
      toast.error("Something went wrong.", {
        description: "Please try again or contact support.",
      });
    }

    const url = res.data?.data?.url;
    if (url) {
      window.location.href = url;
    }
  };

  const isQueue = isLoading || Boolean(data?.data.url);
  return (
    <button
      disabled={isQueue}
      className="transition-color flex w-full items-center justify-center gap-[5px] rounded-lg bg-[#2563eb] px-6 py-3 font-medium text-white hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-[0.7]"
      onClick={handleGetPortalUrl}
    >
      <CreditCard className="mr-2 inline h-4 w-4" />
      Manage Subscription {isQueue ? <Loader className="animate-spin" /> : ""}
    </button>
  );
};

export default ManageSubscription;
