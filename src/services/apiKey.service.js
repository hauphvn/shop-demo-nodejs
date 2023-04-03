'use strict';

const apiKeyModel = require('../models/apiKey.model');
const crypto = require('crypto');

class ApiKeyService {
    static   findById = async (key) => {
        try {
            const objKey = await apiKeyModel.findOne({key, status: true}).lean();
            return objKey;
        } catch (e) {
            console.log('error find by Id: ', e.message);
        }


    }
}

module.exports = ApiKeyService;