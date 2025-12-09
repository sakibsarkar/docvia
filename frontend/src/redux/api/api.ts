/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "../features/user/user.slice";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include",
});

const baseQueryWithRefreshToken = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const res = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = (await res.json()) as {
      success: boolean;
      data: {
        accessToken: string;
      };
    };

    if (data?.success && data?.data?.accessToken) {
      api?.dispatch(setToken(data?.data?.accessToken));
      result = await baseQuery(args, api, extraOptions);
    }
    return result;
  }

  return result;
};

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["user", "googleOAuth", "apps", "subscription"],
  endpoints: () => ({}),
});
