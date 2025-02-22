const User = require("../models/user");
const bcrypt = require("bcrypt");

async function adminAccount() {
  try {
    // Check if the admin already exists with the correct email
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

    if (!existingAdmin) {
      // Create new admin account with a hashed password
      const newAdmin = new User({
        email: "admin@gmail.com",
        name: "admin",
        password: await bcrypt.hash("12345678", 10), // Ideally, use environment variables or a stronger password.
        role: "admin",
      });

      await newAdmin.save();
      console.log("Admin account created successfully.");
    } else {
      console.log("Admin account already exists.");
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
}

module.exports = adminAccount;
