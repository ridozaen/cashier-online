const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');
const items = require('./routes/items');
const session = require('express-session');
const app = express();

app.use(session({
    secret:'0912uk!&#s82b!@#',
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use('/', routes);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/items', items);


app.listen(3000, ()=>{
    console.log ('server start at 3000...')
});