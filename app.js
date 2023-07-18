const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public')));

app.set('views','./src/views');
app.set('view engine','ejs');




app.get('/',(req,res)=>{
    res.render('index',{title: ' Globomantics'});
});

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    debug(`Server  listing on port: ${chalk.green(PORT)}` );
});