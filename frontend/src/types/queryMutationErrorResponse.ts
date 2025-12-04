export interface IQueryMutationErrorResponse {
  data: {
    message: string;
    errorMessages: { path: string; message: string }[];
    statusCode: number;
    success: boolean;
  };
}

export type TSearchParams = { searchParams: Promise<{ [key: string]: string | undefined }> };
