const express = require('express');
const router = express.Router();

//routes homepage
router.get('/', (req, res) => {
    let objcurrUser = {};
    objcurrUser.id = req.session.userId
    objcurrUser.username = req.session.username
    objcurrUser.role = req.session.role
    res.render('index', {currentUser: objcurrUser})
})

module.exports = router;