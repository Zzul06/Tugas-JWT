import cors from "cors";
import UserRoute from "../routes/UserRoute.js";
import AuthRoute from "../routes/AuthRoute.js";
import { syncUser } from "../models/index.js";
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

let salt = bcrypt.genSaltSync(10);
let pass = "password";
let hash = bcrypt.hashSync(pass, salt);

const app = express();
syncUser();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = 3000;

app.listen(port, () => {
    console.log(`password awal : ${pass}`);
    console.log(`hash password : ${hash}`);
    console.log(`Server listening on port ${port}`);
});