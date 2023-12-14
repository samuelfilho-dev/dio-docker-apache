const express = require('express');
const {response} = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const client = require('./database')

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

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});