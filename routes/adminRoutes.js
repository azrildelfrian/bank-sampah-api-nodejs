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
router.patch('/verif/:id', authMiddleware, adminController.verifikasiSampah);
router.get('/transaction/all', authMiddleware, adminController.getAllTransactions);
router.get('/user/all', authMiddleware, adminController.getAllUsers);
router.get('/role/all', authMiddleware, adminController.getAllRoles);
router.get('/trashtype/all', authMiddleware, adminController.getAllTrashTypes);
router.post('/trashtype/create', authMiddleware, adminController.createTrashType);
router.patch('/trashtype/edit/:id', authMiddleware, adminController.updateTrashType);

router.get('/dashboard', authMiddleware, adminController.getDashboardStats);

module.exports = router;
