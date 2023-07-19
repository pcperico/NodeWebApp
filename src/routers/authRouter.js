const express = require('express');
const authRouter = express.Router();
const {MongoClient} = require('mongodb');

authRouter.route('/signUp').post((req,res)=>{
    //TODO creae user
    req.login(req.body,()=>{
        res.redirect('/auth/profile');
    });
});


authRouter.route('/profile').get((req,res)=>{
    res.json(req.user);
    
});



module.exports=authRouter;