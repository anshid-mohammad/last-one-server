const messageModel = require("../models/messageModel");

const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    if (!from || !to || !message) {
      return res.status(400).json({ msg: "Missing required fields: from, to, or message." });
    }

    const data = await messageModel.create({
      message,
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.status(200).json({ msg: "Message added successfully" });
    }
    return res.status(500).json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    if (!from || !to) {
      return res.status(400).json({ msg: "Both 'from' and 'to' fields are required." });
    }

    const messages = await messageModel
      .find({
        users: { $all: [from, to] },
      })
      .sort({ createdAt: 1 }); // Sort by timestamp in ascending order

    const projectMessages = messages.map((msg) => ({
      fromSelf: msg.sender.toString() === from,
      message: msg.message,
      timestamp: msg.createdAt, // Use createdAt as timestamp
    }));

    return res.status(200).json(projectMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports = { addMessage, getMessages };
