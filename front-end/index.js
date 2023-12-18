function verificarLogin() {
    if (usuarioNaoLogado()) {
        window.location.href = "login.html";
    }
}

function usuarioNaoLogado() {
    return !localStorage.getItem("user");
}

verificarLogin();

