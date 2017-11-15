const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before(done=>{
    mongoose.connect('mongodb://localhost/test', {useMongoClient: true});

    mongoose.connection
    .once('open', ()=>{done()})
    .on('error', error=>console.warn('DB connection error: ', error));
});

beforeEach(done=>{
    mongoose.connection.collections.users.drop(()=>{
        done();
    });
});
