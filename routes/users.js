const express = require('express');

const router = express.Router();

// @route		POST	api/users
// @desc		Register a user
// @access	Publick
router.post('/', (req, res) => {
  res.send('Register a user');
});

module.exports = router;
