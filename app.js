const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const passport=require('passport');
const cookieParser=require('cookie-parser');
const session = require('express-session');


const app = express();



app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret:'gobomantics'}));


require('./src/config/passport.js')(app);


app.set('views','./src/views');
app.set('view engine','ejs');


const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');

app.use('/sessions',sessionsRouter);
app.use('/admin',adminRouter);
app.use('/auth',authRouter);

app.get('/',(req,res)=>{
    res.render('index',{title: ' Globomantics'});
});

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    debug(`Server  listing on port: ${chalk.green(PORT)}` );
});