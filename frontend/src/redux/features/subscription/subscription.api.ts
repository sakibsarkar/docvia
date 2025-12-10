import { api } from "@/redux/api/api";
import { IPlan } from "@/types/plan";
import { ICurrentSubscriptionDetails } from "@/types/subscription.";

const subscriptionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentSubscriptionDetails: builder.query<{ data: ICurrentSubscriptionDetails }, undefined>({
      query: () => ({ url: "/subscription/details", method: "GET" }),
      providesTags: ["subscription"],
    }),
    getSubscriptionManagingPortalUrl: builder.query<{ data: { url: string } }, undefined>({
      query: () => ({ url: "/subscription/portal-url", method: "GET" }),
      providesTags: ["subscription"],
    }),
    getAllActivePlans: builder.query<{ data: IPlan[] }, undefined>({
      query: () => ({ url: "/subscription/plans", method: "GET" }),
      providesTags: ["subscription"],
    }),
    createSubscription: builder.mutation<{ data: { url: string } }, string>({
      query: (planId) => ({
        url: "/subscription/create",
        method: "POST",
        body: {
          planId,
        },
      }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const {
  useGetCurrentSubscriptionDetailsQuery,
  useGetSubscriptionManagingPortalUrlQuery,
  useLazyGetSubscriptionManagingPortalUrlQuery,
  useGetAllActivePlansQuery,
  useCreateSubscriptionMutation,
} = subscriptionApi;
