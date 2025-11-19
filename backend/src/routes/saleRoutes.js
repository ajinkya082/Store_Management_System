import express from 'express';
import { getSales, createSale, getMyOrders } from '../controllers/saleController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getSales).post(protect, admin, createSale);
router.route('/myorders').get(protect, getMyOrders);

export default router;