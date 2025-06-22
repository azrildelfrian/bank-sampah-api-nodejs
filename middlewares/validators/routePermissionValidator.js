const { body } = require('express-validator');

exports.addrouteValidator = [
  body('path').notEmpty().withMessage('Path wajib diisi contoh: /admin'),
  body('permission_name').notEmpty().withMessage('permission_name wajib diisi'),
];

exports.editrouteValidator = [
  body('path')
    .optional({ checkFalsy: true })
    .isString().withMessage('Path harus berupa string'),

  body('method')
    .optional({ checkFalsy: true })
    .isString().withMessage('Method harus berupa string'),

  body('permission_name')
    .optional({ checkFalsy: true })
    .isString().withMessage('permission_name harus berupa string'),
];
