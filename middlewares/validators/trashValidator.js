const { body } = require('express-validator');
const status = require('../../constants/status');

const createTrashRules = [
  // body('jenis')
  //   .notEmpty().withMessage('Jenis wajib diisi'),

  body('typeId')
    .notEmpty().withMessage('ID Tipe sampah wajib diisi')
    .isFloat({ gt: 0 }).withMessage('ID Tipe sampah harus berupa angka positif'),

  body('berat')
    .notEmpty().withMessage('Berat wajib diisi')
    .isFloat({ gt: 0 }).withMessage('Berat harus berupa angka positif'),

  body('status')
    .optional()
    .isIn(Object.values(status))
    .withMessage('Status tidak valid'),

  // body('hargaPerKg')
  //   .notEmpty().withMessage('Harga per kg wajib diisi')
  //   .isFloat({ gt: 0 }).withMessage('Harga harus berupa angka positif'),
];

module.exports = { createTrashRules };