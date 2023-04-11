'use strict';
const STATUS_CODE = require('./statusCodes');
const REASON_STATUS_CODE = require('./reasonPhrases');
class ErrorResponse extends Error {

    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse{
    constructor(message = REASON_STATUS_CODE.CONFLICT, statusCode = STATUS_CODE.FORBIDDEN) {
        super(message, statusCode  );
    }
}

class BadRequestError extends ErrorResponse{
    constructor(message = REASON_STATUS_CODE.BAD_REQUEST, statusCode = STATUS_CODE.BAD_REQUEST) {
        super(message, statusCode);
    }
}

class ForbiddenError extends ErrorResponse{
    constructor(message = REASON_STATUS_CODE.FORBIDDEN, statusCode = STATUS_CODE.FORBIDDEN) {
        super(message, statusCode);
    }
}

class ServerError extends ErrorResponse{
    constructor(message = REASON_STATUS_CODE.INTERNAL_SERVER_ERROR, statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR) {
        super(message, statusCode);
    }
}

class NotFound extends ErrorResponse {
    constructor(message = REASON_STATUS_CODE.NOT_FOUND, statusCode = STATUS_CODE.NOT_FOUND) {
        super(message, statusCode);
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    ForbiddenError,
    ServerError,
    NotFound
}