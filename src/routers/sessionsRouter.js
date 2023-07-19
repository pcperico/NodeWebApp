const express = require('express');
const sessionsRouter = express.Router();
const debug = require('debug')('app:sessionsRouter');
const { MongoClient, ObjectId } = require('mongodb');


sessionsRouter.use((req,res,next)=>{
    if(req.user){
        next();
    }
    else{
        res.redirect('/auth/signIn');
    }
});

sessionsRouter.route('/')
    .get((req, res) => {
        const url = 'mongodb://localhost:27017/?retryWrites=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000';
        const dbName = 'globomantics';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected to mongodb....');
                const db = client.db(dbName);
                const sessions = await db.collection('sessions').find().toArray();
                res.render('sessions', {
                    sessions
                });
            }
            catch (error) {
                debug(error.stack);
            }
            client.close();
        }());
       
    });

sessionsRouter.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        const url = 'mongodb://localhost:27017/?retryWrites=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000';
        const dbName = 'globomantics';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected to mongodb....');
                const db = client.db(dbName);
                const session = await db.collection('sessions').findOne({_id : new ObjectId(id)});
                debug(`session value: ${session} for id: ${id}`);
                res.render('session', { session: session });
            }
            catch (error) {
                debug(error.stack);
            }

        }());
        
    });

module.exports = sessionsRouter;