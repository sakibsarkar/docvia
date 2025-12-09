export interface IPlan {
  id: string;
  name: string;
  price: number;
  durationMonths: number;
  appLimit: number;
  customization: boolean;
  trialPeriodDays: number;
  isActive: boolean;
  order: number;
  createdAt?: string;
}
