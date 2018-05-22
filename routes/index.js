const express = require('express');
const router = express.Router();

//routes homepage
router.get('/', (req,res)=>{
    res.send('halaman homepage')
})

module.exports = router;