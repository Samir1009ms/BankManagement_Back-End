const express = require('express');
const {login, register, user,token} = require("../controllers/auth.js");
const auth = require('../middleware/auth');

const router = express.Router();

router.get("/isLoggedIn",auth)

router.post('/login',login)

router.post('/register',register)

router.get("/user",user)

router.get('/token',auth,token)



module.exports = router;