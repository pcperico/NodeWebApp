const passport = require('passport');
const {Strategy} = require('passport-local');
const debug = require('debug')('app:localStrategy');
const {MongoClient, ObjectId} = require('mongodb');

module.exports = function localStrategy()
{
    passport.use(new Strategy({
        usernameField:'username',
        passwordField:'password'
    },(username,password,done)=>{
        const url = 'mongodb://localhost:27017/?retryWrites=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000';
        const dbName = 'globomantics';
        (async function validateUser() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected to mongodb....');
                const db = client.db(dbName);                
                const user= await db.collection('users').findOne({username});
                debug(user);
                if(user && user.password===password){
                    done(null,user);
                }
                else{
                    done(null,false);
                }
            }
            catch (error) {
                debug(error);
            }
            client.close();
        }());
    }));
};