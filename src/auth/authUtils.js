'use strict';

const JWT = require('jsonwebtoken');
const createTokenPair = async (payload, privateKey, publicKey) => {
    try{
const accessToken = await JWT.sign(payload, privateKey,{
    algorithm: "RS256",
    expiresIn: '2 days'
});
    }catch (e) {
        return e
    }
}

module.exports = {
    createTokenPair
}