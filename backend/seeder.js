
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './src/config/db.js';
import { mockProducts, mockCustomers, mockSales, mockSystemUsers, mockCustomerUser } from './data/mockData.js';
import Product from './src/models/productModel.js';
import Customer from './src/models/customerModel.js';
import Sale from './src/models/saleModel.js';
import User from './src/models/userModel.js';

dotenv.config();
await connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Customer.deleteMany();
    await Sale.deleteMany();
    await User.deleteMany();

    await Product.insertMany(mockProducts);
    await Customer.insertMany(mockCustomers);
    await Sale.insertMany(mockSales);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create system users
    for (const user of mockSystemUsers) {
      const newUser = new User({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        accessRole: 'owner',
        systemRole: user.role,
        avatarUrl: user.avatarUrl,
      });
      await newUser.save();
    }
    
    // Create customer user
    const customerUser = new User({
        name: mockCustomerUser.name,
        email: mockCustomerUser.email,
        password: hashedPassword,
        accessRole: 'customer',
        avatarUrl: mockCustomerUser.avatarUrl,
    });
    await customerUser.save();

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Customer.deleteMany();
    await Sale.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}