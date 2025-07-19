const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../middlewares/validators/authValidators');
const handleValidationErrors = require('../middlewares/validationHandler');

router.post('/signup', registerValidator, handleValidationErrors, registerUser);
router.post('/login', loginValidator, handleValidationErrors, loginUser);

module.exports = router;

