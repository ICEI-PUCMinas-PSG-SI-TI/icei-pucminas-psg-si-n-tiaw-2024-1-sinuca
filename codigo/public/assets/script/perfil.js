/*document.addEventListener('DOMContentLoaded', function () {
  let profileData = loadProfileData();
  populateProfileForm(profileData);
  setupSaveButton();
  displayMatchHistory();
  setupMobileMenu();

});

function loadProfileData() {
  return JSON.parse(localStorage.getItem("profileData")) || {
    name: "",
    email: "",
    phone: "",
    birthdate: "",
    gender: "",
    description: ""
  };
}

function populateProfileForm(profileData) {
  document.getElementById("email").value = profileData.email;
  document.getElementById("phone").value = profileData.phone;
  document.getElementById("birthdate").value = profileData.birthdate;
  document.getElementById("gender").value = profileData.gender;
  document.getElementById("description").value = profileData.description;
}

function setupSaveButton() {
  document.getElementById("saveProfile").addEventListener("click", function () {
    saveProfileData();
    alert("Perfil salvo com sucesso!");
    console.log("Dados do perfil salvos:", JSON.parse(localStorage.getItem("profileData")));
  });
}

function saveProfileData() {
  let profileData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    birthdate: document.getElementById("birthdate").value,
    gender: document.getElementById("gender").value,
    description: document.getElementById("description").value
  };
  localStorage.setItem("profileData", JSON.stringify(profileData));
}

function displayMatchHistory() {
  let matchHistory = JSON.parse(localStorage.getItem("matchHistory")) || [
    { name: "Bar da Esquina", placement: "1º Lugar", date: "01/05" },
    { name: "Bar do José", placement: "6º Lugar", date: "21/08" },
    { name: "Tacada Certa", placement: "5º Lugar", date: "23/04" },
    { name: "Casa da Sinuca", placement: "3º Lugar", date: "16/05" }
  ];

  let matchList = document.getElementById("matchList");
  matchHistory.forEach(match => {
    let matchItem = document.createElement("div");
    matchItem.classList.add("match");
    matchItem.innerHTML = `
          <h3>${match.name}</h3>
          <p>Colocação: ${match.placement}</p>
          <p>Jogou em: ${match.date}</p>
          <button>Jogar novamente</button>
      `;
    matchList.appendChild(matchItem);
  });
}

function setupMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const navList = document.querySelector('.nav-list');

  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navList.classList.toggle('active');
  });
}*/

async function CarregarDadosPerfil() {

  let userLogado = localStorage.getItem('user')


  try {
    let resposta = await fetch('/usuarios')
    if (!resposta.ok) {
      console.error('Fetch Get (1) falha')
    }
    let DadosDosUsuarios = await resposta.json()
    let DadosUsuarioLogado = DadosDosUsuarios.find(DadosDosUsuarios => DadosDosUsuarios.id == userLogado)
    console.log('quem esta logado = ', DadosUsuarioLogado)

    let nomedeusuario = document.getElementById('nomedeusuario')
    nomedeusuario.innerHTML = DadosUsuarioLogado.nome

    let emaildousuario = document.getElementById('emaildousuario')
    emaildousuario.innerHTML = `<strong>E-MAIL: </strong>${DadosUsuarioLogado.email}`

    let telefonedousuario = document.getElementById('telefonedousuario')
    telefonedousuario.innerHTML = `<strong>TELEFONE: </strong>${DadosUsuarioLogado.telefone}`

    let datanascimento = document.getElementById('datanascimento')
    let nascimento = DadosUsuarioLogado.nascimento
    nascimento = nascimento.replaceAll('-', '/')
    datanascimento.innerHTML = `<strong>DATA DE NASCIMENTO: </strong>${nascimento}`

    let generodousuario = document.getElementById('generodousuario')
    generodousuario.innerHTML = `<strong>GENERO: </strong>${DadosUsuarioLogado.genero}`

    let fotodeperfil = document.getElementById('fotodeperfil')
    fotodeperfil.src = DadosUsuarioLogado.fotodeperfil

  }
  catch (erro) {
    console.log('falha na função carregar dados', erro)
  }
}

async function TrocarFoto() {
  let fotoinserida = prompt('Insira a URL de sua foto')
  let userLogado = localStorage.getItem('user')
  if (fotoinserida == null) {
    alert('URL Inválido')
    return
  }

  try {
    let resposta = await fetch('/usuarios')
    if (!resposta.ok) {
      console.erro('Falha no Get trocar foto (1)')
    }
    let DadosDosUsuarios = await resposta.json()
    console.log('DADOS CARREGADOS', DadosDosUsuarios)
    let DadosUsuarioLogado = DadosDosUsuarios.find(DadosDosUsuarios => DadosDosUsuarios.id == userLogado)
    let idUsuarioLogado = DadosUsuarioLogado.id

    const trocadefoto = {
      fotodeperfil: fotoinserida
    }

    let resposta2 = await fetch(`/usuarios/${idUsuarioLogado}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trocadefoto)
    });
    if (!resposta2.ok){
      console.erro('Falha no Patch Trocar Foto')
    }
    console.log('respota 2 : ok')
  }

  catch (erro) {
    console.error('falha na função de trocar foto', erro)
  }

  CarregarDadosPerfil()

}

