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

    console.info("Response bem-sucedida")

    if (response.status === 200) {
        localStorage.setItem('user', 'esta logado')
        console.info("Login bem-sucedido")
        window.location.href = 'index.html'
    } else {
        window.location.href = 'login.html'
        console.info("Error no Login")
        throw new Error('Error no login')
    }
}

function displayErrorMessage(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.innerText = message;
    errorContainer.style.color = 'red';
}


