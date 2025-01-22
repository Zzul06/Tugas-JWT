import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import  User  from "../models/userModel.js";

export const login = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all required fields" });
    }

        try {
            const userExist = await User.findOne({
                where: {
                    email: email
                }
            });

            console.log(userExist);

            if (!userExist) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
    
            const isMatch = await bcrypt.compare(password, userExist.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
    
            const jwtPayload = { id: userExist.id, username: userExist.username };
            const token = jwt.sign(jwtPayload, process.env.SECRET_JWT, { expiresIn: '1h' });
    
            return res.status(200).send({ messageq: "Login successful", token: token });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    };

    export const register = async (req, res) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        try {
            const userExist = await User.findOne({
                where: {
                    email: email
                }
            });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            if (userExist) {
                return res.status(400).json({ message: "User already exists" });
            }

            const newUser = await User.create({
                username,
                email,
                password : hashedPassword
            });

            return res.status(201).json({ message: "User registered successfully", user: newUser });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    };
