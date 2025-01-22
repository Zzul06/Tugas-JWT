const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ message: 'Please provide all fields' });

    try {
        const userExist = await prisma.user.findFirst({
            where : {
                email : email
            }
        });

        if (!userExist) return res.status(400).json({ message: 'USER NA EWEH ANJAY' });

        const isMatch = await bcrypt.compare(password, userExist.password);

        console.log(isMatch);
        
        if (!isMatch) return res.status(400).json({ message: 'PASSWORD NA BEDA ANJAY' });

        const jwtPayload = {
            id: userExist.id,
            username: userExist.username,
            email: userExist.email
        };

        console.log(jwtPayload);

        const token = jwt.sign(jwtPayload, process.env.SECRET_JWT, { expiresIn: '1h' });

        return res.status(200).send({ message: "anda berhasil login", token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server error' });
    }
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) return res.status(400).send({ message: 'Please provide all fields' });

    try {
        const userExist = await prisma.user.findFirst({
            where : {
                OR :[
                    { username : username },
                    { email : email }
                ]
            }
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (userExist) return res.status(400).json({ message: 'USER SUDAH ADA' });

        const createUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        if (!createUser) return res.status(400).json({ message: 'GAGAL REGISTER' });

        return res.status(200).send({ message : "anda berhasil register" });
    } catch (error) {
        return res.status(500).send({ message : "Internal Server Error" });
    }
} 