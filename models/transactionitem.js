'use strict';
module.exports = (sequelize, DataTypes) => {
  var TransactionItem = sequelize.define('TransactionItem', {
    transactionId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    itemQty: DataTypes.INTEGER
  }, {});
  TransactionItem.associate = function(models) {
    // associations can be defined here
  	TransactionItem.belongsTo(models.Item,{foreignKey: 'itemId'})
    TransactionItem.belongsTo(models.Transaction,{foreignKey: 'transactionId'})
  };
  return TransactionItem;
};