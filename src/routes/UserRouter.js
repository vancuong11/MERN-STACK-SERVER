import express from 'express';
import userController from '../controllers/UserController';

const router = express.Router();

router.post('/', userController.createUser);

module.exports = router;
