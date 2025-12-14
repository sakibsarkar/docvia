import { api } from "@/redux/api/api";
import { IMeta } from "@/types";

const appStatisticsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAppStatisticsOverview: builder.query<
      {
        data: {
          visitCount: number;
          answeredChats: number;
          missedChats: number;
        };
        meta: IMeta;
      },
      string
    >({
      query: (appId) => {
        return {
          url: `/app-statistics/overview/${appId}`,
          method: "GET",
        };
      },
      providesTags: ["apps"],
    }),
    getAppVisitorStatistics: builder.query<
      {
        data: {
          date: string;
          count: number;
        }[];
        meta: IMeta;
      },
      string
    >({
      query: (appId) => {
        return {
          url: `/app-statistics/visitor-statistics/${appId}`,
          method: "GET",
        };
      },
      providesTags: ["apps"],
    }),
    getAppChatStatistics: builder.query<
      {
        data: {
          date: string;
          answered: number;
          missed: number;
        }[];
        meta: IMeta;
      },
      string
    >({
      query: (appId) => {
        return {
          url: `/app-statistics/chat-statistics/${appId}`,
          method: "GET",
        };
      },
      providesTags: ["apps"],
    }),
  }),
});

export const {
  useGetAppStatisticsOverviewQuery,
  useGetAppVisitorStatisticsQuery,
  useGetAppChatStatisticsQuery,
} = appStatisticsApi;
