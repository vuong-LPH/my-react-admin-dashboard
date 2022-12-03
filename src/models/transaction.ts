export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  order: string;
  paymentMethod: string;
  day: number;
}
