import express from 'express';
import userController from '../controllers/UserController';
import { authMiddleware, authUserMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/get-all', authMiddleware, userController.getAllUser);
router.post('/sign-up', userController.createUser);
router.post('/log-out', userController.logoutUser);
router.post('/sign-in', userController.loginUser);
router.put('/update-user/:id', authUserMiddleware, userController.updateUser);
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.delete('/delete-many-user', authMiddleware, userController.deleteManyUser);

router.get('/get-details/:id', authUserMiddleware, userController.getDetailsUser);
router.post('/refresh-token', userController.refreshToken);

module.exports = router;
