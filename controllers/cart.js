const Cart = require('../models/cart.js');
const Auth = require('../models/auth.js');


const mongoose = require('mongoose');






const addCart = async (req, res) => {
    try {
        const cart = req.body;
        const userId = req.user._id; // İstek yapan kullanıcının id'sini alıyoruz
        const newCart = new Cart({ ...cart, userId }); // Cart objesine userId'yi de ekliyoruz
        await newCart.save();
        console.log(userId)

        res.status(201).json(newCart);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


// const  addCart =  async ( req, res ) => {
//  try {
//         /
//      const cart = new Cart({
//          user: req.user.userId,
//          products: req.body.products.map(product => ({
//              productId: mongoose.Types.ObjectId(product.productId),
//              quantity: product.quantity
//          }))
//      });
//      const createdCart = await cart.save();
//      res.status(201).json({
//          message: 'Cart created successfully',
//          cart: {
//              id: createdCart._id,
//              products: createdCart.products,
//              user: createdCart.user
//          }
//      });
//     }
//     catch (error) {
//         res.status(409).json({ message: error.message });
//     }
//
// }

const  getCart =  async ( req, res ) => {
    try {
        const cart = await Cart.find();
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


const  updateCart =  async ( req, res ) => {
    const { id: _id } = req.params;
    const cart = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    const updatedCart = await Cart.findByIdAndUpdate(_id, cart, { new: true });
    res.json(updatedCart);
}

const  deleteCart =  async ( req, res ) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    await Cart.findByIdAndRemove(id);
    res.json({ message: 'Cart deleted successfully' });
}

module.exports = { getCart, addCart, updateCart, deleteCart };  // export edirik ki, diger fayllarda istifade ede bilek


