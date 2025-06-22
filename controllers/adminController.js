const { Transaction, Trash, TrashType, User, Role } = require('../models');
const STATUS = require('../constants/status');
const { Op } = require('sequelize');

// Admin
exports.getAllTrash = async (req, res) => {
  try {
    // const data = await Trash.findAll({ include: User });
    const data = await Trash.findAll({ 
      include: [
      { 
        model: User, 
        attributes: ['id', 'name', 'email'],
        include: {
          model: Role,
          as: 'role',
          attributes: ['name']
        }
      },
      {
        model: TrashType,
        as: 'type',
        attributes: ['id', 'name', 'pricePerKg']
      },
    ],
      order: [['createdAt', 'DESC']]
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal ambil data', error });
  }
};

exports.verifikasiSampah = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const trash = await Trash.findByPk(id);
    if (!trash) return res.status(404).json({ message: 'Data sampah tidak ditemukan' });

    if (trash.status === STATUS.DITERIMA || trash.status === STATUS.DITOLAK) {
      return res.status(400).json({ message: 'Sampah sudah diverifikasi dan tidak bisa diubah' });
    }

    if (![STATUS.DITERIMA, STATUS.DITOLAK].includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid' });
    }

    if (status === STATUS.DITERIMA) {
      const trashType = await TrashType.findByPk(trash.typeId);
      if (!trashType) return res.status(404).json({ message: 'Jenis sampah tidak ditemukan' });

      const hargaPerKg = trashType.pricePerKg;
      const totalHarga = trash.berat * hargaPerKg;

      trash.status = STATUS.DITERIMA;
      await trash.save();

      const transaction = await Transaction.create({
        userId: trash.userId,
        trashId: trash.id,
        pricePerKg: hargaPerKg,
        totalPrice: totalHarga,
        type: 'DEPOSIT'
      });

      return res.json({
        message: 'Sampah diterima dan transaksi tercatat',
        trash,
        transaction
      });
    }

    trash.status = STATUS.DITOLAK;
    await trash.save();

    return res.json({
      message: 'Sampah berhasil ditolak',
      trash
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal memproses status', error: error.message });
  }
};


//Opsional jika fitur verif gagal
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const trash = await Trash.findByPk(id);
    if (!trash) return res.status(404).json({ message: 'Data tidak ditemukan' });

    trash.status = status;
    await trash.save();

    res.json({ message: 'Status diperbarui', data: trash });
  } catch (error) {
    res.status(500).json({ message: 'Gagal update', error });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const data = await Transaction.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: Trash,
          attributes: ['status', 'berat'],
          include: [
            {
              model: TrashType,
              as: 'type',
              attributes: ['id', 'name']
            },
          ]
        }
      ],
  order: [['createdAt', 'DESC']]
    });

    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Gagal ambil data', error });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['id', 'name', 'description']
        }
      ],
  order: [['createdAt', 'DESC']]
    });

    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Gagal ambil data', error });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const data = await Role.findAll({
  order: [['createdAt', 'DESC']]
    });

    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Gagal ambil data', error });
  }
};

exports.getAllTrashTypes = async (req, res) => {
  try {
    const data = await TrashType.findAll({
  order: [['createdAt', 'DESC']]
    });

    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Gagal ambil data', error });
  }
};

// exports.createTrashType = async (req, res) => {
//   const { name, pricePerKg } = req.body;

//   if (!name || !pricePerKg) {
//     return res.status(400).json({ message: "Nama dan harga per kg harus diisi." });
//   }

//   try {
//     const newTrashType = await TrashType.create({
//       name,
//       pricePerKg,
//     });

//     res.status(201).json({ message: "Jenis sampah berhasil ditambahkan", data: newTrashType });
//   } catch (error) {
//     console.error("Gagal menambah jenis sampah:", error);
//     res.status(500).json({ message: "Gagal menambah jenis sampah", error });
//   }
// };

exports.createTrashType = async (req, res) => {
  const { name, pricePerKg } = req.body;

  if (!name || !pricePerKg) {
    return res.status(400).json({ message: "Nama dan harga per kg wajib diisi." });
  }

  if (isNaN(pricePerKg) || pricePerKg <= 0) {
    return res.status(400).json({ message: "Harga harus berupa angka positif." });
  }

  try {
    const existing = await TrashType.findOne({ where: { name } });
    if (existing) {
      return res.status(409).json({ message: "Jenis sampah dengan nama tersebut sudah ada." });
    }

    const newType = await TrashType.create({ name, pricePerKg });
    res.status(201).json({ message: "Jenis sampah berhasil ditambahkan.", data: newType });
  } catch (error) {
    console.error("Gagal menambah jenis sampah:", error);
    res.status(500).json({ message: "Terjadi kesalahan di server", error });
  }
};

exports.updateTrashType = async (req, res) => {
  const { id } = req.params;
  const { name, pricePerKg } = req.body;

  try {
    const trashType = await TrashType.findByPk(id);

    if (!trashType) {
      return res.status(404).json({ message: "Jenis sampah tidak ditemukan" });
    }

    await trashType.update({
      name,
      pricePerKg,
    });

    res.json({ message: "Data jenis sampah berhasil diupdate", data: trashType });
  } catch (error) {
    res.status(500).json({ message: "Gagal update data jenis sampah", error });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const trashes = await Trash.findAll();
    const totalSampahKg = trashes.reduce((total, item) => total + (item.berat || 0), 0);
    const totalTransaksi = await Transaction.count();
    const allTransactions = await Transaction.findAll();
    // const totalSetor = allTransactions.reduce((total, trx) => total + (trx.totalPrice || 0), 0);

    // const totalSetor = allTransactions.reduce(
    //   (total, trx) => total + Number(trx.totalPrice || 0),
    //   0
    // );

    // const totalSetor = allTransactions.reduce(
    //   (total, trx) => total + parseFloat(trx.totalPrice || 0),
    //   0
    // );

    const totalSetor = allTransactions.reduce(
      (total, trx) => total + parseFloat(trx.totalPrice || 0),
      0
    );

    const formattedTotalSetor = totalSetor.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    // hardcoded
    // const growth = {
    //   setor: 55,
    //   users: 3,
    //   sampah: -2,
    //   transaksi: 5,
    // };

    res.json({
      totalSetor: formattedTotalSetor,
      totalUsers,
      totalSampahKg,
      totalTransaksi,
      // growth,
    });
  } catch (error) {
    console.error("Gagal mengambil data dashboard:", error);
    res.status(500).json({ message: "Gagal mengambil data dashboard", error });
  }
};
