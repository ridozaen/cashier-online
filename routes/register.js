const express = require('express');
const router = express.Router();
const models = require('../models');
const isAuthorized = require('../middleware/authorization');
const User =  models.User;

router.get ('/', (req,res)=>{
    let objcurrUser = {};
    objcurrUser.id = req.session.userId
    objcurrUser.username = req.session.username
    objcurrUser.role = req.session.role
    res.render('register',{currentUser: objcurrUser, message: ''})
})


router.post ('/', (req,res)=>{
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let username = req.body.username;
    let password = req.body.password;
    let address = req.body.address;
    let role = req.body.role;
    User.create({
        firstName,
        lastName,
        username,
        password,
        address,
        role
    })
    .then(function(user){
        res.redirect('/');
    })
    .catch(function(err){
        let objcurrUser = {};
        objcurrUser.id = req.session.userId
        objcurrUser.username = req.session.username
        objcurrUser.role = req.session.role
        res.render('register',{ currentUser: objcurrUser , message : err.message});
    })
})

module.exports = router;