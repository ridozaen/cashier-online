const express = require('express');
const router = express.Router();
const isAuthorized = require('../middleware/authorization')

router.get('/', isAuthorized, (req, res) => {
    res.send('items')
});

module.exports = router;