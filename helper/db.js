const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/databasename', {useNewUrlParser:true});
    mongoose.connection.on('open', () => {
        console.log('MongoDb: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDb: Error', err);
    });
    mongoose.Promise=global.Promise;
};