'use strict';

const fs = require('fs');
const transactionString = fs.readFileSync(__dirname + '/transactions.csv', 'utf8');
const arrTransaction = transactionString.split('\n');

let transactions = [];
for (let i = 0; i < arrTransaction.length; i++) {
  if (arrTransaction[i].length !== 0) {
    const transaction = arrTransaction[i].split(',');
    transactions.push({
      transactionDate: transaction[0],
      userId: transaction[1],
      numberOfItems : transaction[2],
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
     return queryInterface.bulkInsert('Transactions', transactions, {});
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
