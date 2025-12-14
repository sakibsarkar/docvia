"use server";
import { baseUrl } from "@/redux/api/api";
import { IPlan } from "@/types/plan";
import Image from "next/image";
import PricingPlanCard from "./PricingPlanCard";

const PricingPlans = async () => {
  const res = await fetch(`${baseUrl}/subscription/plans`, {
    next: { revalidate: 30 * 60 * 60 },
  });

  const data = (await res.json()) as { data: IPlan[] };

  return (
    <div className="relative mx-auto grid max-w-6xl gap-[20px] md:grid-cols-3">
      {data.data
        ?.sort((a, b) => a.order - b.order)
        .map((plan) => (
          <PricingPlanCard key={plan.id} plan={plan} />
        ))}

      <Image
        src="/images/glow.png"
        alt=""
        width={850}
        height={945}
        className="absolute top-[-50%] left-[-12%] z-[1] w-[90%] max-w-[850px] object-contain opacity-[0.9]"
      />
    </div>
  );
};

export default PricingPlans;
