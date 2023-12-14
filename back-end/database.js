const pg = require('pg')

require('dotenv').config();
const user = process.env['POSTGRES_USER'];
const password = process.env['POSTGRES_PASSWORD'];
const database = process.env['POSTGRES_DB'];
const port = process.env['DATABASE_PORT'];
const host = process.env['DATABASE_HOST'];

const client = new pg.Client({
    user,
    password,
    database,
    port,
    host,
})

module.exports = client
