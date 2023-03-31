"use strict";

const JWT = require("jsonwebtoken");
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
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
    return { accessToken, refreshToken };
  } catch (e) {
    console.log("error create token::", e);
    return e;
  }
};

module.exports = {
  createTokenPair,
};
