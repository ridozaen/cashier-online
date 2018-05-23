const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const register = require('./routes/register');
const items = require('./routes/items');
const transactions = require('./routes/transactions')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.locals.currencyHelper = require("./helper/currencyHelper.js")
app.locals.totalPriceHelper = require("./helper/totalPriceHelper.js")
app.use('/', routes);
app.use('/register', register);
app.use('/items',items);
app.use('/transactions',transactions);


app.listen(3000, ()=>{
    console.log ('server start at 3000...')
});