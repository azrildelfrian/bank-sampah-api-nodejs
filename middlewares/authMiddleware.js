// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_token';

// module.exports = function (req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ message: 'Token diperlukan' });

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // simpan data user ke req.user
//     next();
//   } catch (error) {
//     res.status(403).json({ message: 'Token tidak valid' });
//   }
// };


// authMiddleware.js
const jwt = require('jsonwebtoken');
const { User, Role, Permission } = require('../models');
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_token';


module.exports = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      include: {
        model: Role,
        as: 'role',
        include: {
          model: Permission,
          through: 'RolePermissions'
        }
      }
    });

    if (!user) return res.status(401).json({ message: 'User tidak valid' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token tidak valid', error: err.message });
  }
};
