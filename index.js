require("express-async-errors");
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/database.js');
const dotenv = require('dotenv');
const Auth = require('./routes/auth.js');
const Post = require('./routes/post.js');
const Cart = require('./routes/cart.js');
const {request} = require("express");


dotenv.config();

// * cors
app.use(cors());

// * json
app.use(express.json());

const whitelist = ["*"]

// * urlencoded
app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({limit: '50mb', extended: true,parameterLimit:50000}));

// * login register post get
app.use('/api', Auth);

// * get post patch delete 
app.use('/api', Post);

// * get post patch delete
app.use('/api', Cart);


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my application.' })
});

// Portumuz
const PORT = process.env.PORT || 5501;

db();


// back end prtda basdamasi ucun

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});