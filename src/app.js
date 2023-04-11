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
const {ServerError, NotFound} = require("../src/core/error.response");
const {NOT_FOUND : NOT_FOUND_STATUS_CODE} = require("../src/core/statusCodes");
const {NOT_FOUND : NOT_FOUND_STATUS_MSG} = require("../src/core/reasonPhrases");
// const {checkOverloadConnection} = require('./helpers/check.connect');
// checkOverloadConnection();
// Init router
app.use("/", require("./routes"));
//Handling error
//Level 0:
app.use((req, res, next) => {
    const error = new Error(NOT_FOUND_STATUS_MSG);
    error.status = NOT_FOUND_STATUS_CODE;
    next(error);
});
app.use((error, req, res, next) => {
    if(error.status === NOT_FOUND_STATUS_CODE){
        const notFound = new NotFound();
        return res.status(notFound.status).json(
            {
                status: 'error',
                code: notFound.status,
                message: notFound.message,
            }
        );
    }else{
        const serverError = new ServerError();
        // const errorStatus = error?.status || 500;
        return res.status(serverError.status).json(
            {
                status: 'error',
                code: serverError.status,
                message: serverError.message,
            }
        );
    }

});
module.exports = app;
