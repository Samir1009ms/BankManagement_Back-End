const mongoose = require("mongoose");
const Transaction = require("../models/transfer");
const BankCard = require("../models/bankcards");

const moment = require("moment");


const transferMoney = async (req, res) => {
    try {
        const { senderCardNumber, receiverCardNumber, amount } = req.body;
        console.log(senderCardNumber, receiverCardNumber, amount)
        const senderCard = await BankCard.findOne({ "cards.cardNumber": senderCardNumber });
        const receiverCard = await BankCard.findOne({ "cards.cardNumber": receiverCardNumber });
        console.log(senderCard)
        if (!senderCard || !receiverCard) {
            return res.status(404).json({ message: "kart tapılmadı" });
        }

        for (let card of senderCard.cards) {
            console.log(card.cardNumber, senderCardNumber);
            if (card.cardNumber === senderCardNumber) {
                if (card.balance <= amount) {
                    return res.status(404).json({ message: "balansda kifayət qədər pul yoxdur" });
                } else {
                    card.balance -= amount
                    let currentDate = new Date();
                    currentDate=currentDate.toString()
                    // currentDate.toTimeString()

                    const outcomne = new Transaction({
                        type: "Outgoing",
                        amount: -amount,
                        date: currentDate,
                        cardNumber: receiverCardNumber,
                        userId: receiverCard.user.toString()
                    })
                    await outcomne.save();
                    console.log("s")
                    break;
                }
            } else {
                console.log("ss")
            }
        }
        await senderCard.save();

        for (let card of receiverCard.cards) {
            if (card.cardNumber === receiverCardNumber) {
                card.balance += amount;
                let currentDate = new Date();
                 currentDate=currentDate.toString()

                const incomne = new Transaction({
                    type: "Incoming",
                    amount: amount,
                    date: currentDate,
                    cardNumber: senderCardNumber,
                    userId: senderCard.user.toString()
                })
                await incomne.save();
            }
            console.log("ssss")
        }
        await receiverCard.save();

        // res.send(receiverCard)
        // res.send(senderCard)

        return res.status(200).json({
            message: "Transaction completed successfully",
            outcome: { amount: amount, cardNumber: senderCardNumber },
            income: { amount: amount, cardNumber: receiverCardNumber, userId: senderCard.user.toString() }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getTransactions = async (req, res) => {
    const {userId} = req.params;
    console.log(userId)
    try {
        // const transactions = await Transaction.find({ $or: [{ senderUserId: userId }, { receiverUserId: userId }] });
        // const transactions = await Transaction.find({ senderUserId: userId });
        const transactions = await Transaction.find({ userId: userId });
        if (!transactions) {
            return res.status(404).json({ message: "Transactions tapılmadı" });
        }
        res.send(transactions);
        // const transaction = await Transaction.find(req.body);
        console.log(transactions);
        res.status(200).json({ message: "Transactions found", transactions: transactions });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// const filterTransactions = async (req, res) => {
//
//
//
// }


module.exports = {  transferMoney, getTransactions }
