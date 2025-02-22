const crypto = require("crypto");
require('dotenv').config(); // Load environment variables

// Check if JWT secret key exists in the environment variables, if not generate a new one
const secretKey = process.env.JWT_SECRET_KEY || crypto.randomBytes(32).toString("hex");

module.exports = {
    secretKey: secretKey
};
