const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();

const sessionsRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public')));

app.set('views','./src/views');
app.set('view engine','ejs');

sessionsRouter.route('/')
    .get((req,res)=>{
        res.send('hello sessions');
    });

sessionsRouter.route('/1')
    .get((req,res)=>{
        res.send('hello single sessions');
    });

app.use('/sessions',sessionsRouter);

app.get('/',(req,res)=>{
    res.render('index',{title: ' Globomantics'});
});

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    debug(`Server  listing on port: ${chalk.green(PORT)}` );
});