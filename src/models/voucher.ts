export type VoucherStatus = 'completed' | 'pending' | 'failed';

export interface Voucher {
  id: string;
//   status: ServiceStatus;
  voucher: string;
  description: string;
  startDate: number;
  endDate: number;
  serviceSupport: string;
  condition: string;
  quantity: number;
//   address: string;
}
