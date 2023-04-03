'use strict';
/***
 * Saving day, month from-to of token
 */

const {model, Schema}  = require('mongoose');
const DOCUMENT_NAME = 'ApiKey';
const COLLECTION_NAME = 'ApiKeys';

const apiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    permissions: {
        type: [String],
        require: true,
        enum: ['0000','1111','2222']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d' // This will automatically delete expires API key after 30 days.
    }
},{
    timestamp: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, apiKeySchema);
