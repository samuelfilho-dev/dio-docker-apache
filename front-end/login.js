const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);

    const response = fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    response.then(res => {
        if (res.status === 200) {
            localStorage.setItem("user", "esta logado");
            window.location.href = "index.html";
        } else {
            console.error("O Login deu errado");
            window.location.href = "login.html";
        }
    });
});

