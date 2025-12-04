import { api } from "@/redux/api/api";
import { IUser } from "@/types";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerCustomer: builder.mutation<
      { data: { result: IUser; accessToken: string } },
      Pick<IUser, "first_name" | "last_name" | "email" | "password">
    >({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["user"],
    }),
    loginUser: builder.mutation<
      { data: { result: IUser; accessToken: string } },
      Pick<IUser, "email" | "password">
    >({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["user"],
    }),

    logoutUser: builder.mutation<{ data: null }, undefined>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["user"],
    }),

    forgotPassword: builder.mutation<{ data: null }, { email: string }>({
      query: (data) => ({ url: "/auth/forgot-password", method: "POST", body: data }),
      invalidatesTags: ["user"],
    }),

    resetPassword: builder.mutation<
      { data: { token: string; password: string } },
      { token: string; password: string }
    >({
      query: (data) => ({ url: "/auth/reset-password", method: "POST", body: data }),
      invalidatesTags: ["user"],
    }),

    changePassword: builder.mutation({
      query: (payload: { oldPassword: string; password: string }) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),

    sendVerificationOtp: builder.mutation<
      { data: { cooldownEnd: number; remainingSecond: number; sent: boolean }; success: boolean },
      { email: string }
    >({
      query: (payload) => ({ url: "/auth/send-verification-email", method: "POST", body: payload }),
      invalidatesTags: ["user"],
    }),

    verifyOtp: builder.mutation<
      { data: { result: IUser } },
      { email: string; otp: string | number }
    >({
      query: (payload) => ({ url: "/auth/verify-otp", method: "POST", body: payload }),
      invalidatesTags: ["user"],
    }),

    getAuthor: builder.query<{ data: IUser }, void>({
      query: () => ({ url: "/auth/author", method: "GET" }),
      providesTags: ["user"],
    }),

    updateProfile: builder.mutation<{ data: IUser }, Partial<IUser>>({
      query: (payload) => ({ url: "/auth/update-profile", method: "PATCH", body: payload }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useRegisterCustomerMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useSendVerificationOtpMutation,
  useVerifyOtpMutation,
  useGetAuthorQuery,
  useUpdateProfileMutation,
} = userApi;
