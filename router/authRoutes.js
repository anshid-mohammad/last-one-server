const express = require('express');
const passport = require('passport');
const router = express.Router();
const {generateToken} =require("../utils/jwtUtils")
const User =require("../models/user")
// Google callback route
router.get('/google-auth', passport.authenticate('google', {
    scope:
        ['email', 'profile']
}))


router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/auth/login' }),
    async (req, res) => {
        const user = req.user;
        const currentDate = new Date();
        console.log(user)

        try {
            const userExists = await User.findOneAndUpdate(
                { email: user.emails[0].value },
                {
                    $set: {
                        name: user.displayName,
                        role: user.role, // Default to 'learner' if role is missing
                        userId: user.id,
                        updatedAt: currentDate,
                    },
                    $setOnInsert: {
                        createdAt: currentDate,
                    },
                },
                { upsert: true, new: true }
            );
            console.log(userExists)
            console.log("disply name",userExists.id)

            const jwt = generateToken(userExists);
            res.redirect(`${process.env.CLIENT_URL}learners?token=${jwt}&username=${user.displayName}&userRole=${userExists.role}&userid=${userExists.id}`);

 
        } catch (error) {
            console.error('Error during Google login:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
);

module.exports = router;
