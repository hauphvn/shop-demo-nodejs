"use strict";

const JWT = require("jsonwebtoken");
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, publicKey, {
            algorithm: "RS256",
            expiresIn: "2 days",
        });
        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "7 days",
        });
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.log("error verify token: ", err);
            } else {
                console.log("decode:: ", decode);
            }
        });
        return {accessToken, refreshToken};
    } catch (e) {
        console.log("error create token::", e);
        return e;
    }
};
const createTokenPairLv0 = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: "2 days",
        });
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: "7 days",
        });
        JWT.verify(accessToken, publicKey, (err, decode) => {
          if (err) {
            console.log("error verify token lv0: ", err);
          } else {
            console.log("decode lv0:: ", decode);
          }
        });
        return {accessToken, refreshToken};
    } catch (e) {
        console.log("error create token::", e);
        return e;
    }
};

module.exports = {
    createTokenPair,
    createTokenPairLv0
};
