// middleware/authorize.js
// module.exports = function authorize(permissionName) {
//   return async (req, res, next) => {
//     try {
//       const user = await req.user.reload({
//         include: {
//           model: Role,
//           as: 'role',
//           include: {
//             model: Permission,
//             through: 'RolePermissions'
//           }
//         }
//       });

//       const permissions = user.role.Permissions.map(p => p.name);
//       if (!permissions.includes(permissionName)) {
//         return res.status(403).json({ message: 'Akses ditolak' });
//       }

//       next();
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Terjadi kesalahan' });
//     }
//   };
// };

module.exports = function authorize(permissionName) {
  return (req, res, next) => {
    try {
      const permissions = req.user?.role?.Permissions || [];

      const hasPermission = permissions.some(p => p.name === permissionName);
      if (!hasPermission) {
        return res.status(403).json({ message: 'Akses ditolak (permission tidak cukup)' });
      }

      next();
    } catch (err) {
      console.error('Authorize error:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat validasi permission' });
    }
  };
};
