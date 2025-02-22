const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "Message text is required."],
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: [true, "At least two users are required for a message."],
      },
    ],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: [true, "Sender ID is required."],
    },
  },
  {
    timestamps: true,
  }
);

// Indexing for faster lookups
messageSchema.index({ users: 1 });
messageSchema.index({ sender: 1 });

module.exports = mongoose.model('Message', messageSchema);
