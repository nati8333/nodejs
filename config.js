const config = [];

const qs = require('qs'); 

config.server = {
    host: 'localhost',
    port: env.PORT ? env.PORT : 80,
    query: {
        parser: (query) => qs.parse(query) 
    },    
    // "routes": {
    //     "cors": {
    //         "origin": ["http://localhost:3000"],
    //         "headers": ["Accept", "Content-Type"],
    //         "additionalHeaders": ["X-Requested-With"]
    //     }
    // },
    // "routes": {
    //     "cors": true
    // },
};

config.mysql = {
    user: 'onshop_admin',
    password:'OnShop_Admin_Password@4123',
    database: 'onshop_db', 
    host:'localhost',
    port: 3306,
};

config.bcrypt = {
    saltRounds: 10
};

module.exports = config;