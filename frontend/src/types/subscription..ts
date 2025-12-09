export interface ICurrentSubscriptionDetails {
  id: string;
  userId: string;
  planId: string;
  price: number;
  trialPeriodDays: number;
  startDate: string;
  status: string;
  isActive: boolean;
  createdAt: string;
  planInfo: {
    appCreated: number;
    name: string;
    price: number;
    trialPeriodDays: number;
    appLimit: number;
    customization: boolean;
    durationMonths: number;
  };
  nextBillingDate: string;
}
