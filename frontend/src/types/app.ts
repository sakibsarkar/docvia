export type AppStatus = "development" | "production" | "archive";

export interface IApp {
  id: string;
  appName: string;
  status: AppStatus;
  userId: string;
  authorizedOrigin: string;
  isActive?: boolean;
  avatar?: string;
  description?: string;
  googleDocId: string;
  googleDocName: string;
  createdAt: string;
  updatedAt?: string;
}
