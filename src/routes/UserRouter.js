import express from 'express';
import userController from '../controllers/UserController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/get-all-user', authMiddleware, userController.getAllUser);
router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/get-details/:id', userController.getDetailsUser);

module.exports = router;
