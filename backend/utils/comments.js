const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

const id = check('id')
  .notEmpty()
  .isInt({ min: 0 });

const userId = check('userId')
  .notEmpty()
  .isInt({ min: 0 });

const imageId = check('imageId')
  .notEmpty()
  .isInt({ min: 0 });

const comment = check('comment')
  .notEmpty()
  .withMessage('Comment must contain text.');

const validateComment = [
  userId,
  imageId,
  comment,
  handleValidationErrors,
];

exports.validateComment = validateComment;

exports.validateUpate = [
  id,
  validateComment,
];
