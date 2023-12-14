const express = require('express');
const {response} = require("express");

const app = express();

app.use(express.json())
app.listen(3000)

app.get('/api/v1/users', async (req, res) => {
    console.log('Está pegando')
})



