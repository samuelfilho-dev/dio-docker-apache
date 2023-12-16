import pg from 'pg';

const client = new pg.Client({
    user: 'postgres',
    password: 'senha123',
    database: 'dio_apache',
    port: 5432,
    host: 'localhost',
})

export default client;

