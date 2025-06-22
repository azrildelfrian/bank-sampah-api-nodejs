// routes/routePermissions.js
const express = require('express');
const router = express.Router();
// const authMiddleware = require('../middlewares/authMiddleware');
const { authMiddleware, authorizeRoles, validate } = require('../middlewares');
const permissionController = require('../controllers/routePermissionController');
const { addrouteValidator, editrouteValidator } = require('../middlewares/validators/routePermissionValidator');

// prefix permission/(endpoint)
router.get('/', authMiddleware, authorizeRoles('admin'), permissionController.getAll);
router.post('/', authMiddleware, authorizeRoles('admin'), addrouteValidator, validate, permissionController.create);
router.patch('/:id', authMiddleware, authorizeRoles('admin'), editrouteValidator, validate, permissionController.patch);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), permissionController.delete);

module.exports = router;