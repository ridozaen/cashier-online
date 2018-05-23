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
    return queryInterface.bulkInsert('TransactionItems', [{
        transactionId: 3,
        itemId: 1,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 3,
        itemId: 2,
        itemQty: 3,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 3,
        itemId: 3,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 3,
        itemId: 4,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 3,
        itemId: 5,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 2,
        itemId: 1,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 2,
        itemId: 2,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 2,
        itemId: 5,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 2,
        itemId: 6,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 2,
        itemId: 7,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 2,
        itemId: 8,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 2,
        itemId: 9,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 2,
        itemId: 10,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 2,
        itemId: 11,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 2,
        itemId: 12,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 2,
        itemId: 13,
        itemQty: 5,
        createdAt: new Date,
        updatedAt: new Date
      },{
        transactionId: 2,
        itemId: 14,
        itemQty: 5,
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
