const client = require('./database.js')

function saveData() {
    // Obtenha os valores dos campos
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    const userData = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
    };

}