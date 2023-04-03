"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
// const crypto = require("node:crypto"); // using if node 19
const KeyTokenService = require("../services/keyToken.service");
const {createTokenPairLv0} = require("../auth/authUtils");
const {getInfoData} = require("../utils");
const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

class AccessService {
    static signUp = async ({name, email, password}) => {
        try {
            // step 1: check email exists
            const holderShop = await shopModel.findOne({email}).lean();
            if (holderShop) {
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
                // Level 1: Using for big system
                // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
                //   modulusLength: 4096,
                //   publicKeyEncoding: {
                //     type: "pkcs1",
                //     format: "pem",
                //   },
                //   privateKeyEncoding: {
                //     type: "pkcs1",
                //     format: "pem",
                //   },
                // });
                // Level 0: Using for small, medium system
                // Generate a random value for an Int32Array
                const publicKey = crypto.randomBytes(64).toString('hex');
                const privateKey = crypto.randomBytes(64).toString('hex');

                console.log(publicKey, privateKey);
                // Level 1:
                // const publicKeyString = KeyTokenService.createKeyToken({
                //   userId: newShop._id,
                //   publicKey,
                // });
                // if (!publicKeyString) {
                //   return {
                //     code: "xxxx",
                //     message: "public key string error",
                //   };
                // }
                // const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyString, privateKey);
                // return {
                //   code: 201,
                //   metadata: {
                //     tokens,
                //     shop: getInfoData({field: ["name", "email"],object: newShop}),
                //   },
                // };


                // Level 0:
                const keyStore = await KeyTokenService.createKeyTokenLv0({userId: newShop._id, publicKey, privateKey})
                if (!keyStore) {
                    return {
                        code: 'xxx',
                        message: 'key store error'
                    }
                }

                const tokens = await createTokenPairLv0({userId: newShop._id, email}, publicKey, privateKey);
                console.log('tokens::', tokens);
                if (tokens.hasOwnProperty('accessToken')) {
                    return {
                        code: 201,
                        metadata: {
                            tokens,
                            shop: getInfoData({field: ["name", "email"], object: newShop}),
                        },

                    }
                } else {
                    return {
                        code: 'xxxtoken',
                        massage: 'error create token'
                    }
                }


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
