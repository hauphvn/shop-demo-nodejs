'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require("src/services/keyToken.service");

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    static signUp = async (name, email, password) => {
        try {
// step 1: check email exists
            const holderShop = await shopModel.findOne({email}).lean();
            if (holderShop) {
                return {
                    code: 'xxxx',
                    message: 'Shop already registered!'
                }
            }
            const pwdHash = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name, email, password: pwdHash, roles: [RoleShop.SHOP]
            });

            if(newShop){
                // private key: client using, using to sign token
                // public key: we save in db, verify token
const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa',{
    modulusLength: 4096
} );
const publicKeyString = KeyTokenService.createKeyToken({
    userId: newShop._id,
    publicKey
});
if(!publicKeyString){
    return ({
        code: 'xxxx',
        message: 'public key string error'
    });
}


            }
        } catch (e) {
            return {
                code: 'xxx',
                message: e.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;