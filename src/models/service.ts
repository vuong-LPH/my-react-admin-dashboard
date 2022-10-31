export type ServiceStatus = 'completed' | 'pending' | 'failed';

export interface Service {
  id: string;
//   status: ServiceStatus;
  service: string;
  description: string;
  price: string;
//   address: string;
}
