const express = require('express');
const {getPosts, getDetail, getUptade, deletePost, createPosts, searchPost} = require("../controllers/post");
const auth = require('../middleware/auth');
const router = express.Router();



router.get('/getPosts',getPosts);
router.get('/getDetail/:id',getDetail);
router.put('/getUptade/:id',getUptade);
router.delete('/deletePost/:id',auth,deletePost);
router.post('/createPosts',createPosts);
router.get('/search',searchPost);

module.exports = router;
