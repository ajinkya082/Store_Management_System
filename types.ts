export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalPurchases: number;
  lastPurchaseDate: string;
}

export interface Sale {
  id: string;
  customerName: string;
  products: {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  date: string;
}

export interface User {
  name: string;
  email: string;
  role: 'Admin' | 'Staff';
  avatarUrl: string;
}

export interface CustomerOrder {
    id: string;
    date: string;
    status: 'Delivered' | 'Processing' | 'Cancelled';
    total: number;
    items: number;
}
