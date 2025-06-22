const { Transaction, Trash, TrashType, User, Role } = require('../models');
const STATUS = require('../constants/status');

exports.createTrash = async (req, res) => {
  const { typeId, berat } = req.body;

  try {
    // Validasi apakah tipe sampah ada
    const trashType = await TrashType.findByPk(typeId);
    if (!trashType) {
      return res.status(404).json({ message: 'Jenis sampah tidak ditemukan' });
    }

    const data = await Trash.create({
      userId: req.user.id,
      typeId,
      berat,
      status: STATUS.MENUNGGU
    });

    res.status(201).json({ message: 'Data sampah ditambahkan', data });
  } catch (error) {
    res.status(500).json({ message: 'Gagal input', error });
  }
};

// User
exports.getUserTrash = async (req, res) => {
  try {
    const data = await Trash.findAll({
      where: { userId: req.user.id },
      // include: {
      //     model: Role,
      //     as: 'role',
      //     attributes: ['name']
      //   }
      include: { 
        model: User, 
        attributes: ['id', 'name', 'email'],
        include: {
          model: Role,
          as: 'role',
          attributes: ['name']
        }
      },
      order: [['createdAt', 'DESC']]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Gagal ambil data user', error });
  }
};

exports.getUserBalance = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.user.id }
    });

    const saldo = transactions.reduce((sum, tx) => {
      return tx.type === 'DEPOSIT'
        ? sum + Number(tx.totalPrice)
        : sum - Number(tx.totalPrice);
    }, 0);

    res.json({ saldo });
  } catch (error) {
    res.status(500).json({ message: 'Gagal ambil saldo', error });
  }
};

exports.getUserHistory = async (req, res) => {
  try {
    const data = await Trash.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json({ history: data });
  } catch (error) {
    res.status(500).json({ message: 'Gagal ambil histori', error });
  }
};



