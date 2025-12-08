export type AppStatus = "active" | "inactive";

export interface IApp {
  id: string;
  appName: string;
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
