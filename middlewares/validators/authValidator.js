const { body } = require('express-validator');
const roles = require('../../constants/roles');

exports.registerValidator = [
  body('name').notEmpty().withMessage('Nama wajib diisi'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
  body('roleId')
    .optional()
    .isIn(Object.values(roles))
    .withMessage('Role tidak valid'),];

exports.loginValidator = [
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').notEmpty().withMessage('Password wajib diisi'),
];