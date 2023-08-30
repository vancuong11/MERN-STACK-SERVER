import express from 'express';
import orderController from '../controllers/OrderController';
import { authMiddleware, authUserMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', authMiddleware, orderController.createOrder);
router.get('/get-all-order/:id', authUserMiddleware, orderController.getAllOrderDetails);
router.get('/get-details-order/:id', authUserMiddleware, orderController.getDetailsOrder);
router.delete('/cancel-order/:id', authUserMiddleware, orderController.cancelOrderDetails);

module.exports = router;
