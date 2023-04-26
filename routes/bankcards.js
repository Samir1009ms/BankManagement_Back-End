const express   = require('express');
const router    = express.Router();

const {getBankCard,addBankCard,updateBankCard,deleteBankCard,getCard} = require('../controllers/bankcards.js');

router.get('/getBankCards/:userId',getBankCard);
router.get('/getBankCard/',getCard);
router.post('/addBankCard/:userId',addBankCard);
router.put('/updateBankCard/:userId/cars/:cardId',updateBankCard);
// router.delete('/deleteBankCard/:userId/delete/:bankCardId',deleteBankCard);

module.exports = router;