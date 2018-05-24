const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');
const session = require('express-session');
const items = require('./routes/items');
const report = require('./routes/report');
const transactions = require('./routes/transactions');
const isAuthenticated = require('./middleware/authentication');
const isAuthorized = require('./middleware/authorization');

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
app.locals.dateToString = require('./helper/dateToString');

app.use('/', routes);
app.use('/register',isAuthorized, register);
app.use('/login', login);
app.use('/logout', isAuthenticated, logout);
app.use('/items',isAuthorized, items);
app.use('/transactions',isAuthenticated,transactions);
app.use('/report',isAuthorized,report);

const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log (`server starts on ${port}`)
});