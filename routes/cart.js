const express = require('express');
const {getCart,addCart,updateCart,deleteCart}= require('../controllers/cart.js')
const router = express.Router();

router.get('/getCart/:id',getCart);
router.post('/addCart/:id/products/:id',addCart);
router.put('/updateCart/:userId/update/:productId',updateCart);
router.delete('/deleteCart/:userId/delete/:productId',deleteCart);

module.exports = router;
