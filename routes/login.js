const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Models
const UserObject = require('../models/User');

// Verify OTP and login.
router.post('/', (req, res, next) => {
  const {
    otp
  } = req.body;
  const decoded_email = req.decoded_email;
  const promise = UserObject.findOne({
    email: decoded_email
  });
  promise.then((data) => {
    if (!data) {
      res.status(500).json({
        success: false,
        message: "Oops! We are sorry! Something went wrong!"
      });
    } else {
      bcrypt.compare(otp, data.otp).then((result) => {
        if (!result) {
          res.status(401).json({
            success: false,
            message: "Authentication failed. Wrong otp!"
          });
        } else {
          // Prepare a token.
          const payload = {
            email: decoded_email
          };
          const token = jwt.sign(payload, process.env.APISECRETKEY, {
            expiresIn: 86400 * 30 // This token expires 30 days later. 
          });
          res.status(200).json({
            success: true,
            message: "Welcome master!",
            token: token
          });
        }
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Something went wrong. Try again later."
        });
      });
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Try again later."
    });
  });
});

module.exports = router;