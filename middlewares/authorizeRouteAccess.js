const accessConfig = require('../config/accessConfig');

module.exports = function authorizeRouteAccess(path) {
  return (req, res, next) => {
    const config = accessConfig[path];
    if (!config) return res.status(403).json({ message: 'Akses belum diatur' });

    const userRole = req.user?.role?.name;
    const userPermissions = req.user?.role?.Permissions?.map(p => p.name) || [];

    // Cek role
    if (!config.roles.includes(userRole)) {
      return res.status(403).json({ message: 'Role tidak diizinkan' });
    }

    // Cek permission
    const hasPermission = config.permissions.every(p => userPermissions.includes(p));
    if (!hasPermission) {
      return res.status(403).json({ message: 'Permission tidak mencukupi' });
    }

    next();
  };
};
