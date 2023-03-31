"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("../services/keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step 1: check email exists
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        console.log("holderShop: ", holderShop);
        return {
          code: "xxxx",
          message: "Shop already registered!",
        };
      }
      const pwdHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: pwdHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        // private key: client using, using to sign token
        // public key: we save in db, verify token
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });
        const publicKeyString = KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });
        if (!publicKeyString) {
          return {
            code: "xxxx",
            message: "public key string error",
          };
        }
        // const objectPublicKey = crypto.createPublicKey(publicKey);
        // console.log("objectPublicKey:: ", objectPublicKey);
        // create token pair
        const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyString, privateKey);
        return {
          code: 201,
          metadata: {
            tokens,
            shop: getInfoData(["name", "email"], newShop),
          },
        };
      } else {
        console.log("error create new shop::");
      }
    } catch (e) {
      return {
        code: "xxxyyy",
        message: e.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
