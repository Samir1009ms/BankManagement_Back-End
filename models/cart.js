const mongoose = require('mongoose');
const Post = require('./post');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }],
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
