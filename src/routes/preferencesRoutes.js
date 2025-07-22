const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getPreferences, updatePreferences } = require('../controllers/preferencesController');
const { preferencesValidator } = require('../middlewares/validators/preferencesValidator');
const handleValidationErrors = require('../middlewares/validationHandler');

router.get('/', authMiddleware, getPreferences);
router.put('/', authMiddleware, preferencesValidator, handleValidationErrors, updatePreferences);

module.exports = router;
