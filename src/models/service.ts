export type ServiceStatus = 'completed' | 'pending' | 'failed';

export interface Service {
  id: string;
  service: string;
  description: string;
  price: string;
}
