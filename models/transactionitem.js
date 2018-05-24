'use strict';
// const Item = require('./item');
module.exports = (sequelize, DataTypes) => {
  var TransactionItem = sequelize.define('TransactionItem', {
    transactionId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    itemQty: DataTypes.INTEGER
  }, {});
  TransactionItem.associate = function (models) {
    // associations can be defined here
    TransactionItem.belongsTo(models.Item, { foreignKey: 'itemId' })
  };
  TransactionItem.hook('afterCreate', (transItem, options) => {
    let itemId = transItem.itemId
    let Item = sequelize.models.Item
    Item.findById(itemId)
      .then(function (item) {
        let remaindStock = item.stock - transItem.itemQty
        Item.update({ stock: remaindStock }, {
          where: { id: item.id }
        })
          .then(function (changes) {
            console.log('update stock', changes)
          })
          .catch(function (err) {
            console.log(err.message)
          })
      })
      .catch(function (err) {
        console.log(err.message);
      })
  })
  return TransactionItem;
};