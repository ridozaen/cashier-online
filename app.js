const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use('/', routes);


app.listen(3000, ()=>{
    console.log ('server start at 3000...')
});