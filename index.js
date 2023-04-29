require("express-async-errors");
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/database.js');
const dotenv = require('dotenv');
const Auth = require('./routes/auth.js');
const Post = require('./routes/post.js');
const Cart = require('./routes/cart.js');
const BankCard = require('./routes/bankcards.js');
const Transfer = require('./routes/transfer.js');
const ProFile = require('./routes/profile.js');
const {request} = require("express");
const bodyParser = require("body-parser");

const auth = require('./middleware/auth.js');



dotenv.config();

// * cors
app.use(cors());



  
// * json
app.use(express.json());


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
app.use('/api', ProFile);
app.use('/api',BankCard)
app.use('/api',Transfer)


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