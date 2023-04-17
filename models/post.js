const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // products: [
    //     {
    //         name: { type: String, required: true },
    //         model: { type: String, required: true },
    //         price: { type: Number, required: true },
    //         rating: { type: Number, required: true},
    //         count: { type: Number, required: true },
    //         info: { type: String, required: true },
    //         img: { type: [String], required: true }
    //
    //
    //     }
    // ],
    name: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    count: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    info: { type: String, required: true },
    img: { type: [String], required: true },
    total: { type: Number, default: 0 },
    status: { type: String, default: 'pending' },
    date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Post',PostSchema);