'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER
  }, {});

  Item.getAllBrand = function() {
   return Item.findAll({
      attributes:['brand'],
      group:'brand'
    })
  }

  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsToMany(models.Transaction,{through:'TransactionItem',foreignKey: 'itemId'})
    Item.hasMany(models.TransactionItem,{foreignKey: 'itemId'})
  };
  return Item;
};