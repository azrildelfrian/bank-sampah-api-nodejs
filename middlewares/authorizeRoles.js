// authorizeRoles.js
// const authorizeRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     const userRole = req.user?.role?.name;

//     if (!allowedRoles.includes(userRole)) {
//       return res.status(403).json({ message: 'Akses ditolak (Tidak diizinkan)' });
//     }

//     next();
//   };
// };

// module.exports = authorizeRoles;

// middleware/authorizeRoles.js
module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const roleName = req.user?.role?.name;

      if (!roleName || !allowedRoles.includes(roleName)) {
        return res.status(403).json({ message: 'Akses ditolak (role tidak diizinkan)' });
      }

      next();
    } catch (err) {
      console.error('authorizeRoles error:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat validasi role' });
    }
  };
};
