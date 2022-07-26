// @ts-nocheck
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const config = require('config');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route		GET	api/auth
// @desc		Get logged in user
// @access	Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route		POST	api/auth
// @desc		Auth user and get token
// @access	Public
router.post(
  '/',
  body('email', 'Please inclucde a valid email address').isEmail(),
  body('password', 'Please include a valid password with 5 or more characters').isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

      const payload = { user: { id: user.id } };
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
