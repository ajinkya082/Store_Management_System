
export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  totalPurchases: number;
  lastPurchaseDate: string;
  createdAt: string;
}

export interface Sale {
  _id: string;
  id: string; // The human-readable ID like SALE-001
  customerName: string;
  customerId?: string;
  products: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  date: string;
}

export interface User {
  _id: string;
  name:string;
  email: string;
  accessRole: 'owner' | 'customer';
  systemRole?: 'Admin' | 'Staff';
  avatarUrl: string;
  token?: string;
}

export interface CustomerOrder {
    _id: string;
    id: string;
    date: string;
    status: 'Delivered' | 'Processing' | 'Cancelled' | string; // Made flexible for potential future statuses
    total: number;
    items: number;
}
