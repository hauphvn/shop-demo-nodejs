'use strict';

const STATUS_CODE = require('./statusCodes');
const REASON_STATUS_CODE = require('./reasonPhrases');

class SuccessResponse {
    constructor(message, statusCode = STATUS_CODE.OK, reasonStatusCode = REASON_STATUS_CODE.OK, metadata = {}) {
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode;
        this.metadata = metadata
    };

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }

}

class OK_RESPONSE extends SuccessResponse {
    constructor({message, metadata}) {
        super(message, metadata);
    }
}

class CREATED_RESPONSE extends SuccessResponse{
    constructor({options={}, message, statusCode = STATUS_CODE.CREATED, reasonStatusCode = REASON_STATUS_CODE.CREATED, metadata}) {
        super(message, statusCode, reasonStatusCode, metadata);
        this.options = options;
    }
}

module.exports = {
    OK_RESPONSE,
    CREATED_RESPONSE,
    SuccessResponse
}