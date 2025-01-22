const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/userRoute.js');
const authRoutes = require('./routes/authRoute.js');
require('dotenv').config();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at ${port}`);
});