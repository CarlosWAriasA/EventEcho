const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const { MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLHOST, MYSQLPORT } = process.env;

const connection = mysql.createConnection({
    host: 'monorail.proxy.rlwy.net',
    user: 'root',
    password: '-bhF-2a3-AFd-g2AGeCEdF31EbgCb66e',
    database: 'railway',
    port: 22411,
    client: 'mysql2'
});

module.exports = connection;
