import { api } from "@/redux/api/api";
import { IApp } from "@/types";
import { generateQueryParams } from "@/utils/params";

const appsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getApps: builder.query<{ data: IApp[] }, Record<string, string | number | undefined>>({
      query: (query) => {
        const queryStr = generateQueryParams(query);
        return {
          url: `/app/get?${queryStr}`,
          method: "GET",
        };
      },
      providesTags: ["apps"],
    }),
    getAppCount: builder.query<{ data: { count: number } }, undefined>({
      query: () => {
        return {
          url: `/get/a/count`,
          method: "GET",
        };
      },
      providesTags: ["apps"],
    }),
    getAppSecretKeyByAppId: builder.query<{ data: { apiKeyHash: string; userId: string } }, string>(
      {
        query: (appId) => {
          return {
            url: `/app/get/key/${appId}`,
            method: "GET",
          };
        },
        providesTags: ["apps"],
      }
    ),
    getAppById: builder.query<{ data: IApp }, string>({
      query: (id) => ({
        url: `/app/get/${id}`,
        method: "GET",
      }),
      providesTags: ["apps"],
    }),
    createApp: builder.mutation<
      { data: IApp },
      Pick<IApp, "appName" | "authorizedOrigin" | "googleDocId" | "googleDocName">
    >({
      query: (app) => ({
        url: "/app/create",
        method: "POST",
        body: app,
      }),
      invalidatesTags: ["apps"],
    }),

    updateAppByAppId: builder.mutation<{ data: IApp }, { appId: string; payload: Partial<IApp> }>({
      query: ({ appId, payload }) => ({
        url: `/app/update/${appId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["apps"],
    }),
    deleteApp: builder.mutation<{ data: null }, string>({
      query: (appId) => ({
        url: `/app/delete/${appId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["apps"],
    }),
  }),
});

export const {
  useGetAppsQuery,
  useGetAppByIdQuery,
  useCreateAppMutation,
  useGetAppCountQuery,
  useDeleteAppMutation,
  useUpdateAppByAppIdMutation,
  useGetAppSecretKeyByAppIdQuery,
  useLazyGetAppSecretKeyByAppIdQuery,
} = appsApi;
