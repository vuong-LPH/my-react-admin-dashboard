export type PaymentStatus = 'completed' | 'pending' | 'failed';

export interface Payment {
  id: string;
  method: string;
}
