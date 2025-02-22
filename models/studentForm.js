const { string } = require('joi');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    qualification: { type: String, required: true },
    fatherName: { type: String, required: true },
    parentPhone: { type: String, required: true },
    photo: { type: String },
    identityProof: { type: String },
    teacherId: { type:String,  required: true },
    studentId: { type: String,  required: true },
    courseId:{ type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "under-review", "approved", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
