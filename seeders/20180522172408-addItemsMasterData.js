'use strict';

const fs = require('fs');
const itemsString = fs.readFileSync(__dirname + '/items.csv', 'utf8');
const arrItems = itemsString.split('\n');

let items = [];
for (let i = 0; i < arrItems.length; i++) {
  if (arrItems[i].length !== 0) {
    const item = arrItems[i].split(',');
    items.push({
      name: item[0],
      brand: item[1],
      price: Number(item[2]),
      stock: Number(item[3]),
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
    return queryInterface.bulkInsert('Items', items, {});
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
