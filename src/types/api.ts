export interface HydrationData {
  userId: string;
  totalMl: number;
  date: string;
}

export interface HydrationResponse extends HydrationData {
  id: string;
  createdAt: string;
}
