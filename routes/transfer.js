const  express = require('express');
const router = express.Router();
const {getTransfer,addTransfer,updateTransfer,transferMoney,getTransactions,getUserNotifications,deleteNotification,getTransactionsByCardNumber} = require('../controllers/transfer.js')

// router.get('/',getTransfer);
router.get('/getTransactions/:userId',getTransactions);
router.post('/transferMoney',transferMoney);

router.get('/getTransactionsDetails/:userId',getTransactionsByCardNumber);
// router.put('/updateTransfer/:userId',updateTransfer);
// router.delete('/deleteTransfer/:userId/delete/:transferId',deleteTransfer);

router.get('/notifications/:userId',getUserNotifications);
router.delete('/notifications/delete/:notificationId',deleteNotification);

module.exports = router;