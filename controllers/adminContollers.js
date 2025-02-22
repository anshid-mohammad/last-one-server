 const CourseDetails =require("../models/teachersForm")
 const User=require("../models/user")
 const Mentor=require("../models/mentor")
 
 

 const getCourseData = async (req, res) => {
  const { status } = req.params; // Get status from query parameters
  const filter = status ? { status } : {}; // Add filter condition if status exists

        try {
          const courseData = await CourseDetails.find(filter);
          res.status(200).json(courseData);

          if (!courseData.length) {
            return res.status(404).json({ message: "No courses found" });
          }
      
          console.log("Fetched Course Data:", courseData);
      
          res.status(200).json(courseData);
        } catch (error) {
          console.error("Error fetching course data:", error.message);
      
          res.status(500).json({ message: "Failed to fetch course data", error: error.message });
        }
      };

      const getCourseId = async (req, res) => {
        try {
          const { id } = req.params; 
          const course = await CourseDetails.findById(id);
      
          if (!course) {
            return res.status(404).json({ message: "Course not found" });
          }
      
          res.status(200).json(course);
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
    
        // Find and update the course by its ID
        const updatedCourse = await CourseDetails.findByIdAndUpdate(
          id,
          { status },
          { new: true } // Return the updated document
        );
    
        if (!updatedCourse) {
          return res.status(404).json({ message: "Course not found" });
        }
    
        res.status(200).json({
          message: "Status updated successfully",
          courseData: updatedCourse,
        });
      } catch (error) {
        console.error("Error updating status:", error);
    
        res.status(500).json({
          message: "Failed to update status",
          error: error.message,
        });
      }
    };

    const declineCourse= async(req,res)=>{
      const {id}=req.params

      try{

        const deleteCourse= await CourseDetails.findOneAndDelete(id)
        if(!deleteCourse){
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
    const declineMentor= async(req,res)=>{
      const {id}=req.params

      try{

        const deleteMentor= await Mentor.findOneAndDelete(id)
        if(!deleteMentor){
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
    const declineUser= async(req,res)=>{
      const {id}=req.params

      try{

        const deleteMentor= await User.findOneAndDelete(id)
        if(!deleteMentor){
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
    
      module.exports={getCourseData,getCourseId,changeStatus,declineCourse,declineMentor,declineUser}