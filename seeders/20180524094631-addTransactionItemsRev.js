'use strict';

const fs = require('fs');
const transactionItemString = fs.readFileSync(__dirname + '/transactionItems.csv', 'utf8');
const arrTransactionItem = transactionItemString.split('\n');

let transactionItems = [];
for (let i = 0; i < arrTransactionItem.length; i++) {
  if (arrTransactionItem[i].length !== 0) {
    const transactionItem = arrTransactionItem[i].split(',');
    transactionItems.push({
      transactionId: transactionItem[0],
      itemId: transactionItem[1],
      itemQty: transactionItem[2],
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
}


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
    return queryInterface.bulkInsert('TransactionItems', transactionItems, {});
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
