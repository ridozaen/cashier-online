const express = require('express');
const router = express.Router();
const models = require('../models');
const User =  models.User;

router.get('/',(req,res)=>{
    User.findAll({
		order : [['id', 'ASC']]
	})
    .then(function(users){
        let objcurrUser = {};
        objcurrUser.id = req.session.userId
        objcurrUser.username = req.session.username
        objcurrUser.role = req.session.role
        res.render('userList', {currentUser : objcurrUser, users})
    })
    .catch(function(err){
        res.send(err.message)
    })
})

router.get('/:id/edit',function(req,res) {
	User.findById(req.params.id)
	.then(user=>{
		res.render("edit_user.ejs",{user:user})
	})
})

router.post('/:id/edit',function(req,res) {
	User.update({
		firstName:req.body.firstName,
		lastName:req.body.lastName,
		address:req.body.address,
		role:req.body.role
	},{where:{
			id:req.params.id
		}
	})
	.then(()=>{
		res.redirect('/users')
	})
	.catch((err)=>{
		res.send(err.message)
	})
})

router.get('/:id/delete',function(req,res) {
	User.destroy({
		where:{
			id:req.params.id
		}
	})
	.then(()=>{
		res.redirect('/users')
	})
	.catch((err)=>{
		res.send(err.message)
	})
})


module.exports = router;