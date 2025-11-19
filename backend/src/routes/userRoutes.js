
import express from 'express';
import { getSystemUsers, deleteUser, updateUserProfile } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/').get(protect, admin, getSystemUsers);
router.route('/profile').put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser);


export default router;