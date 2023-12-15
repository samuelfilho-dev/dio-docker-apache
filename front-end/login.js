function login(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: 'bea', password: 'senha123'})
    })
        .then(response => {
            localStorage.setItem('response', response)
          if (response.status === 200){
              window.location.href = 'index.html'
          }else{
              window.location.href = 'login.html'
          }
        })
        .then(data => console.log(data))
        .catch(error => {
            console.error('Error no login', error);
            displayErrorMessage(error.message)
        });

}

function displayErrorMessage(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.innerText = message;
    errorContainer.style.color = 'red';
}
