// const isAdmin = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Akses ditolak' });
//   }
//   next();
// };

// module.exports = isAdmin;

// Setelah login, `req.user.role = { id: 1, name: 'admin' }` misalnya

const ROLES = require('../constants/roles');

const isAdmin = (req, res, next) => {
  if (req.user.role?.name !== ROLES.ADMIN) {
    return res.status(403).json({ message: 'Akses ditolak' });
  }
  next();
};
