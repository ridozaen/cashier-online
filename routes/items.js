const express = require('express');
const router = express.Router();
const isAuthorized = require('../middleware/authorization')
const models = require("../models")

router.get('/',function(req,res) {
	models.Item.findAll({
		order:[
			['id','ASC']
		]
	})
	.then(dataItems=> {
		res.render("list_item",{dataItems:dataItems})
	})
})

router.get('/add',function(req,res) {
	res.render('add_item')
})

router.post('/add',function(req,res) {
	models.Item.create({
		name:req.body.name,
		brand:req.body.brand,
		price:req.body.price,
		stock:req.body.stock
	})
	.then(()=>{
		res.redirect('/items')
	})
})

router.get('/:id/edit',function(req,res) {
	models.Item.findById(req.params.id)
	.then(dataItem=>{
		res.render("edit_item.ejs",{dataItem:dataItem})
	})
})

router.post('/:id/edit',function(req,res) {
	models.Item.update({
		name:req.body.name,
		brand:req.body.brand,
		price:req.body.price,
		stock:req.body.stock
	},{where:{
			id:req.params.id
		}
	})
	.then(()=>{
		res.redirect('/items')
	})
})

router.get('/:id/delete',function(req,res) {
	models.Item.destroy({
		where:{
			id:req.params.id
		}
	})
	.then(()=>{
		res.redirect('/items')
	})
})

router.get('/showAllBrand',function(req,res) {
	models.Item.getAllBrand()
	.then(dataBrands=>{
		// res.send(dataBrands)
		res.render('allBrand_item',{dataBrands:dataBrands})
	})
})

module.exports = router