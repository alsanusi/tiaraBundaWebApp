// SingleUse Database Connection
const mysql = require('mysql')
const config = require('../db_config/config')
exports.con = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.database
})