const express = require('express'); // Ensure express is imported
const { addMessage, getMessages } = require("../controllers/messagesController");
const router = express.Router();

// Define the routes
router.post("/add-message", addMessage);
router.post("/get-message", getMessages);

module.exports = router;
