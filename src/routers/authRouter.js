const express = require('express');
const authRouter = express.Router();
const {MongoClient, ObjectId} = require('mongodb');
const debug = require('debug')('app:authRouter');

authRouter.route('/signUp').post((req,res)=>{
    const {username,password}= req.body;
    const url = 'mongodb://localhost:27017/?retryWrites=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000';
    const dbName = 'globomantics';

    (async function addUser() {
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to mongodb....');
            const db = client.db(dbName);
            const user={username,password};
            const results = await db.collection('users').insertOne(user);
            debug(results);
            var createdUser= await db.collection('users').findOne({_id:new ObjectId(results.insertedId)});
            req.login(createdUser,()=>{
                res.redirect('/auth/profile');
            });

            
        }
        catch (error) {
            debug(error);
        }
        client.close();
    }());
   


    
});


authRouter.route('/profile').get((req,res)=>{
    res.json(req.user);

});



module.exports=authRouter;