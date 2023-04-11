'use strict';
const {findById} = require('../services/apiKey.service');
const {ForbiddenError} = require("../core/error.response");
const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}
const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
             // throw new ForbiddenError('Forbidden Error key');

            //Level 0
            return res.status(403).json({
                message: 'Forbidden Error1'
            });
        }
        const objKey = await findById(key);
        if (!objKey) {

            //Level 1
            //  throw new ForbiddenError('Forbidden Error objkey');

            //Level 0
            return res.status(403).json({
                message: 'Forbidden Error2'
            });
        }
        req.objKey = objKey;
        return next();
    } catch (e) {
        return {}
    }
}

/***
 * This is an example closure function in js
 * This is can return a function, which can use parent's params such  as: req, res, next
 * @param permission
 * @returns {(function(*, *, *))|*}
 */
const permission = (permission) => {
    return (req, res, next) => {
        if (!req?.objKey.permissions) {
            return res.status(403).json({
                message: 'Permission denies 1'
            });
        }
        const validPermission = req?.objKey?.permissions.includes(permission);
        console.log('valid permission: ', validPermission);
        if (!validPermission) {
            return res.status(403).json({
                message: 'Permission denies 2'
            });
        }
        return next();
    }
}

const asyncHandleError = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}
module.exports = {
    apiKey,
    permission,
    asyncHandleError
}