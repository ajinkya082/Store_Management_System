import express from 'express';
import productRoutes from './productRoutes.js';
import customerRoutes from './customerRoutes.js';
import saleRoutes from './saleRoutes.js';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/products', productRoutes);
router.use('/customers', customerRoutes);
router.use('/sales', saleRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;