import User from '../models/userModel.js';
import Customer from '../models/customerModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        accessRole: user.accessRole,
        systemRole: user.systemRole,
        avatarUrl: user.avatarUrl,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ message: 'Server error during login. Please try again later.' });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, accessRole } = req.body;
    let { systemRole } = req.body;

    // Guard clause for required fields
    if (!name || !email || !password || !accessRole) {
        return res.status(400).json({ message: 'Missing required fields. Please provide name, email, password, and access role.' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'An account with this email already exists.' });
      return;
    }

    // Default systemRole to Admin for new owners if not specified
    if (accessRole === 'owner' && !systemRole) {
      systemRole = 'Admin';
    }
    
    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${name.replace(/\s/g, '+')}`;

    // Hash password explicitly before creating user to avoid middleware hangs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      accessRole,
      systemRole,
      avatarUrl,
    });

    if (user) {
      // If the user is a customer, create a corresponding customer entry
      if (user.accessRole === 'customer') {
        const customerExists = await Customer.findOne({ email });
        if (!customerExists) {
          await Customer.create({
            name,
            email,
            phone: '', // Phone is not collected at sign-up
            lastPurchaseDate: new Date(),
          });
        }
      }

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        accessRole: user.accessRole,
        systemRole: user.systemRole,
        avatarUrl: user.avatarUrl,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data provided.' });
    }
  } catch (error) {
    console.error('REGISTRATION ERROR:', error);
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(e => e.message).join('. ');
        return res.status(400).json({ message: `Registration failed: ${messages}` });
    }
    res.status(500).json({ message: 'Server error during registration. Please try again later.' });
  }
};

export { authUser, registerUser };