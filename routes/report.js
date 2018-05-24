const express = require('express');
const router = express.Router();
const models = require('../models');
const User = models.User;
const Transaction = models.Transaction;

router.get('/employeeofthemonth', (req, res) => {
    let objcurrUser = {};
    objcurrUser.id = req.session.userId
    objcurrUser.username = req.session.username
    objcurrUser.role = req.session.role
    res.render('empOfTheMonth', { currentUser: objcurrUser, emp: {} })
})

router.post('/employeeofthemonth', (req, res) => {
    let month = req.body.month;
    let date = new Date();
    let year = date.getFullYear();
    let startDate = `${year}-${month}-01T00:00:00.000Z"`
    let endDate = `${year}-${month}-28T00:00:00.000Z"`
    Transaction.findAll({
        where: {
            transactionDate: {
                '$between': [
                    startDate,
                    endDate
                ]
            }
        },
        attributes: [[models.sequelize.col('userId'), 'userId'], [models.sequelize.fn('sum', models.sequelize.col('numberOfItems')), 'total']],
        include: [User],
        group: ['userId', 'User.id'],
        order: models.sequelize.literal('total DESC'),
        limit: 1
    })
        .then(function (emp) {
            let objcurrUser = {};
            objcurrUser.id = req.session.userId
            objcurrUser.username = req.session.username
            objcurrUser.role = req.session.role
            if (emp){
                objEmp = {
                    fullName: emp[0].User.getFullName(),
                    username: emp[0].User.username,
                    address: emp[0].User.address
                }
                res.render('empOfTheMonth', { currentUser: objcurrUser, emp: objEmp })
            }else{
                res.render('empOfTheMonth', { currentUser: objcurrUser, emp: {} })
            }
        })
        .catch(function (err) {
            res.send(err.message)
        })
});
module.exports = router