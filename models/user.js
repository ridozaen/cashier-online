'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.TEXT,
    role: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Transaction, {foreignKey: 'userId'})
  };
  User.hook('beforeCreate', (user, options)=>{
    const salt = 7;
    const plainPassword = user.password;
    let hash = bcrypt.hashSync(plainPassword,salt);
    user.password = hash;
  })
  //instance method
  User.prototype.getFullName = function(){
    return this.firstName + ' ' + this.lastName
  }
  return User;
};