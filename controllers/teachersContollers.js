
const CourseDetails=require("../models/teachersForm")
const Course = require('../models/teachersForm'); // Import your Mongoose Course model
// AWS Configuration
const { s3, upload, randomFileName, sharp } = require('../utils/s3Clinet');


const addCourseDetails = async (req, res) => {
  try {
    // ✅ Log uploaded file to debug
    console.log("Uploaded File:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: 'No photo file provided' });
    }

    // ✅ Resize and optimize the image using Sharp
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 1080, width: 720, fit: 'contain' })
      .jpeg({ quality: 70 })
      .toBuffer();

    // ✅ Generate a unique file name
    const uniqueFileName = `${Date.now()}_${randomFileName()}_${req.file.originalname}`;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: uniqueFileName,
      Body: buffer,
      ContentType: req.file.mimetype,
    };

    // ✅ Upload file to S3
    const uploadResponse = await s3.upload(params).promise();
    console.log("S3 Upload Response:", uploadResponse);

    // ✅ Construct the image URL
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

    // ✅ Parse lessons array if provided
    const lessons = req.body.lessons ? JSON.parse(req.body.lessons) : [];
    const teacherId = req.body.teacherId;

    // ✅ Create a new course entry in MongoDB
    const newCourse = new Course({
      ...req.body,
      photo: imageUrl,
      lessons,
      teacherId,
    });

    await newCourse.save();

    res.status(201).json({ message: 'Course created successfully!', course: newCourse });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Failed to add course', error: error.message });
  }
};



const getCourseData = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      message: 'Error fetching courses',
      error: error.message,
    });
  }
};

// Controller to get a single course by ID
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      message: 'Error fetching course',
      error: error.message,
    });
  }
};

// Controller to update a course
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.photo = req.file.filename; // Update the photo if provided
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({
      message: 'Course updated successfully',
      course: updatedCourse,
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({
      message: 'Error updating course',
      error: error.message,
    });
  }
};

// Controller to delete a course
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      message: 'Error deleting course',
      error: error.message,
    });
  }
};
const updatePriceAndEnroll = async (req, res) => {
  try {
    const { courseId, price } = req.body; // Ensure price is received

    if (!courseId || price === undefined) {
      return res.status(400).json({ message: 'Course ID and price are required' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { price }, // Corrected update syntax
      { new: true } // Move new: true to the correct argument
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course: updatedCourse,
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message,
    });
  }
};


// Enroll a user in a course
const enrollCourse = async (req, res) => {
  const { courseId, userId } = req.body;

  try {
    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Check if the user is already enrolled
    if (course.studentId === userId) {
      return res.status(400).json({ success: false, message: 'User already enrolled' });
    }

    // Update the course with the student's ID
    course.studentId = userId;
    await course.save();

    res.status(200).json({ success: true, message: 'Enrollment successful', course });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ success: false, message: 'Failed to enroll in course', error: error.message });
  }
};





module.exports = {
  addCourseDetails,
  getCourseData,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollCourse,
  updatePriceAndEnroll
};