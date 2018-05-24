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

router.get('/mostSellAllTime',function(req,res) {

	var query = `SELECT "TransactionItem"."itemId", SUM("itemQty") AS "total_qty", 
		"Item"."id" AS "Item.id", "Item"."name" AS "Item.name", "Item"."brand" AS "Item.brand", 
		"Item"."price" AS "Item.price", "Item"."stock" AS "Item.stock",
		"Item"."createdAt" AS "Item.createdAt", "Item"."updatedAt" AS "Item.updatedAt" 
		FROM "TransactionItems" AS "TransactionItem" 
		LEFT OUTER JOIN "Items" AS "Item" ON "TransactionItem"."itemId" = "Item"."id" 
		GROUP BY "itemId", "Item.id" 
		ORDER BY "total_qty" DESC 
		LIMIT 5;`

	models.sequelize.query(query).then((dataItems) => {
		// res.send(dataItems)
		res.render("mostSellAllTime_item",{dataItems:dataItems})

	  // Results will be an empty array and metadata will contain the number of affected rows.
		
	})

})

router.get('/lessSellAllTime',function(req,res) {

	var query = `SELECT "TransactionItem"."itemId", SUM("itemQty") AS "total_qty", 
		"Item"."id" AS "Item.id", "Item"."name" AS "Item.name", "Item"."brand" AS "Item.brand", 
		"Item"."price" AS "Item.price", "Item"."stock" AS "Item.stock",
		"Item"."createdAt" AS "Item.createdAt", "Item"."updatedAt" AS "Item.updatedAt" 
		FROM "TransactionItems" AS "TransactionItem" 
		LEFT OUTER JOIN "Items" AS "Item" ON "TransactionItem"."itemId" = "Item"."id" 
		GROUP BY "itemId", "Item.id" 
		ORDER BY "total_qty" ASC 
		LIMIT 5;`

	models.sequelize.query(query).then((dataItems) => {
		// res.send(dataItems)
		res.render("lessSellAllTime_item",{dataItems:dataItems})
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
	  // Results will be an empty array and metadata will contain the number of affected rows.
		

router.post('/mostSellByYear',function(req,res){
	
	var query = `SELECT 		
		"TransactionItem"."itemId", 
		SUM("itemQty") AS "total_qty", 
		"Item"."id" AS "Item.id", "Item"."name" AS "Item.name", 
		"Item"."brand" AS "Item.brand", 
		"Item"."price" AS "Item.price", 
		"TransactionItem"."transactionId" AS "TransactionItem.transactionId", 
		"TransactionItem"."transactionId" AS "TransactionItem.transactionId",
		TO_CHAR("Transaction"."transactionDate", 'DD-MON-YYYY') AS "Transaction.transactionDate"
		FROM "TransactionItems" AS "TransactionItem" 


		LEFT OUTER JOIN "Items" AS "Item" 
		ON "TransactionItem"."itemId" = "Item"."id" 

		LEFT OUTER JOIN "Transactions" AS "Transaction" 
		ON "TransactionItem"."transactionId" = "Transaction"."id"

		WHERE "transactionDate" >= '${req.body.year}-01-01 00:00:00' 
		AND  "transactionDate" <  '${(Number(req.body.year)+1).toString()}-01-01 00:00:00'
		
		GROUP BY "TransactionItem.transactionId","transactionDate","itemId", "Item.id"
		ORDER BY "total_qty" DESC 
		; `

	models.sequelize.query(query).then((dataItems) => {
		// res.send(dataItems)
		var newArr=[]
		for(var i=0;i<dataItems[0].length;i++) {
			  var count = 1
			  for(var j=0;j<newArr.length;j++){
			    if(dataItems[0][i].itemId == newArr[j]){
			      count*=0
			    }
			  }
			  if(count==1){
			    newArr.push(dataItems[0][i].itemId)
			  }
		}
		var expectedId = newArr.slice(0,5)

		// res.send(newArr)
		var arrMostItem=[]
		for(var j=0;j<expectedId.length;j++) {
			var objMostItem={}
			var countQty=0
			for(var k=0;k<dataItems[0].length;k++) {
				if(expectedId[j]==dataItems[0][k].itemId) {
					countQty+= Number(dataItems[0][k]["total_qty"])
					objMostItem["itemId"] = dataItems[0][k]["itemId"]
					objMostItem["item.name"] = dataItems[0][k]["Item.name"]
					objMostItem["item.brand"] = dataItems[0][k]["Item.brand"]
					objMostItem["total_qty"] = countQty
				}

			}
			console.log(objMostItem)
			arrMostItem.push(objMostItem)
		}
		// res.send(arrMostItem)	

		res.render("mostSellByYear_item",{year:req.body.year,arrMostItem:arrMostItem})	
	})

})

router.post('/mostSellByMonth',function(req,res){
	var query = `SELECT 		
		"TransactionItem"."itemId", 
		SUM("itemQty") AS "total_qty", 
		"Item"."id" AS "Item.id", "Item"."name" AS "Item.name", 
		"Item"."brand" AS "Item.brand", 
		"Item"."price" AS "Item.price", 
		"TransactionItem"."transactionId" AS "TransactionItem.transactionId", 
		"TransactionItem"."transactionId" AS "TransactionItem.transactionId",
		TO_CHAR("Transaction"."transactionDate", 'DD-MON-YYYY') AS "Transaction.transactionDate"
		FROM "TransactionItems" AS "TransactionItem" 


		LEFT OUTER JOIN "Items" AS "Item" 
		ON "TransactionItem"."itemId" = "Item"."id" 

		LEFT OUTER JOIN "Transactions" AS "Transaction" 
		ON "TransactionItem"."transactionId" = "Transaction"."id"

		WHERE "transactionDate" >= '${req.body.year}-${req.body.month}-01 00:00:00' 
		AND  "transactionDate" <  '${req.body.year}-${(Number(req.body.month)+1).toString()}-01 00:00:00'
		
		GROUP BY "TransactionItem.transactionId","transactionDate","itemId", "Item.id"
		ORDER BY "total_qty" DESC 
		; `

	models.sequelize.query(query).then((dataItems) => {
		// res.send(dataItems)
		var newArr=[]
		for(var i=0;i<dataItems[0].length;i++) {
			  var count = 1
			  for(var j=0;j<newArr.length;j++){
			    if(dataItems[0][i].itemId == newArr[j]){
			      count*=0
			    }
			  }
			  if(count==1){
			    newArr.push(dataItems[0][i].itemId)
			  }
		}
		var expectedId = newArr.slice(0,5)

		// res.send(newArr)
		var arrMostItem=[]
		for(var j=0;j<expectedId.length;j++) {
			var objMostItem={}
			var countQty=0
			for(var k=0;k<dataItems[0].length;k++) {
				if(expectedId[j]==dataItems[0][k].itemId) {
					countQty+= Number(dataItems[0][k]["total_qty"])
					objMostItem["itemId"] = dataItems[0][k]["itemId"]
					objMostItem["item.name"] = dataItems[0][k]["Item.name"]
					objMostItem["item.brand"] = dataItems[0][k]["Item.brand"]
					objMostItem["total_qty"] = countQty
				}

			}
			console.log(objMostItem)
			arrMostItem.push(objMostItem)
		}
		 // res.send(arrMostItem)	

		res.render("mostSellByMonth_item",{year:req.body.year,month:req.body.month,arrMostItem:arrMostItem})	
	})

})

router.post('/mostSellByWeek',function(req,res){
	// res.send(req.body)
	var query = `SELECT 		
		"TransactionItem"."itemId", 
		SUM("itemQty") AS "total_qty", 
		"Item"."id" AS "Item.id", "Item"."name" AS "Item.name", 
		"Item"."brand" AS "Item.brand", 
		"Item"."price" AS "Item.price", 
		"TransactionItem"."transactionId" AS "TransactionItem.transactionId", 
		"TransactionItem"."transactionId" AS "TransactionItem.transactionId",
		TO_CHAR("Transaction"."transactionDate", 'DD-MON-YYYY') AS "Transaction.transactionDate"
		FROM "TransactionItems" AS "TransactionItem" 


		LEFT OUTER JOIN "Items" AS "Item" 
		ON "TransactionItem"."itemId" = "Item"."id" 

		LEFT OUTER JOIN "Transactions" AS "Transaction" 
		ON "TransactionItem"."transactionId" = "Transaction"."id"

		WHERE "transactionDate" >= '${req.body.year}-${req.body.month}-${(Number(req.body.week)-7).toString()} 00:00:00' 
		AND  "transactionDate" <  '${req.body.year}-${req.body.month}-${req.body.week} 00:00:00'
		
		GROUP BY "TransactionItem.transactionId","transactionDate","itemId", "Item.id"
		ORDER BY "total_qty" DESC 
		; `

	models.sequelize.query(query).then((dataItems) => {
		// res.send((Number(req.body.week)-7).toString())
		var newArr=[]
		for(var i=0;i<dataItems[0].length;i++) {
			  var count = 1
			  for(var j=0;j<newArr.length;j++){
			    if(dataItems[0][i].itemId == newArr[j]){
			      count*=0
			    }
			  }
			  if(count==1){
			    newArr.push(dataItems[0][i].itemId)
			  }
		}
		var expectedId = newArr.slice(0,5)

		// res.send(newArr)
		var arrMostItem=[]
		for(var j=0;j<expectedId.length;j++) {
			var objMostItem={}
			var countQty=0
			for(var k=0;k<dataItems[0].length;k++) {
				if(expectedId[j]==dataItems[0][k].itemId) {
					countQty+= Number(dataItems[0][k]["total_qty"])
					objMostItem["itemId"] = dataItems[0][k]["itemId"]
					objMostItem["item.name"] = dataItems[0][k]["Item.name"]
					objMostItem["item.brand"] = dataItems[0][k]["Item.brand"]
					objMostItem["total_qty"] = countQty
				}

			}
			// console.log(objMostItem)
			arrMostItem.push(objMostItem)
		}
		 // res.send(arrMostItem)	
		 
		res.render("mostSellByWeek_item",{arrMostItem:arrMostItem,year:req.body.year,month:req.body.month,week:req.body.week})	
	})

})

module.exports = router