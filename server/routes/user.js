// const express = require("express");
// const router = express.Router();
// const ctrl = require("../controllers");
// const mw = require("../middleware");

// router.post("/addAdmin", mw.auth.verify, ctrl.user.addAdmin);

// //router.get("/confirmation/:email/:token", ctrl.user.verify);
// //router.post("/resend", ctrl.user.resend);
// router.post("/login", ctrl.user.login);
// //router.put("/forgotPassword", ctrl.user.forgotPassword);
// //router.put("/resetPassword", ctrl.user.resetPassword);

// router.post("/create", mw.auth.verify, ctrl.user.create);
// router.put("/:id/update", mw.auth.verify, ctrl.user.update);
// router.delete("/:id/delete", mw.auth.verify, ctrl.user.deleteCampaign);

// module.exports = router;


// filepath: server/routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Request body:', req.body); // Add this line

    const user = await User.findOne({ email });

    console.log('User found:', user); // Add this line

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log('Password match:', isMatch); // Add this line

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});

router.post('/register', async (req, res) => {
        try {
          const { name, email, password } = req.body;
      
          // Hash the password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
      
          const user = new User({
            name,
            email,
            password: hashedPassword, // Store the hashed password
          });
      
          await user.save();
      
          res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Registration failed' });
        }
});

module.exports = router;
