const express = require('express');
const router = express.Router();

//routes homepage
router.get('/', (req, res) => {
    let objcurrUser = {};
    objcurrUser.username = req.session.username
    objcurrUser.role = req.session.role
    console.log(objcurrUser)
    res.render('index', {currentUser: objcurrUser})
})

module.exports = router;