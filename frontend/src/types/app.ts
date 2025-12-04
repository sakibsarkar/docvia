export type AppStatus = "development" | "production" | "archive";

export interface IApp {
  id: string;
  appName: string;
  status: AppStatus;
  userId: string;
  authorizedOrigin: string;
  googleDocId: string;
  createdAt: string;
  updatedAt?: string;
}
