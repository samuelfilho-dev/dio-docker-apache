import pg from 'pg';

export const getConnection = async () => {
    const client = new pg.Client({
        user: 'postgres',
        password: 'senha123',
        database: 'dio_apache',
        port: 5432,
        host: 'db',
    })

    await client.connect()
    return client
}


