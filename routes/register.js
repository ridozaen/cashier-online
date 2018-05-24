const express = require('express');
const router = express.Router();
const models = require('../models');
const isAuthorized = require('../middleware/authorization');
const User =  models.User;

router.get ('/', (req,res)=>{
    res.render('register')
})


router.post ('/', (req,res)=>{
    console.log(req.body)
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
        res.redirect('/login')
    })
    .catch(function(err){
        res.send(err.message);
    })
})

module.exports = router;