const express = require('express');
const router = express.Router();
//controller
const adminController = require('../controllers/adminController');
//middleware
const { authMiddleware, authorizeRoles, authorize, authorizeByRoute } = require('../middlewares');

// prefix admin/(endpoint)
// router.get('/', authMiddleware, authorizeRoles('admin'), authorize('manage_users'), adminController.getAllTrash);
router.get('/trashes/all', authMiddleware, authorizeByRoute, adminController.getAllTrash);
// router.put('/verif/:id', authMiddleware, adminController.verifikasiSampah);
router.patch('/verif/:id', authMiddleware, authorizeRoles('admin'), adminController.verifikasiSampah);
router.get('/transaction/all', authMiddleware, authorizeRoles('admin'), adminController.getAllTransactions);
router.get('/user/all', authMiddleware, authorizeRoles('admin'), adminController.getAllUsers);
router.get('/role/all', authMiddleware, authorizeRoles('admin'), adminController.getAllRoles);
router.get('/trashtype/all', authMiddleware, adminController.getAllTrashTypes);
router.post('/trashtype/create', authMiddleware, authorizeRoles('admin'), adminController.createTrashType);
router.patch('/trashtype/edit/:id', authMiddleware, authorizeRoles('admin'), adminController.updateTrashType);

router.get('/dashboard', authMiddleware, adminController.getDashboardStats);

module.exports = router;
