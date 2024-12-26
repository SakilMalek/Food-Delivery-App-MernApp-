const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const jwtSecret = "MynameisMalekSakilMohammadArifMohammadAndthisismyfirrstmernstackproject"
router.post(
"/createuser",
  [
    body("email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
    body("name").isLength({ max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: "Invalid input", errors: errors.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        location: req.body.location,
      });

      await newUser.save();
      return res.json({ success: true });
    } catch (error) {
      console.log("Error creating user:", error.message);
      if (error.code === 11000) {
        // Duplicate email error (MongoDB)
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; // Destructuring for readability

    try {
      // Corrected to search by email field in the object
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }

      // Use bcrypt to compare hashed password with the plain text password
      const isMatch = await bcrypt.compare(password, userData.password);
      if (!isMatch) {
        return res.status(400).json({ errors: "Invalid credentials" });
      }
      const data = { user:{
        _id: userData._id
      }
      }
      const authToken = jwt.sign(data, jwtSecret)
      // If login is successful
      return res.json({ success: true , authToken:authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
