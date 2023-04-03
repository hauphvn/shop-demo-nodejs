"use strict";
const keyTokenModel = require("../models/keytoken.model");
const keyTokenModelLv0 = require("../models/keytokenLv0.model");

class KeyTokenService {
  static createKeyTokenLv1 = async ({ userId, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString();
      const token = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });
      return token ? token.publicKey : null;
    } catch (e) {
      return e;
    }
  };
  static createKeyTokenLv0 = async ({ userId, publicKey, privateKey }) => {
    try {
      const token = await keyTokenModelLv0.create({
        user: userId,
        publicKey,
        privateKey,
      });
      return token ? token.publicKey : null;
    } catch (e) {
      return e;
    }
  };
}

module.exports = KeyTokenService;
