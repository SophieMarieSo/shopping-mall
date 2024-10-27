const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authController = {};

authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await user.generateToken();
        return res.status(200).json({ status: 'success', user, token });
      }
    }
    throw new Error('invalid email or password');
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.header.authorization;
    if (!tokenString) throw new Error('Token is not found');
    const token = tokenString.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
      if (error) throw new Error('invalid token');
      req.userId = payload._id;
      next();
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

module.exports = authController;
