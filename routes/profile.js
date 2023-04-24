const  express = require('express');
const {getProfile,addProfile,updateProfile,deleteProfile}= require('../controllers/profile.js')
const router = express.Router();

router.get('/getProfile/:userId',getProfile);
router.post('/addProfile/:userId',addProfile);
router.put('/updateProfile/:userId',updateProfile);
// router.delete('/deleteProfile/:userId/delete/:profileId',deleteProfile);

module.exports = router;
