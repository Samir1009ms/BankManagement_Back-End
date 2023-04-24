const express   = require('express');
const router    = express.Router();

const {getBankCard,addBankCard,updateBankCard,deleteBankCard} = require('../controllers/bankcards.js');

router.get('/getBankCards/:userId',getBankCard);
router.post('/addBankCard/:userId',addBankCard);
// router.put('/updateBankCard/:userId',updateBankCard);
// router.delete('/deleteBankCard/:userId/delete/:bankCardId',deleteBankCard);

module.exports = router;