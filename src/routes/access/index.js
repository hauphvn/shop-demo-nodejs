'use strict'

const express = require('express');
const router = express.Router();
const accessController = require('../../controllers/access.controller');
const {asyncHandleError} = require("../../auth/checkAuth");
router.post('/shop/signup', asyncHandleError(accessController.signUp));
router.post('/shop/login', asyncHandleError(accessController.login));
module.exports = router;