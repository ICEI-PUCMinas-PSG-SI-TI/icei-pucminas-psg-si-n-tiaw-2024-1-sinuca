//FUNCTION PRA CADASTRAR PERFIL
async function cadastrar() {
    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var telefone = document.getElementById('telefone').value;
    var nascimento = document.getElementById('nascimento').value;
    var genero = document.getElementById('genero').value;

    if (email.trim() === '' || username.trim() === '' || password.trim() === ''|| telefone.trim() === ''|| nascimento.trim() === ''|| genero.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        let resposta = await fetch('/usuarios')
        if (!resposta.ok) {
            throw new Error('Erro ao obter usuários');
        }
        let cadastrojson = await resposta.json();
        console.log('cadastrojson = ', cadastrojson);
        if (localStorage.getItem(username)) {
            alert('Usuário já cadastrado.');
            return;
        }
        const postdadoscadastro = {
            nome: username,
            senha: password,
            email: email,
            telefone: telefone,
            nascimento: nascimento,
            genero: genero,
            fotodeperfil: '/assets/images/perfil.jpg'
        }
        try {
            let respostaPost = await fetch('/usuarios' ,{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(postdadoscadastro)})
              
        }
        catch (erropost) {
            console.log('Erro no POST da resposta', erropost)
        }
        alert('Usuário cadastrado com sucesso!');


        window.location.href = '../login/login.html';
    }
    catch (erro) {
        console.log('Erro no GET do resposta', erro)
    }



    var userData = {
        username: username,
        password: password

    };


    localStorage.setItem(username, JSON.stringify(userData));

  
}
//FUNÇÃO PARA LOGAR NO PERFIL
async function logar() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username.trim() === '' || password.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try{
        let resposta = await fetch('/usuarios')
        if (!resposta.ok){
            console.error('Não foi possivel obter usuários')
        }
        let usuariosdados = await resposta.json()
    

        let emaildadosteste = usuariosdados.find(usuariosdados => usuariosdados.email == username)
        if (!emaildadosteste) {
            alert('Usuário não cadastrado. Por favor, cadastre-se primeiro.');
            return;
        }
        let userstorage = emaildadosteste.id
        console.log(userstorage)
        if (emaildadosteste.senha === password) {
            localStorage.setItem('user', userstorage)
            var notification = alertify.notify('LOGADO COM SUCESSO !', 'success', 5, function () { console.log('dismissed'); });
            window.location.href = '../index.html';
    
        } else {
            alert('Senha incorreta. Por favor, tente novamente.');
        }
    }
    catch(erro)
    {
        console.log(erro)
    }
}






