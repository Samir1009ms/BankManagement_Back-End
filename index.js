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
const bodyParser = require("body-parser");



dotenv.config();

// * cors
app.use(cors());

app.use((req, res, next) => {
    const origin = req.get("referer");
    const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
    if (isWhitelisted) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,Content-Type,Authorization"
      );
      res.setHeader("Access-Control-Allow-Credentials", true);
    }
    // Pass to next layer of middleware
    if (req.method === "OPTIONS") res.sendStatus(200);
    else next();
  });

  const setContext = (req, res, next) => {
    if (!req.context) req.context = {};
    next();
  };
  
app.use(setContext);


  
// * json
app.use(express.json());

const whitelist = ["*"]

// * urlencoded
app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({limit: '50mb', extended: true,parameterLimit:50000}));

app.use(bodyParser.json())
// * login register post get
app.use('/api', Auth);

// * get post patch delete 
app.use('/api', Post);

// * get post patch delete
app.use('/api', Cart);


app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to my application.' })
});

// Portumuz
const PORT = process.env.PORT || 5501;

db();


// back end prtda basdamasi ucun

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports=app