import express from 'express';
import {
    login,
    register,
    logout
} from '../controllers/AuthController.js';
import jwtMiddleware from '../middlewares/jwtMiddlewares.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.delete('/logout', jwtMiddleware, logout);

export default router;