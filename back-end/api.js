import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import client from "./database.js";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get('/api/v1/users', async (req, res) => {
    try {
        const conn = await client.connect();
        const result = await client.query('SELECT * FROM users');

        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).send({'message': error.message})
    } finally {
        await client.end();
    }
})

app.post('/api/v1/users', async (req, res) => {
    const {firstName, lastName, username, password} = req.body;

    try {
        const conn = await client.connect();
        const result = await client.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, username, password]);

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).send({'message': error.message});
    } finally {
        await client.end();
    }


})


app.post('/api/v1/login', async (req, res) => {

    const {username, password} = req.body;

    try {
        const conn = await client.connect();
        const result = await client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            return res.status(200).send({'message': 'Login Bem-sucedido'});
        } else {
            return res.status(400).send({'message': 'Erro no Login'});
        }

    } catch (error) {
        return res.status(500).send({'message': error.message});
    } finally {
        await client.end();
    }
});

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});