const express = require('express');
const router = express.Router();
const models = require("../models")

router.get('/',function(req,res) {
	models.Transaction.findAll({
		include:models.Item,
		order: [
			["id","ASC" ]
		]

	})
	.then((dataTransactions)=>{
		// res.send(dataTransactions)
		res.render("list_transaction",{dataTransactions:dataTransactions})	
	})
})

router.get('/mostSellAllTime',function(req,res) {
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

// Product.findAll({
// 	include: [
// 		{models: 'Transaction'},

// 	]
// })

module.exports = router