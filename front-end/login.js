async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch("http://api:3000/api/v1/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })

    if (response.status === 200) {
        localStorage.setItem('user', 'esta logado')
        window.location.href = 'index.html'
    } else {
        window.location.href = 'login.html'
        throw new Error('Erro no login')
    }
}

function displayErrorMessage(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.innerText = message;
    errorContainer.style.color = 'red';
}


