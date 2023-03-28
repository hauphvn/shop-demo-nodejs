'use strict'
const {db: {host, port, name}} = require('../configs/config.mongodb');
const mongoose = require('mongoose');
const connectString = `mongodb://${host}:${port}/${name}`;
console.log('connection string:: ', connectString);
mongoose.connect(connectString).then(_ => {
    console.log("Connected mongodb success");
}).catch(err => console.log(`Error connect mongodb: ${err}`));

if(1=== 0){
    mongoose.set('debug',true);
    mongoose.set('debug',{color: true});
}

module.exports = mongoose;