// const AWS = require('aws-sdk');
// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const crypto = require('crypto');
// const mongoose = require('mongoose');
// const Course = require('../models/teachersForm'); // Import your Mongoose Course model
// const sharp = require('sharp');




// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const s3 = new AWS.S3();
// const upload = multer({ storage: multer.memoryStorage() });


// const randomFileName = () => crypto.randomBytes(32).toString('hex');



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
  

//     const uniqueFileName = `${Date.now()}_${randomFileName()}_${file.originalname}`;  // Use this name for both Key and URL

//     const params = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: uniqueFileName,  // Use uniqueFileName here
//       Body: buffer,
//       ContentType: file.mimetype,
//     };
    

  
//     const data = await s3.upload(params).promise();
//     const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
//     // Save the image URL to the database
//     const newCourse = new Course({
//          ...req.body, // Spread other form fields (e.g., courseName, description, etc.)
//          photo: imageUrl, // Save the uploaded photo URL
//        });
   
//        await newCourse.save();
//     res.status(200).json({
//         message: 'File uploaded successfully',
//         fileUrl: imageUrl
//       });

//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).send({ message: 'Error uploading file', error });
//   }
// });

// module.exports = router;
