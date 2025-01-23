import express from "express";
import{
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js";
import jwtMiddleware from "../middlewares/jwtMiddlewares.js";

const router = express.Router();

router.get('/users', jwtMiddleware, getUsers);
router.get('/users/:id', jwtMiddleware, getUserById);
router.post('/users', jwtMiddleware, createUser);
router.patch('/users/:id', jwtMiddleware, updateUser);
router.delete('/users/:id', jwtMiddleware, deleteUser);

export default router;