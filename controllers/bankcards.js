const BankCard = require("../models/bankcards");

// const {getBankCard,addBankCard,updateBankCard,deleteBankCard}= require('../controllers/bankcards.js')

const getBankCard = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bankCard = await BankCard.findOne({ user: userId });
    if (!bankCard) {
      return res.status(404).json({ message: "Bank card not found" });
    }

    res.send(bankCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBankCard = async (req, res) => {
  const userId = req.params.userId;
  const { cardNumber, cardName, cardDate, cardCvv, cardType } = req.body;
  let bankCard = await BankCard.findOne({ user: userId });
  if (!bankCard) {
    // bankCard = new BankCard({ user:userId, cards: [] })
    bankCard = new BankCard({
      user: userId,
      cards: [{ cardNumber, cardName, cardDate, cardCvv, cardType }],
    });
    // await bankCard.save()
  } else {
    bankCard.cards.push({ cardNumber, cardName, cardDate, cardCvv, cardType });
  }

  await bankCard.save();
  res.send(bankCard);

  res.status(200).json({ message: "Bank card added" });
};

module.exports = { getBankCard, addBankCard };
