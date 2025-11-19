import express from 'express';
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customerController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getCustomers).post(protect, admin, createCustomer);
router.route('/:id').put(protect, admin, updateCustomer).delete(protect, admin, deleteCustomer);


export default router;