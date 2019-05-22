const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const authMiddleware = require("../../middlewares/authMiddleware");
const User = require("../../models/User");

// @route   POST /api/auth
// @desc    Authenticate
// @access  Public
router.post("/", (req, res) => {
  const { password, email } = req.body;

  // Validation here
  User.findOne({ email })
    .then(user => {
      if (!user)
        return res.status(400).json({ msg: "This user does not exist" });

      // Validate password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

        // Create token
        jwt.sign(
          { id: user._id },
          config.get("jwtSecret"),
          {
            expiresIn: 30 * 24 * 3600 
          },
          (err, token) => {
            if (err) return res.status(400).json({ msg: "Server error" });


        
            res.status(200).json({
              token,
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
                webcams : user.webcams
              }
            });
          }
        );
      });
    })
    
});

// @route   GET /api/auth
// @desc    Get user data
// @access  Private
router.get("/user", authMiddleware, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      res.json(user);
    });
});
module.exports = router;
