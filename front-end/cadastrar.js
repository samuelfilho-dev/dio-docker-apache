function saveUser() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstName, lastName, username, password}),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Usuário cadastrado com sucesso:', data);
            window.location.href = 'login.html'
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
        });
}

function goToLogin() {
    window.location.href = "login.html";
}