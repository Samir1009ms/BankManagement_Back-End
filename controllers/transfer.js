const mongoose = require("mongoose");
const Transaction = require("../models/transfer");
const BankCard = require("../models/bankcards");

const moment = require("moment");

// const getTransactions = async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const transactions = await Transaction.find({ senderUserId: userId, receiverUserId: userId });
//         if (!transactions) {
//         return res.status(404).json({ message: "Transactions not found" });
//         }
//
//         res.send(transactions);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }


// const transferMoney = async (req,res) => {
//     try {
//         const {senderCardNumber, receiverCardNumber, amount} = req.body;
//         // Para gönderen ve alan kartları bulun
//         const senderCard = await BankCard.findOne({ "cards.cardNumber": senderCardNumber });
//         const receiverCard = await BankCard.findOne({ "cards.cardNumber": receiverCardNumber });
//         // const senderUserId = senderCard.user.toString();
//         // const receiverUserId = receiverCard.user.toString();
//         if (!senderCard || !receiverCard) {
//             return res.status(404).json({ message: "One of the cards not found" });
//         }
//
//         // Para gönderen hesabından belirlenen miktarda para çekin (outcomne)
//         let outcomne = 0;
//         senderCard.cards.forEach(card => {
//             if (card.cardNumber === senderCardNumber) {
//                 card.balance -= amount;
//                 outcomne = -amount;
//                 console.log("s")
//             }
//         });
//         await senderCard.save();
//
//         // Para alıcının hesabına belirlenen miktarda para yatırın (incomne)
//         let incomne = 0;
//         receiverCard.cards.forEach(card => {
//             if (card.cardNumber === receiverCardNumber) {
//                 card.balance += amount;
//                 incomne = amount;
//             }
//         });
//         await receiverCard.save();
//
//         // İşlemle ilgili Transaction belgesini oluşturun ve veritabanına kaydedin
//         const transaction = new Transaction({
//             senderUserId: senderCard.user.toString(),
//             receiverUserId: receiverCard.user.toString(),
//             senderCardNumber: senderCardNumber,
//             receiverCardNumber: receiverCardNumber,
//             amount: amount,
//             incomne: incomne,
//             outcomne: outcomne,
//             date: Date.now()
//         });
//         await transaction.save();
//
//         return res.status(200).json({
//             message: "Transaction completed successfully",
//             incomne: incomne,
//             outcomne: outcomne,
//             transaction: transaction
//         });
//
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }


// const transferMoney = async (req, res) => {
//     try {
//         const { senderCardNumber, receiverCardNumber, amount } = req.body;
//         console.log(senderCardNumber, receiverCardNumber, amount)
//         const senderCard = await BankCard.findOne({ "cards.cardNumber": senderCardNumber });
//         const receiverCard = await BankCard.findOne({ "cards.cardNumber": receiverCardNumber });
//         console.log(senderCard)
//         if (!senderCard || !receiverCard) {
//             return res.status(404).json({ message: "One of the cards not found" });
//         }
//
//         senderCard.cards.forEach((card) => {
//             console.log(card.cardNumber,  (senderCardNumber));
//             if (card.cardNumber === senderCardNumber) {
//                 if(card.balance <= amount){
//                    return res.status(404).json({ message: "Insufficient funds" });
//                 }else{
//                     card.balance -= amount
//                     const  outcomne =  new Transaction ({
//                         type: "Outgoing",
//                         amount: -amount,
//                         date: Date.now(),
//                         cardNumber: receiverCardNumber,
//                         userId: receiverCard.user.toString()
//                     })
//                     outcomne.save();
//                     console.log("s")
//                 }
//             }else{
//                 console.log("ss")
//             }
//         });
//         await senderCard.save();
//
//         receiverCard.cards.forEach((card) => {
//             if (card.cardNumber === receiverCardNumber) {
//                 card.balance += amount;
//                const incomne= new Transaction ({
//                     type: "Incoming",
//                     amount: amount,
//                     date: Date.now(),
//                     cardNumber: senderCardNumber,
//                     userId: senderCard.user.toString()
//                 })
//                 incomne.save();
//
//             }
//             console.log("ssss")
//         });
//         await receiverCard.save();
//
//         // res.send(receiverCard)
//         // res.send(senderCard)
//
//         return res.status(200).json({
//             message: "Transaction completed successfully",
//             outcome: { amount: amount, cardNumber: senderCardNumber },
//             income: { amount: amount, cardNumber: receiverCardNumber, userId: senderCard.user.toString() }
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const transferMoney = async (req, res) => {
    try {
        const { senderCardNumber, receiverCardNumber, amount } = req.body;
        console.log(senderCardNumber, receiverCardNumber, amount)
        const senderCard = await BankCard.findOne({ "cards.cardNumber": senderCardNumber });
        const receiverCard = await BankCard.findOne({ "cards.cardNumber": receiverCardNumber });
        console.log(senderCard)
        if (!senderCard || !receiverCard) {
            return res.status(404).json({ message: "One of the cards not found" });
        }

        for (let card of senderCard.cards) {
            console.log(card.cardNumber, senderCardNumber);
            if (card.cardNumber === senderCardNumber) {
                if (card.balance <= amount) {
                    return res.status(404).json({ message: "Insufficient funds" });
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
            return res.status(404).json({ message: "Transactions not found" });
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



module.exports = {  transferMoney, getTransactions }
