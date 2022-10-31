export type UserStatus = 'completed' | 'pending' | 'failed';

export interface User {
  id: string;
  status: UserStatus;
  fullName: string;
  email: string;
  phone: string;
  address: string;
}
