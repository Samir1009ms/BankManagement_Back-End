const moongoose = require("mongoose");

const BankCardSchema = new moongoose.Schema(
  {
    user: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    cards: [
      {
        cardNumber: { type: String, required: true, trim: true },
        cardName: { type: String, required: true, trim: true },
        cardDate: { type: String, required: true, trim: true },
        cardCvv: { type: String, required: true, trim: true },
        cardType: { type: String, required: true, trim: true },
        balance: { type: Number, default: 10000, trim: true },
        blocked: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const BankCard = moongoose.model("BankCard", BankCardSchema);

module.exports = BankCard;
