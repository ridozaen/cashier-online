'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    transactionDate: DataTypes.DATE
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};