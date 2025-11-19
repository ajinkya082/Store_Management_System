import Customer from '../models/customerModel.js';

// @desc    Fetch all customers
// @route   GET /api/customers
// @access  Private/Admin
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({}).sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a customer
// @route   POST /api/customers
// @access  Private/Admin
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const customerExists = await Customer.findOne({ email });

    if (customerExists) {
      res.status(400).json({ message: 'Customer already exists' });
      return;
    }

    const customer = await Customer.create({
      name,
      email,
      phone,
      lastPurchaseDate: new Date(),
    });

    if (customer) {
      res.status(201).json(customer);
    } else {
      res.status(400).json({ message: 'Invalid customer data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private/Admin
const updateCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const customer = await Customer.findById(req.params.id);

    if (customer) {
        customer.name = name;
        customer.email = email;
        customer.phone = phone;
        const updatedCustomer = await customer.save();
        res.json(updatedCustomer);
    } else {
        res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Private/Admin
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (customer) {
        await customer.deleteOne();
        // Optionally, also delete related sales, etc.
        res.json({ message: 'Customer removed' });
    } else {
        res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export { getCustomers, createCustomer, updateCustomer, deleteCustomer };