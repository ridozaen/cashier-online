'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

      return queryInterface.bulkInsert('Transactions', [{
        transactionDate: new Date,
        userId:2,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionDate: new Date,
        userId:2,
        createdAt: new Date,
        updatedAt: new Date 
      },{
        transactionDate: new Date,
        userId:2,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionDate: new Date,
        userId:2,
        createdAt: new Date,
        updatedAt: new Date 
      },{
        transactionDate: new Date,
        userId:2,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionDate: new Date,
        userId:3,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionDate: new Date,
        userId:3,
        createdAt: new Date,
        updatedAt: new Date     
      },{
        transactionDate: new Date,
        userId:3,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionDate: new Date,
        userId:2,
        createdAt: new Date,
        updatedAt: new Date    
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
