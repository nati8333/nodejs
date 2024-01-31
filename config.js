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
    user: 'root',
    password:'4Ec2h-2DDdFG3C3GE6EdBb62-ehBG-42',
    database: 'railway', 
    host:'root:4Ec2h-2DDdFG3C3GE6EdBb62-ehBG-42@mysql.railway.internal',
    port: 3306,
};

config.bcrypt = {
    saltRounds: 10
};

module.exports = config;