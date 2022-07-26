const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // Get token from header
  const authorization = req.headers['authorization'] || '';
  const token = authorization.split(' ')[1];

  if (!token) return res.status(400).json({ msg: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    console.log(decoded);

    // @ts-ignore
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
