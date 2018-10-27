const {
    DB
} = require('../sequelize')
require('../model')
const {
    createConnection
} = require('mysql2')
const conn = createConnection({
    user: DB.options.username,
    password: DB.options.password
})

conn
    .promise().query('DROP DATABASE IF EXISTS ' + DB.options.database)
    .then(() => {
        conn.promise().query('CREATE DATABASE IF NOT EXISTS ' + DB.options.database)
            .then(() => {
                console.log('create new database')
                DB
                    .sync({
                        force: true
                    })
                    .then(() => {
                        console.log('synced database')
                        conn.end()
                        process.exit();
                    })
                    .catch(err => {
                        throw err
                    })
            })
            .catch(err => {
                throw err
            })
    })
    .catch(err => {
        throw (err)
    })