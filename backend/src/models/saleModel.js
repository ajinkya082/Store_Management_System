import mongoose from 'mongoose';

const saleProductSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const saleSchema = mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // SALE-001
    customerName: { type: String, required: true },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    products: [saleProductSchema],
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;