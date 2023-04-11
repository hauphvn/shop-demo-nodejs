"use strict";

const AccessService = require("../services/access.service");
const {CREATED_RESPONSE} = require("../core/success.response");

class AccessController {
    signUp = async (req, res) => {
        //Level 2:
        new CREATED_RESPONSE({
            message: 'Registered OK',
            metadata: await AccessService.signUp(req.body),
            options: {limit: 10}
        }).send(res);
        //Level 1
        // return res.status(201).json(await AccessService.signUp(req.body));

        // Level 0
        // try {
        //   return res.status(201).json(await AccessService.signUp(req.body));
        // } catch (e) {
        //   next(e);
        // }
    };
}

module.exports = new AccessController();
