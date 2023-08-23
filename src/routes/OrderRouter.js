import express from 'express';
import orderController from '../controllers/OrderController';
import { authMiddleware, authUserMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', authMiddleware, orderController.createOrder);
router.get('/get-order-details/:id', authUserMiddleware, orderController.getOrderDetails);

module.exports = router;
