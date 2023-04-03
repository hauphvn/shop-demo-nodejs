'use strict';

const {model, Schema} = require('mongoose');

const DOCUMENT_NAME = 'KeyLv0';
const COLLECTION_NAME = 'KeyLv0s';

const keyTokenSchemaLv0 = new Schema({
    user: {
        type: String,
        required: true,
        ref: 'Shop'
    },
    publicKey: {
        type: String,
        required: true
    },
    privateKey: {
        type: String,
        required: true
    },
    refreshToke: {
        type: Array,
        default: []
    }
}, {
    timestamp: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, keyTokenSchemaLv0);