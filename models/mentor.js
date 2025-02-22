const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phoneNumber: { type: String, required: true, match: /^[0-9]{10,15}$/ },
    password: { type: String },
    role: { type: String, enum: ["admin", "mentor"], default: "mentor" },
    bio: { type: String, default: '', trim: true },
    nation: { type: String, default: '', trim: true },
    dob: { type: Date }, // Changed from String to Date
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    address: { type: String, default: '', trim: true },
    photo: { type: String, default: '' },
    workExperience: { type: String, default: 0 }, // Changed from String to Number

    skills: { type: [String], default: [] }, // Changed from String to Array
    certifications  : { type: [String], default: [] }, // Changed from String to Array
    hobbies: { type: [String], default: [] }, // Changed from String to Array
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Stores mentor's ID

  },
  { timestamps: true } 
);

module.exports = mongoose.model("Mentor", mentorSchema);
