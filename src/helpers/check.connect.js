const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 5000;
//Count connect to db
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log('Number of connections::', numConnection);
}

//Check overload connection
const checkOverloadConnection = () => {
    const numCores = os.cpus().length;
    setInterval(() => {
        const memoryUsage = process.memoryUsage().rss;
        const numConnections = mongoose.connections.length;
// Example maximum number of connections base on number of cores
        const maxConnection = numCores * 5;
        if(numConnections > maxConnection){
            console.log(`Connection overload detected`);
        }
        console.log(`Number of cores::`, numCores);
        console.log(`Active connections::`, numConnections);
        console.log(`Memory usage::`, memoryUsage/1024/1024);
    }, _SECONDS);
}
module.exports = {
    countConnect,
    checkOverloadConnection
}