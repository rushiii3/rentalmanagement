const express = require("express");
const { sendChat, getChat, getchatting,test } = require("../Controller/ChatController");
const router = express.Router();
router.post('/send',sendChat);
router.get('/getChat/:id',getChat);
router.post('/getchat',getchatting);
router.get("/hee",test)
module.exports = router;