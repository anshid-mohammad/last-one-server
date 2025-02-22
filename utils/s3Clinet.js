const AWS = require('aws-sdk');
const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');

// AWS Configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Multer configuration for in-memory file storage
const upload = multer({ storage: multer.memoryStorage() });

// Utility function to generate a random file name
const randomFileName = () => crypto.randomBytes(32).toString('hex');

// Export the utilities
module.exports = {
  s3,
  upload,
  randomFileName,
  sharp, // Exporting sharp in case it's needed elsewhere
};
