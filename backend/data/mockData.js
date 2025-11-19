export const mockProducts = [
  { id: 1, name: 'Wireless Mouse', category: 'Electronics', price: 25.99, stock: 150, sku: 'WM-001' },
  { id: 2, name: 'Mechanical Keyboard', category: 'Electronics', price: 79.99, stock: 80, sku: 'MK-002' },
  { id: 3, name: 'Cotton T-Shirt', category: 'Apparel', price: 15.00, stock: 300, sku: 'CT-003' },
  { id: 4, name: 'Leather Wallet', category: 'Accessories', price: 45.50, stock: 120, sku: 'LW-004' },
  { id: 5, name: 'Yoga Mat', category: 'Sports', price: 30.00, stock: 2, sku: 'YM-005' },
  { id: 6, name: 'Coffee Mug', category: 'Home Goods', price: 12.99, stock: 250, sku: 'CM-006' },
];

export const mockCustomers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890', totalPurchases: 1250.75, lastPurchaseDate: '2023-10-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '234-567-8901', totalPurchases: 850.20, lastPurchaseDate: '2023-10-12' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '345-678-9012', totalPurchases: 2300.00, lastPurchaseDate: '2023-09-28' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', phone: '456-789-0123', totalPurchases: 450.50, lastPurchaseDate: '2023-10-20' },
];

export const mockSales = [
    { id: 'SALE-001', customerName: 'Alice Johnson', products: [{ productId: 1, productName: 'Wireless Mouse', quantity: 2, price: 25.99 }], total: 51.98, date: '2023-10-15' },
    { id: 'SALE-002', customerName: 'Bob Smith', products: [{ productId: 3, productName: 'Cotton T-Shirt', quantity: 5, price: 15.00 }], total: 75.00, date: '2023-10-12' },
];

export const mockUser = {
    name: 'Admin User',
    email: 'admin@store.com',
    role: 'Admin',
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=Admin`
}

export const mockSystemUsers = [
    mockUser,
    { name: 'Jane Doe', email: 'jane.doe@store.com', role: 'Staff', avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=Jane+Doe`},
    { name: 'John Smith', email: 'john.smith@store.com', role: 'Staff', avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=John+Smith`},
];

export const mockCustomerUser = {
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'Staff', // This role is from the generic User type, not the app's access control role
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=Charlie+Brown`
}