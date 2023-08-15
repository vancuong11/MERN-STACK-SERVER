import express from 'express';
import ProductController from '../controllers/ProductController';
import { authMiddleware, authUserMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', ProductController.createProduct);
router.put('/update/:id', authMiddleware, ProductController.updateProduct);
router.get('/get-details/:id', ProductController.getDetailsProduct);
router.delete('/delete/:id', authMiddleware, ProductController.deleteProduct);
router.post('/delete-many', authMiddleware, ProductController.deleteManyProduct);
router.get('/get-all', ProductController.getAllProduct);

module.exports = router;
