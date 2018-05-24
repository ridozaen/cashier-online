const express = require('express');
const router = express.Router();
const models = require("../models");
const isAuthenticated = require('../middleware/authentication');

router.get('/', function (req, res) {
	models.Transaction.findAll({
		include: models.Item,
		order: [
			["id", "ASC"]
		]

	})
		.then((dataTransactions) => {
			// res.send(dataTransactions)
			res.render("list_transaction", { dataTransactions: dataTransactions })
		})
})

router.get('/mostSellAllTime', function (req, res) {
	// models.Item.findAll({
	// 	include:models.Transaction,
	// 	// order: [
	// 	// 	['Transactions.length','ASC']

	// 	// ]
	// })
	// .then(dataItems=>{
	// 	res.send(dataItems)
	// 	res.render("mostSellAllTime_item",{dataItems:dataItems})
	// })

	// models.TransactionItem.findAll({
	// 	attributes: [
	// 	  'itemId', 
	//       [Sequelize.fn('SUM', Sequelize.col('itemQty')), 'total_qty']
	//     ],
	//     group:['itemId'],
	//     include: [{
	//         model: models.Item,
	//         attributes: [[ Sequelize.col('id'), 'id' ]],
	//         group: [Sequelize.col('id')]
	// 	}]
	// })
	// .then(function(transaction_items) {
	// 	res.send(transaction_items)
	// })

	var query = `SELECT "TransactionItem"."itemId", SUM("itemQty") AS "total_qty", 
		"Item"."id" AS "Item.id", "Item"."name" AS "Item.name", "Item"."brand" AS "Item.brand", 
		"Item"."price" AS "Item.price", "Item"."stock" AS "Item.stock",
		"Item"."createdAt" AS "Item.createdAt", "Item"."updatedAt" AS "Item.updatedAt" 
		FROM "TransactionItems" AS "TransactionItem" 
		LEFT OUTER JOIN "Items" AS "Item" ON "TransactionItem"."itemId" = "Item"."id" 
		GROUP BY "itemId", "Item.id"; `

	models.sequelize.query(query).then((results) => {
		res.send(results)
		// Results will be an empty array and metadata will contain the number of affected rows.
	})

})

//route /transactions/add
router.get('/add', function (req, res) {
	let objcurrUser = {};
	objcurrUser.id = req.session.userId
	objcurrUser.username = req.session.username
	objcurrUser.role = req.session.role
	res.render('add_Transaction', { currentUser: objcurrUser, transaction: {}, items:{}, numberOfItems: null });

});

router.post('/add', function (req, res) {
	let transactionDate = req.body.transDate;
	req.session.numberOfItems = req.body.numberOfItems;
	let numberOfItems = req.body.numberOfItems;
	let userId = req.session.userId
	models.Transaction.create({
		transactionDate,
		userId,
		numberOfItems
	})
		.then(function (transaction) {
			models.Item.findAll({
				order: [['id', 'ASC']]
			})
				.then(function (items) {
					let objcurrUser = {};
					objcurrUser.id = req.session.userId
					objcurrUser.username = req.session.username
					objcurrUser.role = req.session.role
					res.render('add_transaction', { currentUser: objcurrUser, transaction, items, numberOfItems });
				})
				.catch(function (err) {
					res.send(err.message);
				})
		})
		.catch(function (err) {
			res.send(err);
		})
})

router.post('/:id/add', function (req, res) {
	let transactionId = req.params.id;
	if (req.session.numberOfItems) {
		for (let i = 0; i < req.session.numberOfItems; i++) {
			let itemId = req.body.itemList[i];
			let itemQty = parseInt(req.body.itemQty[i]);
			models.Item.findById(itemId)
				.then(function (item) {
					let stockRemind = item.stock - itemQty;
					if (stockRemind >= 0) {
						models.TransactionItem.create({
							transactionId: transactionId,
							itemId: itemId,
							itemQty: itemQty
						})
							.then(function (transactionItem) {
								console.log('created success')
							})
							.catch(function (err) {
								res.send(err.message)
							})
					} else {
						console.log('stock minus');
					}
				})
				.catch(function (err) {
					res.send(err.message);
				})
		}
		res.redirect('/transactions/add');
	}
})

module.exports = router