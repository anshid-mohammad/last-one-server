// const express = require('express');
// const multer = require('multer');
// const dotenv = require('dotenv');
// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const crypto = require('crypto');
// const sharp = require('sharp');
// const Course = require('../models/teachersForm'); // Import your Mongoose Course model
// dotenv.config();

// const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const randomImageName = () => crypto.randomBytes(16).toString('hex');

// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
//   region: process.env.AWS_REGION,
//   maxRetries: 3, // Retry failed requests
//   requestHandler: {
//     httpOptions: {
//       timeout: 300000, // Set to 5 minutes (300,000 ms)
//     },
//   },
// });

// // Route to upload photo and create a course
// router.post('/add-course', upload.single('photo'), async (req, res) => {
//   const file = req.file;

//   if (!file) {
//     return res.status(400).json({ error: 'No photo file provided' });
//   }

//   try {
//     // Resize and upload the photo
//     const buffer = await sharp(file.buffer)
//     .resize({ height: 1080, width: 720, fit: 'contain' }) // Smaller dimensions
//     .jpeg({ quality: 70 }) // Lower quality for smaller file size
//     .toBuffer();
  

//     const uniqueFileName = `${Date.now()}_${randomImageName()}.jpeg`;

//     const params = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: uniqueFileName,
//       Body: buffer,
//       ContentType: file.mimetype,
//     };

//     const command = new PutObjectCommand(params);
//     await s3.send(command);

//     const photoUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

//     // Create the course document
//     const newCourse = new Course({
//       ...req.body, // Spread other form fields (e.g., courseName, description, etc.)
//       photo: photoUrl, // Save the uploaded photo URL
//     });

//     await newCourse.save();

//     res.status(201).json({
//       message: 'Course created successfully!',
//       course: newCourse,
//     });
//   } catch (error) {
//     console.error('Error uploading file or creating course:', error);
//     res.status(500).json({ error: 'Failed to create course', details: error });
//   }
// });

// module.exports = router;
