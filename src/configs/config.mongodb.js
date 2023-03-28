'use strict'

// Level 0
// const config = {
//     app: {
//         port: 4200
//     },
//     db: {
//         host: 'localhost',
//         port: 27017,
//         name: 'shopDev'
//     }
// }

// Level 1
const developer = {
    app: {
        port: process.env.DEV_APP_PORT || 3000
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'shopDev'
    }
};
const production = {
    app: {
        port:process.env.PRODUCTION_APP_PORT || 4200
    },
    db: {
        host:process.env.PRODUCTION_DB_HOST || 'localhost',
        port:process.env.PRODUCTION_DB_PORT || 27017,
        name:process.env.PRODUCTION_DB_NAME || 'shopProduction'
    }
}
const config = {developer, production};
const env = process.env.NODE_ENV || 'developer';
module.exports = config[env];