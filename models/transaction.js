'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    transactionDate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    numberOfItems : DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsToMany(models.Item,{through:'TransactionItem',foreignKey:'transactionId'})
    Transaction.belongsTo(models.User,{foreignKey: 'userId'})
  };

  //class method
  // Transaction.getMostItem = function () {
  //   return Transaction.findAll({
  //     attributes : [[models.sequelize.col('userId'),'userId'],[models.sequelize.fn('sum', models.sequelize.col('numberOfItems')), 'total']],
  //     group : ['userId']
  //   })
  // }
  return Transaction;
};