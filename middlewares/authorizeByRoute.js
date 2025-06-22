// middleware/authorizeByRoute.js
const { RoutePermission, User, Role, Permission } = require('../models');

module.exports = async function authorizeByRoute(req, res, next) {
  try {
    const userId = req.user?.id;
    const user = await User.findByPk(userId, {
      include: {
        model: Role,
        as: 'role',
        include: Permission
      }
    });

    const userPermissions = user.role?.Permissions.map(p => p.name) || [];

    const path = req.baseUrl + req.route.path;
    const method = req.method.toUpperCase();

    const routePermission = await RoutePermission.findOne({
      where: { path, method }
    });

    if (!routePermission)
      return res.status(403).json({ message: 'Route ini belum diatur dalam izin akses' });

    if (!userPermissions.includes(routePermission.permission_name)) {
      return res.status(403).json({ message: 'Akses ditolak. Anda tidak memiliki izin.' });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error otorisasi dinamis', error: err.message });
  }
};



// const { RoutePermission } = require('../models');

// module.exports = async function authorizeByRoute(req, res, next) {
//   try {
//     const path = req.route?.path; // Ambil path rutenya, contoh: '/admin'
//     const method = req.method;

//     const route = await RoutePermission.findOne({
//       where: { path }
//     });

//     if (!route) {
//       return res.status(403).json({ message: 'Akses ke route ini tidak diatur' });
//     }

//     const requiredPermission = route.permission_name;
//     const userPermissions = req.user?.role?.Permissions?.map(p => p.name) || [];

//     if (!userPermissions.includes(requiredPermission)) {
//       return res.status(403).json({ message: 'Permission ditolak untuk route ini' });
//     }

//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Terjadi kesalahan otorisasi dinamis' });
//   }
// };

// middleware/authorizeByRoute.js
// const { RoutePermission, Permission, Role, User } = require('../models');

// module.exports = async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.user.id, {
//       include: {
//         model: Role,
//         include: {
//           model: Permission,
//         },
//       },
//     });

//     const userPermissions = user.role?.Permissions.map(p => p.name) || [];

//     const route = req.route.path;
//     const method = req.method;

//     const routePermission = await RoutePermission.findOne({
//       where: { route, method },
//     });

//     if (!routePermission) return res.status(403).json({ message: 'Akses tidak diizinkan (route tidak terdaftar)' });

//     if (!userPermissions.includes(routePermission.permissionName)) {
//       return res.status(403).json({ message: 'Akses ditolak: Anda tidak punya izin untuk aksi ini.' });
//     }

//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Terjadi kesalahan otorisasi', error: err.message });
//   }
// };
