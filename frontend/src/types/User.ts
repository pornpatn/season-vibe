export interface User {
  id: string;
  username: string;
  email?: string;
  name?: string;
  role: string;
  phoneNumber?: string;
  isActive: boolean;
  lastAccessAt?: string;
}