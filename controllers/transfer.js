const mongoose = require("mongoose");
const Transaction = require("../models/transfer");
const BankCard = require("../models/bankcards");
const  Notification = require("../models/notifications");
const moment = require("moment");
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*' // İstekleri herhangi bir kök URL'den kabul et
    }
});

// Bildirim gönderme işlemi
// const sendNotification = (amount, senderCardNumber, receiverCardNumber) => {
//     const message = `Yeni bir para transferi gerçekleşti!\nMiktar: ${amount}\nGönderen Kart: ${senderCardNumber}\nAlıcı Kart: ${receiverCardNumber}`;
//     io.emit('notification', message); // Tüm soketlere bildirimi gönder
//
//
//     console.log(message)
// };

const sendNotification = (amount, senderCardNumber, receiverCardNumber,userId) => {
    const notificationMessage = `Hesabınıza ${amount} miqdarda pul koxdu. Alıcı kart numarası: ${receiverCardNumber}.`;
    const notification = new Notification({
        message: notificationMessage,
        isRead: false,
        sender: userId
    });

    io.emit('notification', notification); // Tüm soketlere bildirimi gönder

    try {
        const savedNotification =  notification.save();
        console.log("Bildirim başarıyla kaydedildi:", savedNotification);
    } catch (error) {
        console.error("Bildirim kaydedilirken bir hata oluştu:", error);
    }
};

// Soket bağlantısı

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
                sendNotification(amount, senderCardNumber, receiverCardNumber, senderCard.user.toString());

                await incomne.save();
                // Para transferi gerçekleştiğinde bildirim gönderme
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
        // io.emit('transactions', transactions);

        io.on("connection", (socket) => {
            console.log("User connected: ", socket.id);

            socket.join(userId);

            socket.on("disconnect", () => {
                console.log("User disconnected: ", socket.id);
            });
        });
        io.to(userId).emit("transactions", transactions);

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

const getUserNotifications = async (req, res) => {
    try {
        const {userId} = req.params; // Kullanıcının kimliğini alın (örneğin, oturum açmış bir kullanıcı olarak varsayıyoruz)

        const notifications = await Notification.find({ sender: userId });
        if (!notifications) {
            return res.status(404).json({ message: "Bildirimler tapılmadı" });
        }

        res.send(notifications);
        res.status(200).json({ notifications:"ss" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

io.on('connection', (socket) => {
    // console.log('Yeni bir istemci bağlandı.');
    console.log("User connected: ", socket.id);
    // socket.join(userId);

    // Soket bağlantısı kapatıldığında
    socket.on('disconnect', () => {
        console.log('Bir istemci ayrıldı.');
    });

    // Bildirim gönderme işlemi

});
server.listen(3003, () => {
    console.log('Sunucu çalışıyor. Port: 3000');
});

module.exports = {  transferMoney, getTransactions, getUserNotifications }
