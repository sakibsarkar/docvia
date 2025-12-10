"use client";

import {
  useCreateSubscriptionMutation,
  useGetAllActivePlansQuery,
} from "@/redux/features/subscription/subscription.api";
import { IQueryMutationErrorResponse } from "@/types";
import { IPlan } from "@/types/plan";
import { Crown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PricingPlanCard from "./PricingPlanCard";

interface IProps {
  className?: string;
}

const ChoosePricingPlans: React.FC<IProps> = ({ className }) => {
  const { data, isLoading: isLoadingPlans } = useGetAllActivePlansQuery(undefined);

  const [isOpen, setIsOpen] = useState(false);

  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation(undefined);

  const handlePlanSelect = async (plan: IPlan) => {
    if (isLoading) return;
    if (plan.price === 0) {
      setIsOpen(false);
      return;
    }
    const res = await createSubscription(plan.id);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      toast.error("Something went wrong.", {
        description: "Please try again or contact support.",
      });
      return;
    }

    const url = res.data?.data?.url;
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div className={twMerge("w-full", className)}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="h-[unset] w-full bg-primary py-[10px] font-semibold text-primary-foreground hover:bg-primary/90">
            Upgrade Plan <Crown />
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-glow-purple max-h-[90vh] w-[90vw] !max-w-[1200px] overflow-auto border-border/50 bg-background">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Upgrade your plan
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Choose the plan that is right for you.
            </DialogDescription>
          </DialogHeader>

          <div className="grid w-full gap-6 py-4 md:grid-cols-3">
            {isLoadingPlans ? (
              <>loading... skeleton</>
            ) : (
              data?.data?.map((plan) => (
                <PricingPlanCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChoosePricingPlans;
