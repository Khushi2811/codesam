const express = require('express');
const { registerUser, loginUser,verifyEmail ,resendOtp} = require('../controllers/authController');

const router = express.Router();

// Register endpoint
router.post('/register', registerUser);

// Login endpoint
router.post('/login', loginUser);

router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendOtp);


module.exports = router;
