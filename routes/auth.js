const express = require('express');
const {login, register, user} = require("../controllers/auth.js");

const router = express.Router();

router.post('/login',login)
router.post('/register',register)
router.get("/user",user)


module.exports = router;