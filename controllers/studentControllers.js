const studentsForm = require("../models/studentForm")
const Student = require("../models/studentForm")
const { s3,  randomFileName, sharp } = require('../utils/s3Clinet');

const addStudentData = async (req, res) => {
    const files = req.files; // Handle multiple files
    if (!files || !files.photo || !files.identityProof) {
        return res.status(400).json({ error: 'Photo and Identity Proof are required.' });
    }

    try {
        // Process photo file
        const photoBuffer = await sharp(files.photo[0].buffer)
            .resize({ height: 1080, width: 720, fit: 'contain' })
            .jpeg({ quality: 70 })
            .toBuffer();

        const photoFileName = `${Date.now()}_${randomFileName()}_${files.photo[0].originalname}`;
        const photoParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: photoFileName,
            Body: photoBuffer,
            ContentType: files.photo[0].mimetype,
        };
        const photoData = await s3.upload(photoParams).promise();
        const photoUrl = photoData.Location;

        // Process identity proof file
        const identityProofBuffer = await sharp(files.identityProof[0].buffer)
            .resize({ height: 1080, width: 720, fit: 'contain' })
            .jpeg({ quality: 70 })
            .toBuffer();

        const identityProofFileName = `${Date.now()}_${randomFileName()}_${files.identityProof[0].originalname}`;
        const identityProofParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: identityProofFileName,
            Body: identityProofBuffer,
            ContentType: files.identityProof[0].mimetype,
        };
        const identityProofData = await s3.upload(identityProofParams).promise();
        const identityProofUrl = identityProofData.Location;

        // Get student ID
        const studentId = req.session?.student?._id || req.student?.id || req.body.studentId;
        const teacherId = req.session?.teacher?._id || req.teacher?.id || req.body.teacherId;
        const courseId = req.session?.course?._id || req.course?.id || req.body.courseId;

        if (!studentId) {
            return res.status(400).json({ error: 'User ID is required to add a student' });
        }

        // Save student data to database
        const newStudent = new Student({
            ...req.body,
            photo: photoUrl,
            identityProof: identityProofUrl,
            studentId,
            teacherId,
            courseId,
        });

        await newStudent.save();

        res.status(201).json({
            message: 'Student data added successfully!',
            student: newStudent,
        });
    } catch (error) {
        console.error('Error adding student data:', error);
        res.status(500).json({
            message: 'Failed to add student data',
            error: error.message,
        });
    }
};


// const getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.status(200).json(students);
//   } catch (error) {
//     console.error('Error fetching students:', error);
//     res.status(500).json({ message: 'Failed to fetch students' });
//   }
// };

// module.exports = {
//   getAllStudents,
// };


const getStudentData = async (req, res) => {
    try {
        const studentData = await Student.find();

        if (!studentData.length) {
            return res.status(404).json({ message: "No students found" });
        }

        console.log("Fetched Student Data:", studentData);

        res.status(200).json(studentData);
    } catch (error) {
        console.error("Error fetching student data:", error.message);

        res.status(500).json({ message: "Failed to fetch student data", error: error.message });
    }
};

    const getStudentId = async (req, res) => {
        try {
          const { id } = req.params; 
          const student = await Student.findById(id);
      
          if (!student) {
            return res.status(404).json({ message: "Course not found" });
          }
      
          res.status(200).json(student);
        } catch (error) {
          console.error("Error fetching course:", error.message);
      
          res.status(500).json({
            message: "Error fetching course",
            error: error.message,
          });
        }
      };
      const changeStatus = async (req, res) => {
            try {
              const { id } = req.params; // Get the course ID from the route parameter
              const { status } = req.body; // Get the new status from the request body
          console.log("backid",id,status)
              // Find and update the course by its ID
              const updatedStudent = await Student.findByIdAndUpdate(
                id,
                { status },
                { new: true } // Return the updated document
              );
          
              if (!updatedStudent) {
                return res.status(404).json({ message: "Course not found" });
              }
          
              res.status(200).json({
                message: "Status updated successfully",
                courseData: updatedStudent,
              });
            } catch (error) {
              console.error("Error updating status:", error);
          
              res.status(500).json({
                message: "Failed to update status",
                error: error.message,
              });
            }
          };
      
      
      
          const declineStudent= async(req,res)=>{
            const {id}=req.params
      
            try{
      
              const deleteStudent= await Student.findOneAndDelete(id)
              if(!deleteStudent){
                res.status(404).json({ message: "Application delete error" });
              }else{
                res.status(200).json({ message: "Application deleted successfully" });
              }
      
            }catch(error){
              console.error("error delete data",error)
              res.status(500).json({
                message:"filed to delete status",
                error:error.message,
              })
            }
          }
         
        
module.exports = { getStudentData, addStudentData,getStudentId,changeStatus,declineStudent, };
