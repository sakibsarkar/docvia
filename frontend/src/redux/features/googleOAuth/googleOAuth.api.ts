import { api } from "@/redux/api/api";
import { IGoogleDoc } from "@/types";
import { generateQueryParams } from "../../../utils/params";

export interface IGoogleConnection {
  connected: boolean;
  hasRequiredScopes: boolean;
  createdAt: string;
}

export interface IGoogleDocOwner {
  displayName: string;
}

type DocsResponse = { data: { files: IGoogleDoc[]; nextPageToken?: string } };
type ConnectionResponse = { data: IGoogleConnection };

const googleOAuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    googleConnectionStatus: builder.query<IGoogleConnection, void>({
      query: () => ({ url: "/google/myconnection", method: "GET" }),
      transformResponse: (res: ConnectionResponse) => res.data,
      providesTags: ["googleOAuth"],
    }),

    googleDocList: builder.query<DocsResponse, Record<string, string | number | undefined>>({
      query: (query) => {
        const queryStr = generateQueryParams(query);
        return {
          url: `/google/doc/list?${queryStr}`,
          method: "GET",
        };
      },
      providesTags: ["googleOAuth"],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGoogleConnectionStatusQuery, useGoogleDocListQuery } = googleOAuthApi;
