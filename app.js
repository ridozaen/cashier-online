const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');
const session = require('express-session');
const items = require('./routes/items');
const transactions = require('./routes/transactions')

const app = express();

app.use(session({
    secret:'0912uk!&#s82b!@#',
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.locals.currencyHelper = require("./helper/currencyHelper.js")
app.locals.totalPriceHelper = require("./helper/totalPriceHelper.js")
app.use('/', routes);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/items', items);
app.use('/transactions',transactions);


app.listen(3000, ()=>{
    console.log ('server start at 3000...')
});