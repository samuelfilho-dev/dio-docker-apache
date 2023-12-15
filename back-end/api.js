import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import {client} from "./database.js";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get('/api/v1/users', async (req, res) => {
    console.log('Está pegando')
})

app.post('/api/v1/users', async (req, res) => {
    const {firstName, lastName, username, password} = req.body;

    await client.connect()
        .then(() => {
            return client.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, username, password]);
        })
        .then(result => {
            return res.status(201).json(result.rows[0]);
        })
        .catch(error => {
            res.status(500).send('Erro interno do servidor');
            console.error('Erro ao salvar usuário:', error);
        })
        .finally(async () => {
            await client.end();
        });


})


app.post('/api/v1/login', async (req, res) => {

    const {username, password} = req.body;

    await client.connect();
    const result = await client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    await client.end();

    if (result.rows.length > 1) {
        return res.status(200).send({'message': 'Login Bem-sucedido'});
    } else {
        return res.status(400).send({'message': 'Erro no Login'});
    }
});

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});