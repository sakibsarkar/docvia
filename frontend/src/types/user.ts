export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  email: string;
  password: string;
  isVerified: boolean;
  role?: "user" | "admin";
  currentSubscriptionId?: string;
  isActive: boolean;
  token?: string;
  createdAt: string;
  updatedAt: string;
}
