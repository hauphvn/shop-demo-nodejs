require('dotenv').config();
const express = require('express');
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

//Init middleware
app.use(morgan('combined'));
app.use(helmet());
app.use(compression());
//Init database
require('./dbs/init.mongodb');
// const {checkOverloadConnection} = require('./helpers/check.connect');
// checkOverloadConnection();
//Init routes
app.get('/',(req, res,next) => {
    const hello = 'hello';
    return res.status(200).json({
        message: 'welcome',
        // metadata: hello.repeat(900000)
    });
});
//Handling error

module.exports = app;