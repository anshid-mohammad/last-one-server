const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'], // Optional: predefined levels
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
    trim: true,
  },
  teacherContact: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v); // Validates 10-digit phone numbers
      },
      message: 'Please enter a valid contact number',
    },
  },
  institutionName: {
    type: String,
    required: true,
    trim: true,
  },
  institutionAddress: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  courseDuration: {
    type: String, // Example: '3 months', '6 weeks'
  },
  schedule: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return v > this.startDate;
      },
      message: 'End date must be after start date',
    },
  },
  frequency: {
    type: String, // Example: 'Weekly', 'Daily'
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: String,
    trim: true, // Example: '10% off for early birds'
  },
  status: {
    type: String,
    enum: ["pending", "under-review", "approved", "rejected", "completed"],
    default: "pending",
  },
  teacherId: {
    type: String, // Refers to the ObjectId of the user in your users collection
    required: true,
  },
  studentId: {
    type: String, // Refers to the ObjectId of the user in your users collection
  },
  lessons: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
      },
    
    },
  ],
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Course', courseSchema);
