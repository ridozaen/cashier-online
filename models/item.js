'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};