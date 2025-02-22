const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/skillhub";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  });

module.exports = mongoose;