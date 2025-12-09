import { api } from "@/redux/api/api";
import { ICurrentSubscriptionDetails } from "@/types/subscription.";

const subscriptionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentSubscriptionDetails: builder.query<{ data: ICurrentSubscriptionDetails }, undefined>({
      query: () => ({ url: "/subscription/get-details", method: "GET" }),
      providesTags: ["subscription"],
    }),
  }),
});

export const { useGetCurrentSubscriptionDetailsQuery } = subscriptionApi;
