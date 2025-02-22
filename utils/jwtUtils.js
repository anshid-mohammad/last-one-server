const {secretKey} =require("../configration/jwtConfig")
const jwt = require("jsonwebtoken");

// Function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: '12h' });
};

// Function to verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
