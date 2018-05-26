const express = require('express');
const router = express.Router();
const models = require('../models');
const User = models.User;
const bcrypt = require('bcrypt');
const isAuthenticated = require('../middleware/authentication');

router.get('/', (req, res) => {
    let objcurrUser = {};
    objcurrUser.id = req.session.userId
    objcurrUser.username = req.session.username
    objcurrUser.role = req.session.role
    console.log(req.session.username);
    res.render('login', {currentUser:objcurrUser, messages: ''});
});

router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({
        where: {username:username}
    })
    .then(function(user){
        let objcurrUser = {};
        objcurrUser.id = req.session.userId
        objcurrUser.username = req.session.username
        objcurrUser.role = req.session.role
        if (user){
            let cekPassword = bcrypt.compareSync(password, user.password);
            if (cekPassword){
                req.session.userId = user.id
                req.session.username = user.username;
                req.session.role = user.role;
                res.redirect('/');
            }else{
                res.render('login', {currentUser:objcurrUser, messages:'Incorrect username/password'});
            }
        }else{
            res.render('login', {currentUser:objcurrUser, messages:'Incorrect username/password'});
        }
    })
    .catch(function(err){
        res.send(err.message);
    })
})

module.exports = router;