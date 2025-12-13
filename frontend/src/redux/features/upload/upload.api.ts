import { api } from "@/redux/api/api";

const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create blog post
    uploadMultipleFile: builder.mutation<{ data: string[] }, FormData>({
      query: (id) => ({
        url: `/upload/multiple`,
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["file"],
    }),
    uploadSingleFile: builder.mutation<{ data: string }, FormData>({
      query: (id) => ({
        url: `/upload/single`,
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["file"],
    }),
  }),
});
export const { useUploadMultipleFileMutation, useUploadSingleFileMutation } = uploadApi;
