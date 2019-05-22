const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const registerValidation = require("../../utils/validation/registerValidation");

const User = require("../../models/User");

// @route   POST /api/user
// @desc    Register new user
// @access  Public

router.post("/", (req, res) => {

  const { name, password, password2, email } = req.body;

  // Validation here
  if (!registerValidation({ name, password, password2, email }).isValid)
    return res
      .status(400)
      .json({msg : 'Try again... your input is invalid'});

  // Check that we recieve right data :


  User.findOne({ email }).then(user => {
    if (user)
      return res
        .status(400)
        .json({ msg: "This email address is already taken" });

    const newUser = new User({
      name,
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hashedPwd) => {
        if (err)
          return res.status(400).json({ msg: "Server error. Try again" });

        newUser.password = hashedPwd;

        newUser
          .save()
          .then(user => {
            // Why use jwt ? we need a method to authenticate users for private routes ,
            // and create custom middlewere to achive that.
            // This is a highly customizable way to achive auth (more than the opinionated passport)

            // You can sign anything for the token , just choose something that will be
            // unique for the user
            // params : (payload, secret ,  {expirenIn (seconds)} , callback(err,token) )

            jwt.sign(
              { id: user._id },
              config.get("jwtSecret"),
              {
                expiresIn: 30 * 24 * 3600
              },
              (err, token) => {
                if (err) throw err;

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
          })
          .catch(err =>
            res.status(400).json({ msg: "Server error. Try again" })
          );
      });
    });
  });
});



module.exports = router;
