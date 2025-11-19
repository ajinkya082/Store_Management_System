import mongoose from 'mongoose';

const customerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    totalPurchases: { type: Number, default: 0 },
    lastPurchaseDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;