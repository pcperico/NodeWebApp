const express = require('express');
const adminRouter = express.Router();
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:adminRouter');
const sessions = require('../data/sessions.json');


adminRouter.route('/').get((req,res)=>{
    const url ='mongodb://localhost:27017/?retryWrites=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000';
    const dbName='globomantics';

    (async function mongo(){
        let client;
        try{
            client = await MongoClient.connect(url);
            debug('Connected to mongodb....');
            const db=client.db(dbName);
            const response = await db.collection('sessions').insertMany(sessions);
            res.json(response);
        }
        catch(error)
        {
            debug(error.stack);
        }

    }());

});

module.exports = adminRouter;