const Favorite = require('../models/favoriteModel'); // Import the Favorite model

// Add course to favorites
const addFavorite = async (req, res) => {
    try {
      const { courseId,userId } = req.body;
  console.log(userId)
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      if (!courseId) {
        return res.status(400).json({ message: 'Course ID is required' });
      }
  
      console.log('Adding Favorite - User:', userId, 'Course:', courseId);
  
      // Check if the course already exists in favorites
      const existingFavorite = await Favorite.findOne({ userId, courseId });
  
      if (existingFavorite) {
        return res.status(400).json({ message: 'Course is already in favorites' });
      }
  
      // Add course to favorites
      const newFavorite = new Favorite({ userId, courseId });
      await newFavorite.save();
  
      res.status(200).json({ message: 'Course added to favorites' });
    } catch (error) {
      console.error('Error adding to favorites:', error);
      res.status(500).json({ message: 'Failed to add course to favorites' });
    }
  };
  

// Remove course from favorites
const removeFavorite= async (req, res) => {
  try {
      const { userId, courseId } = req.body;

      if (!userId || !courseId) {
          return res.status(400).json({ message: "User ID and Course ID are required" });
      }

      const result = await Favorite.findOneAndDelete({ userId, courseId });

      if (!result) {
          return res.status(404).json({ message: "Favorite not found" });
      }

      res.json({ message: "Course removed from favorites successfully" });
  } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};


// Get user favorites
const getFavorites = async (req, res) => {
  try {
    const { userId } = req.body; // Get user ID from params
    console.log(userId)
    const favorites = await Favorite.find({ userId }).select('courseId');

    res.status(200).json({ favorites: favorites.map(fav => fav.courseId) });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Failed to fetch favorite courses' });
  }
};
const getallFavorite= async (req, res) => {
  try {
    const favorite = await Favorite.find();
    res.status(200).json(favorite);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      message: 'Error fetching courses',
      error: error.message,
    });
  }
};

module.exports = { addFavorite,removeFavorite, getFavorites,getallFavorite };
