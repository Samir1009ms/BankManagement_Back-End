const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema({
//   senderUserId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Auth"
//
//   },
//   receiverUserId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Auth"
//
//   },
//   senderCardNumber: {
//     type: String,
//     required: true,
//   },
//   receiverCardNumber: {
//     type: String,
//     required: true,
//   },
//   balans: {
//     type: Number,
//   default: 0},
//   incomne: {
//     type: Number,
//     default: 0,
//   },
//   outcomne: {
//     type: Number,
//     default: 0,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["Incoming", "Outgoing"] },
  amount: { type: Number, required: true },
  date: { type: Date},
  cardNumber: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},{
  timestamps: true
});

// transactionSchema.methods.getLocalDate = function() {
//   const date = new Date(this.date);
//   const offset = date.getTimezoneOffset();
//   date.setMinutes(date.getMinutes() - offset);
//   return date;
// };


module.exports = mongoose.model("Transaction", transactionSchema);
