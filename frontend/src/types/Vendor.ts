export interface VendorContact {
  id: string;
  vendorId: string;
  name: string;
  role: string;
  phone?: string;
  email?: string;
}

export interface Vendor {
  id: string;
  name: string;
  isShopping: boolean;
  contacts?: VendorContact[];
}
