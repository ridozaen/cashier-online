const express = require('express');
const router = express.Router();
const models = require('../models');
const User = models.User;
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('login', {messages: ''});
});

router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({
        where: {username:username}
    })
    .then(function(user){
        if (user){
            let cekPassword = bcrypt.compareSync(password, user.password);
            if (cekPassword){
                req.session.username = user.username;
                req.session.role = user.role;
                res.redirect('/');
            }else{
                res.render('login', {messages:'Incorrect username/password'});
            }
        }else{
            res.render('login', {messages:'Incorrect username/password'});
        }
    })
    .catch(function(err){
        res.send(err.message);
    })
})

module.exports = router;