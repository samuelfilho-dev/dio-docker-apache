const productForm = document.getElementById('product-form');

productForm.addEventListener('submit', event => {
    event.preventDefault();

    const productData = new FormData(productForm);
    const data = Object.fromEntries(productData);
    console.log(data);

    fetch('http://localhost:3000/api/v1/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Produto cadastrado com sucesso:', data);
            window.location.href = 'index.html'
        })
        .catch(error => {
            console.error('Erro ao cadastrar Produto:', error);
        });

});

function loadProducts() {
    const productTableBody = document.querySelector('#productTable tbody');


    fetch('http://localhost:3000/api/v1/products')
        .then(response => response.json())
        .then(data => {
            productTableBody.innerHTML = '';
            data.forEach(product => {
                const newRow = productTableBody.insertRow();
                newRow.innerHTML = `<td>${product.name}</td><td>${product.price}</td><td>${product.description}</td>`;
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
}

function verificarLogin() {
    if (usuarioNaoLogado()) {
        window.location.href = "login.html";
    }
}

function usuarioNaoLogado() {
    return !localStorage.getItem("user");
}

verificarLogin();
loadProducts();

