function cadastrar(){
var email = document.getElementById('email').value;
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;

if (email.trim() === '' || username.trim() === '' || password.trim() === '') {
    alert('Por favor, preencha todos os campos.');
    return;
}

if (localStorage.getItem(username)) {
        alert('Usuário já cadastrado.');
        return;
}

var userData = {
    username: username,
    password: password
    
};


localStorage.setItem(username, JSON.stringify(userData));
    
alert('Usuário cadastrado com sucesso!');


window.location.href = '/login/login.html';
}

function logar() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username.trim() === '' || password.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    var userDataStr = localStorage.getItem(username);

    if (!userDataStr) {
        alert('Usuário não cadastrado. Por favor, cadastre-se primeiro.');
        return;
    }

    var userData = JSON.parse(userDataStr);

    if (userData.password === password) {
        var notification = alertify.notify('LOGADO COM SUCESSO !', 'success', 5, function(){  console.log('dismissed'); });
        window.location.href = 'home.html';
        
    } else {
        alert('Senha incorreta. Por favor, tente novamente.');
    }
}

    




