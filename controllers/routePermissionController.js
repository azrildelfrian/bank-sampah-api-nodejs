// controllers/routePermissionController.js
const { RoutePermission } = require('../models');

exports.getAll = async (req, res) => {
  const routes = await RoutePermission.findAll();
  res.json(routes);
};

// exports.create = async (req, res) => {
//   const { path, method, permission_name } = req.body;
//   const route = await RoutePermission.create({ path, method, permission_name });
//   res.status(201).json(route);
// };

exports.create = async (req, res) => {
  try {
    const { path, method, permission_name } = req.body;

    const route = await RoutePermission.create({ path, method, permission_name });

    res.status(201).json(route);
  } catch (error) {
    res.status(400).json({
      message: 'Gagal menambahkan route permission',
      errors: error.errors?.map(err => ({
        field: err.path,
        message: err.message
      })) || error.message
    });
  }
};

exports.patch = async (req, res) => {
  try {
    const { id } = req.params;
    const { path, method, permission_name } = req.body;

    const route = await RoutePermission.findByPk(id);
    if (!route) {
      return res.status(404).json({ message: 'Route tidak ditemukan' });
    }

    if (path !== undefined) route.path = path;
    if (method !== undefined) route.method = method;
    if (permission_name !== undefined) route.permission_name = permission_name;

    await route.save();

    res.json({ message: 'Route permission berhasil diperbarui', data: route });
  } catch (error) {
    res.status(400).json({
      message: 'Gagal update route permission',
      errors: error.errors?.map(e => ({ field: e.path, message: e.message })) || error.message
    });
  }
};


// exports.update = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { path, method, permission_name } = req.body;

//     const route = await RoutePermission.findByPk(id);
//     if (!route) {
//       return res.status(404).json({ message: 'Route tidak ditemukan' });
//     }

//     route.path = path || route.path;
//     route.method = method || route.method;
//     route.permission_name = permission_name || route.permission_name;

//     await route.save();

//     res.json({ message: 'Route berhasil diperbarui', route });
//   } catch (error) {
//     res.status(500).json({ message: 'Gagal memperbarui route', error: error.message });
//   }
// };

exports.delete = async (req, res) => {
  const { id } = req.params;
  await RoutePermission.destroy({ where: { id } });
  res.json({ message: 'Berhasil dihapus' });
};