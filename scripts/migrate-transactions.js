const { Trash, Transaction, sequelize } = require('../models');

(async () => {
  try {
    const trashes = await Trash.findAll({
      where: { status: 'diterima' }
    });

    for (const trash of trashes) {
      await Transaction.create({
        userId: trash.userId,
        trashId: trash.id,
        pricePerKg: trash.hargaPerKg,
        totalPrice: trash.totalHarga,
        type: 'DEPOSIT'
      });
    }

    console.log('Migrasi berhasil!');
    process.exit();
  } catch (error) {
    console.error(' Migrasi gagal:', error);
    process.exit(1);
  }
})();
