const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// 회원가입
router.post('/', authController.loginWithEmail);

module.exports = router;
