const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).send({
            results: users.length,
            users
        });
    } catch (err) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!user) {
            return res.status(404).send({
                msg: 'User not found'
            });
        }
        res.status(200).send({
            user
        });
    } catch (err) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = await prisma.user.create({
            data: req.body
        });
        res.status(201).send({
            user: newUser
        });
    } catch (err) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

// Update user by ID
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        });
        res.status(200).send({
            user: updatedUser
        });
    } catch (err) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
    try {
        await prisma.user.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(204).send({
            msg : "data has been deleted"
        });
    } catch (err) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
};