const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
 
    name: { type: String, required: true },
    address: { type: String,default: '' },
    photo:{ type:String,default: ''},
    phoneNumber:{type:String,default: '' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    bio: {
      type: String,
      default: '',
    },
    nation: {
      type: String,
      default: '',
    },
    dob: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      default: '',
    },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Stores mentor's ID

    role: { type: String, enum: ["admin", "learner","teacher"], default: "learner" },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("User", userSchema);



