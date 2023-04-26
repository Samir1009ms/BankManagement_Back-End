const  express = require('express');
const router = express.Router();
const {getTransfer,addTransfer,updateTransfer,transferMoney,getTransactions} = require('../controllers/transfer.js')

// router.get('/',getTransfer);
router.get('/getTransactions/:userId',getTransactions);
router.post('/transferMoney',transferMoney);
// router.put('/updateTransfer/:userId',updateTransfer);
// router.delete('/deleteTransfer/:userId/delete/:transferId',deleteTransfer);

module.exports = router;