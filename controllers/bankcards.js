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

// const  getCard = async (req, res) => {
//     try {
//
//         const {cardNumber} = req.query;
//
//         const card = BankCard.cards.find((card)=>card.cardNumber.toString()===cardNumber.toString())
//
//
//
//         // res.send(card);
//         console.log(card)
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

const getCard = async (req, res) => {
    try {
        const { cardNumber } = req.body;
        console.log(cardNumber)
        const bankCard = await BankCard.findOne({ "cards.cardNumber": cardNumber });
        console.log(bankCard.user.toString())
        if (!bankCard) {
        return res.status(404).json({ message: "Bank card not found" });
        }
        const card = bankCard.cards.find(card => card.cardNumber === cardNumber);
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        // res.send(bankCard);
        // console.log(bankCard)
        console.log(card)
        res.status(200).json({ message: "Card found", card})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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


const updateBankCard = async (req, res) => {
    try {
        const { userId } = req.params;
        const {cardId} = req.params;
        const { cardNumber, cardName, cardDate, cardCvv, cardType } = req.body;

        const bankCard = await BankCard.findOne({ user: userId });
        if (!bankCard) {
            return res.status(404).json({ message: "Bank card not found" });
        }

       const cardIndex= bankCard.cards.findIndex((card)=>card._id.toString()===cardId.toString())

        bankCard.cards[cardIndex]= {cardNumber, cardName, cardDate, cardCvv, cardType}

        console.log(bankCard.cards[cardIndex])
          await bankCard.save()
        // console.log(updatedBankCard);
        res.status(200).json({ message: "Bank card updated", bankCard });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { getBankCard, addBankCard, updateBankCard ,getCard};
