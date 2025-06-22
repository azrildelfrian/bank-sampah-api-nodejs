const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role, RefreshToken } = require('../models');
const ROLE = require('../constants/roles');
const {
  generateAccessToken,
  generateRefreshToken
} = require('../utils/token');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: 'Email sudah digunakan' });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Cari role dari tabel Roles
    const roleName = role || 'user'; // default
    const roleData = await Role.findOne({ where: { name: roleName } });

    if (!roleData) {
      return res.status(400).json({ message: 'Role tidak valid' });
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId: roleData.id // simpan roleId, bukan string role
    });

    res.status(201).json({
      message: 'Registrasi berhasil',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: roleData.name // kirim nama rolenya, meskipun disimpan roleId
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Gagal register', error });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Include relasi ke Role agar bisa ambil nama role
    const user = await User.findOne({
      where: { email },
      include: {
          model: Role,
          as: 'role',
          attributes: ['name']
        }
    });

    if (!user)
      return res.status(404).json({ message: 'User tidak ditemukan' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Password salah' });

    // Generate token pakai role name
    const accessToken = generateAccessToken({ id: user.id, role: user.role.name });
    const refreshToken = generateRefreshToken({ id: user.id, role: user.role.name });

    await RefreshToken.create({
      userId: user.id,
      token: refreshToken,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.status(200).json({
      message: 'Login berhasil',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal login', error });
  }
};


exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token diperlukan' });
  }

  try {
    const deleted = await RefreshToken.destroy({ where: { token: refreshToken } });
    if (!deleted) {
      return res.status(404).json({ message: 'Token tidak ditemukan' });
    }

    res.status(200).json({ message: 'Logout berhasil' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal logout', error });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token diperlukan' });
  }

  try {
    const existingToken = await RefreshToken.findOne({ where: { token: refreshToken } });
    if (!existingToken) {
      return res.status(403).json({ message: 'Refresh token tidak valid' });
    }

    // Validasi apakah token sudah kadaluarsa
    if (new Date(existingToken.expiresAt) < new Date()) {
      await existingToken.destroy(); // hapus token kadaluarsa
      return res.status(403).json({ message: 'Refresh token sudah kedaluwarsa' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'rahasia_refresh');

    // Generate ulang access token, gunakan payload asli
    const newAccessToken = generateAccessToken({ id: decoded.id, role: decoded.role });

    res.status(200).json({ accessToken: newAccessToken });

  } catch (error) {
    return res.status(403).json({ message: 'Refresh token tidak valid atau kedaluwarsa' });
  }
};
