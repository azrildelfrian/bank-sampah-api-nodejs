'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trashId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pricePerKg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('DEPOSIT', 'WITHDRAWAL'),
      allowNull: false
    }
  }, {
    tableName: 'transactions',
    timestamps: true
  });

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User, { foreignKey: 'userId' });
    Transaction.belongsTo(models.Trash, { foreignKey: 'trashId' });
  };

  return Transaction;
};
