import Sale from '../models/saleModel.js';
import User from '../models/userModel.js';
import Customer from '../models/customerModel.js';


// @desc    Fetch all sales
// @route   GET /api/sales
// @access  Private/Admin
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find({}).sort({ date: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new sale
// @route   POST /api/sales
// @access  Private/Admin
const createSale = async (req, res) => {
  try {
    const { customerName, customerId, products, total } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const saleCount = await Sale.countDocuments();
    const saleId = `SALE-${String(saleCount + 1).padStart(3, '0')}`;
    const sale = new Sale({
      id: saleId,
      customerName,
      customerId,
      products,
      total,
      date: new Date(),
    });

    const createdSale = await sale.save();
    
    // Update customer total purchases
    const customer = await Customer.findById(customerId);
    if(customer) {
        customer.totalPurchases += total;
        customer.lastPurchaseDate = new Date();
        await customer.save();
    }
    
    res.status(201).json(createdSale);
  } catch (error) {
    res.status(400).json({ message: 'Error creating sale', error: error.message });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/sales/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    // The user's email should match the customer's email
    const customer = await Customer.findOne({ email: req.user.email });
    if (!customer) {
        return res.json([]);
    }
    const sales = await Sale.find({ customerId: customer._id }).sort({ date: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export { getSales, createSale, getMyOrders };