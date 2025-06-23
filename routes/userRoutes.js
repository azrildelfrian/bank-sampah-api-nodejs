const express = require('express');
const router = express.Router();
//controller
const userController = require('../controllers/userController');
const trashController = require('../controllers/trashController');
//middleware
const { authMiddleware, authorizeRoles, authorize, validate } = require('../middlewares');

// prefix u/(endpoint)
router.get('/me', authMiddleware, userController.getProfileData);
router.get('/me/trashes', authMiddleware, trashController.getUserTrash);
router.get('/me/saldo', authMiddleware, trashController.getUserBalance);
router.get('/me/history', authMiddleware, trashController.getUserHistory);

module.exports = router;
