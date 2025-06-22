const express = require('express');
const router = express.Router();
//controller
const trashController = require('../controllers/trashController');
//middleware
const { authMiddleware, authorizeRoles, authorize, validate } = require('../middlewares');
const { createTrashRules } = require('../middlewares/validators/trashValidator');

// prefix trash/(endpoint)
router.post(
  '/create',
  authMiddleware,
  createTrashRules,
  validate,
  trashController.createTrash
);

module.exports = router;
