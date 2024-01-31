'use strict';

const Hapi      = require('@hapi/hapi')
const Boom      = require('@hapi/boom')
const Inert     = require('@hapi/inert');
const joi       = require('joi');
const path      = require('path');
const bcrypt    = require('bcrypt');
const mysql     = require('mysql2/promise');
const config    = require('./config');

const server       = Hapi.server(config.server);
    
async function start() {
    try {
        const dbConnection = await mysql.createConnection(config.mysql);

        server.start();
                
        await server.register([
            { plugin: Inert }
        ]);


        server.route([
            {
                method: 'GET',
                path: '/{params*}',
                handler: {
                    directory: {
                        path: 'client/dist/',
                        redirectToSlash: false,
                        defaultExtension: 'html',
                    }
                }
                // handler: (request, h) => {
                //     // return h.redirect('http://localhost:3000/');
                //     // return h.response('hello world');
                // }
            },
            {
                method: 'GET',
                path: '/mock',
                handler: async (request, h) => {
                    try {
                        const table = request.query.table;
                        const [queryResult, metadata] = await dbConnection.query('SELECT * FROM '+table);
                        return queryResult 
                            ? h.response(queryResult) 
                            : Boom.internal('mocking failed!');
                    }
                    catch(err) {
                        console.error(err);
                        return Boom.internal(err);
                    }
                }
            },
            {
                method: 'POST',
                path: '/login',
                handler: async function(request, h) {
                    const data = request.payload;
                    try {
                        const [result, metadata] = await dbConnection.query('SELECT * FROM users WHERE email = ?', [data.email]);
                        if(result.length == 0) 
                            return Boom.unauthorized('user with this email is not registered');
                        else if(!await bcrypt.compare(data.password, result[0].password))
                            return Boom.unauthorized('wrong password');
                        const queryResult = queryResultAccount(result, metadata);
                        return h.response(queryResult);
                    }
                    catch(err) {
                        console.error(err);
                        return Boom.internal(err);
                    }
                },
                options: {
                    validate: {
                        payload: joi.object({
                            email: joi.string().email().required(),
                            password: joi.string().min(3).max(64).required()
                        }).required()
                    }
                }
            },
            {
                method: 'POST',
                path: '/register',
                handler: async function(request, h) {
                    const data = request.payload;
                    try {
                        // check if passwords do not match
                        {
                            if(data.password !== data.verifyPassword)
                                return Boom.expectationFailed('passwords do not match');
                        }
                        // check if user exists
                        {
                            const [result, metadata] = await dbConnection.query('SELECT * FROM users WHERE email = ?', [data.email]);
                            if(result.length != 0) 
                                return Boom.expectationFailed('user with this email is already registered');
                        }
                        // register user
                        {
                            // hash password
                            const salt           = await bcrypt.genSalt(config.bcrypt.saltRounds);
                            const hashedPassword = await bcrypt.hash(data.password, salt);
                            // insert user data into database
                            const [result_i, metadata_i] = await dbConnection.query('INSERT INTO users(email, password) VALUE(?, ?)', 
                                [data.email, hashedPassword]
                            );
                            if(result_i.length == 0) 
                                return Boom.expectationFailed('failed to register user');
                            // try select that data and return the result
                            const [result, metadata] = await dbConnection.query('SELECT * FROM users WHERE email = ?', [data.email]);
                            const queryResult = queryResultAccount(result, metadata);
                            return h.response(queryResult);
                        }
                    }
                    catch(err) {
                        console.error(err);
                        return Boom.internal(err);
                    }
                },
                options: {
                    validate: {
                        payload: joi.object({
                            email: joi.string().email().required(),
                            password: joi.string().min(3).max(64).required(),
                            verifyPassword: joi.string().min(3).max(64).required(),
                        }).required()
                    }
                }
            },
        ]);


        console.log('server started @'+server.info.uri);
    }
    catch(err) {
        console.error(err);
        process.exit(1);
    }
}

start();
