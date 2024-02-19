const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const Chat = require("../Models/ChatModel");

const sendChat = asyncHandler(async (req, res, next) => {
  try {
    const { sender, reciver, message, sendtime } = req.body;

    if (!sender || !reciver || !message) {
      res
        .status(400)
        .json({ error: "Sender, receiver, and message are required" });
      return;
    }

    const newChatMessage = await Chat.create({
      sender,
      reciver,
      message,
      sendtime,
    });

    res.status(201).json(newChatMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getChat = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params; // Assuming the sender's ID is provided in the URL params


    // Retrieve distinct sender IDs
    const distinctSenderIds = await Chat.find({ sender: id }).distinct(
      "reciver"
    );
    const distinctReceiverIds = await Chat.find({
      $or: [{ reciver: id }],
    }).distinct("sender");
    // Combine and deduplicate sender and receiver IDs
    const distinctChatUserIds = [
      ...new Set([...distinctSenderIds, ...distinctReceiverIds]),
    ];
    const users = await User.find(
      { _id: { $in: distinctChatUserIds } },
      "firstname lastname  avatar"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getchatting = asyncHandler(async (req, res, next) => {
  try {
    const { sender_id, reviver_id } = req.body;
    const sender = await Chat.find({ sender: sender_id, reciver: reviver_id });
    const reciver = await Chat.find({ sender: reviver_id, reciver: sender_id });
    const chatHistory = sender.concat(reciver);
    chatHistory.sort((a, b) => a.timestamp - b.timestamp);
    res.status(200).json({ msg: true, data: chatHistory });
  } catch (error) {}
});

const test = asyncHandler(async (req, res, next) => {
  res.status(200).json({ msg: true });
});
module.exports = {
  sendChat,
  getChat,
  getchatting,
  test,
};
