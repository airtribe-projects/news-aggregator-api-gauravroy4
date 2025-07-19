const { body } = require('express-validator');

exports.preferencesValidator = [
    body('categories')
        .optional()
        .isArray({ min: 1 })
        .withMessage('Categories must be a non-empty array of strings'),
    body('language')
        .optional()
        .isString()
        .isLength({ min: 2, max: 5 })
        .withMessage('Language must be a valid code like "en", "hi"'),
];
