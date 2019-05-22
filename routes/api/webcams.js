const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const User = require("../../models/User");

// @route   POST /api/webcams
// @desc    Add an webcam id to user
// @access  Private
router.post("/", authMiddleware, (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      // Check if webcam exists in users list
      if (user.webcams.includes(req.body.webcamId))
        return res.status(400).json({ msg: "Webcam exists" });

      user.webcams.push(req.body.webcamId);

      user.save().then(user => {
        // console.log("Added item succesfully");

        return res.json({ 
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            webcams: user.webcams
          }
        });
      });
    })
    .catch(() => {
      console.log("Invalid params");
    });
});

// @route   DELETE /api/webcams
// @desc    Remove a webcam id from user
// @access  Private
router.delete("/:id", authMiddleware, (req, res) => {
  
  User.findById(req.user.id)
    .then(user => {
   
      // Check if webcam exists in users list
      if (!user.webcams.includes(req.params.id))
        return res.status(400).json({ msg: "Webcam does not exists" });

        
        
      user.webcams = user.webcams.filter(id => id !== req.params.id)

      user.save().then(user => {
        // console.log("Removed item succesfully");

        return res.json({ 
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            webcams: user.webcams
          }
        });
      });
    })
    .catch(() => {
      console.log("Invalid params");
    });
});


module.exports = router;
