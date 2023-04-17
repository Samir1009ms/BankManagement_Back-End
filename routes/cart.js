const express = require('express');
const {getCart,addCart,updateCart,deleteCart}= require('../controllers/cart.js')
const router = express.Router();

router.get('/getCart',getCart);
router.post('/addCart',addCart);
router.patch('/updateCart/:id',updateCart);
router.delete('/deleteCart/:id',deleteCart);

module.exports = router;
