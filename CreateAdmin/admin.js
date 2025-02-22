const bcrypt = require("bcrypt");
const User = require("../models/user");

async function createAdmin() {
  try {
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (!existingAdmin) {
      const newAdmin = new User({
        email: "admin@gmail.com",
        name: "admin",
        password: await bcrypt.hash("12345678", 10),
        role: "admin",
      });

      await newAdmin.save(); // Correct save method
      console.log("Admin created successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.log("Error:", error.message); // Proper error logging
  }
}

module.exports = createAdmin;
