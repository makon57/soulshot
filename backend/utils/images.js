const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

const id = check('id')
  .notEmpty()
  .isInt({ min: 0 });

const title = check('title')
  .notEmpty()
  .withMessage('Title must not be empty.');

const imageUrl = check('imageUrl')
  .notEmpty()
  .isURL()
  .withMessage('URL for image must be a valid URL.');

const description = check('description')
  .notEmpty()
  .withMessage('Description must contain text.');

const validateCreate = [
  title,
  imageUrl,
  description,
  handleValidationErrors,
];

exports.validateCreate = validateCreate;

exports.validateUpate = [
  id,
  validateCreate,
];
