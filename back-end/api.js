import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {getConnection} from "./database.js";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get('/api/v1/users', async (req, res) => {
    try {
        console.info("Todos usuarios selecionados");
        const result = (await getConnection()).query('SELECT * FROM users');
        return res.status(200).json((await result).rows);
    } catch (error) {
        console.error("Erro na seleção de usuarios");
        return res.status(500).send({'message': error.message})
    }
})

app.post('/api/v1/users', async (req, res) => {
    const {firstName, lastName, username, password} = req.body;

    try {
        console.info("Cadastro bem-sucedido");
        const result = await (await getConnection()).query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, username, password])
        return res.status(201).json((await result).rows[0]);
    } catch (error) {
        console.error("Erro no cadastro de usuario");
        return res.status(500).send({'message': error.message});
    }


})


app.post('/api/v1/login', async (req, res) => {

    const {username, password} = req.body;

    try {
        console.info("Inicio do Login");
        const result = await (await getConnection()).query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            console.info("Sucesso no login");
            return res.status(200).send({'message': 'Login Bem-sucedido'});
        } else {
            console.error("Error no login");
            return res.status(400).send({'message': 'Erro no Login'});
        }

    } catch (error) {
        console.error("Error no login");
        return res.status(500).send({'message': error.message});
    }
});

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});