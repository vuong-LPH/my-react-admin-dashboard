export type VendorStatus = 'completed' | 'pending' | 'failed';

export interface Vendor {
  id: string;
  vendor: string;
  phone: string;
  email: string;
  street: string;
  district: string;
  city: string;
  zipCode: string;
}
