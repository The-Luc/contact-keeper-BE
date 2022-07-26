const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const config = require('config');
const User = require('../models/User');

// @route		GET	api/auth
// @desc		Get logged in user
// @access	Private
router.get(
  '/',
  body('name', 'Name is required').notEmpty(),
  body('email', 'Please inclucde a valid email address').isEmail(),
  body('password', 'Please include a valid password with 5 or more characters').isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'User already exists.' });

      const newUser = new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

      const payload = { user: { id: newUser.id } };
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ msg: 'Something went wrong' });
    }
  }
);

// @route		POST	api/auth
// @desc		Auth user and get token
// @access	Public
router.post('/', (req, res) => {
  res.send('Log in user');
});

module.exports = router;
