require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

//Init middleware
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Init database
require("./dbs/init.mongodb");
// const {checkOverloadConnection} = require('./helpers/check.connect');
// checkOverloadConnection();
// Init router
app.use("/", require("./routes"));
//Handling error
//Level 0:
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    const errorStatus = error?.status || 500;
    return res.status(errorStatus).json(
        {
            status: 'error',
            code: errorStatus,
            message: errorStatus?.message || 'Internal Server Error',
        }
    );
});
module.exports = app;
