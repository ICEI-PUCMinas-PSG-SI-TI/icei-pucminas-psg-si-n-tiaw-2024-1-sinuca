


async function CadastroEstabelecimento(){

  let nomeestabelecimento = document.getElementById('nome-estabelecimento').value
  let endereco = document.getElementById('endereco').value
  let cep = document.getElementById('cep').value
  let senha = document.getElementById('senha').value
  let email = document.getElementById('email').value
  let cnpj = document.getElementById('cnpj').value
  let contatoproprietario = document.getElementById('contato-proprietario').value
  let capacidadepessoas = document.getElementById('capacidade-pessoas').value
  let horariofuncionamento = document.getElementById('horario-funcionamento').value
  let descricao = document.getElementById('descricao').value
  let instagram = document.getElementById('instagram').value
  let whatsapp = document.getElementById('whatsapp').value

  if (nomeestabelecimento.trim() === '' || endereco.trim() === '' || cep.trim() === ''|| email.trim() === ''|| cnpj.trim() === ''|| contatoproprietario.trim() === '' || capacidadepessoas.trim() === ''|| horariofuncionamento.trim() === ''|| descricao.trim() === '') {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
}

  let novoestabelecimento = {
    nome: nomeestabelecimento,
    endereco: endereco,
    cep: cep,
    email: email,
    cnpj: cnpj,
    senha: senha,
    contato: contatoproprietario,
    capacidade: capacidadepessoas,
    horario: horariofuncionamento,
    descricao: descricao,
    instagram: instagram,
    whatsapp: whatsapp
  }

  try{
    let resposta = await fetch('/estabelecimentos',{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoestabelecimento)})

    if (!resposta.ok){
      console.error('Falha no Post estabelecimento')
    }

    
    
  }
  catch (erro) {
    console.error('Ocorreu um erro:', erro);
  }
}


async function LoginEstabelecimento(){

  let cnpj = document.getElementById('cnpj').value
  let senhaestabelecimento = document.getElementById('senhaestabelecimento').value

  if (cnpj.trim() === '' || senhaestabelecimento.trim() === '') {
    alert('Por favor, preencha todos os campos.');
    return;
}

try{
  let resposta = await fetch('/estabelecimentos')
  if (!resposta.ok){
      console.error('Não foi possivel obter estabelecimentos')
  }
  let estabelecimentodados = await resposta.json()

  let estabelecimentologado = estabelecimentodados.find(estabelecimentodados => estabelecimentodados.cnpj == cnpj)
  if (!estabelecimentologado) {
      alert('Estabelecimento não cadastrado. Por favor, cadastre-se primeiro.');
      return;
  }
  
  let cnpjdoestabelecimento = estabelecimentologado.cnpj
  if (estabelecimentologado.senha === senhaestabelecimento) {
      
      
      const params = new URLSearchParams({
        id: cnpjdoestabelecimento
      })
      
      console.log(params.toString())
      var notification = alertify.notify('LOGADO COM SUCESSO !', 'success', 5, function () { console.log('dismissed'); });
      window.location.href = `../estabelecimento/torneioestabelecimento.html?${params.toString()}`;

  } else {
      alert('Senha incorreta. Por favor, tente novamente.');
  }
}
catch(erro)
{
  console.log(erro)
}


}











/*function exibirJSON(objeto) {
  console.log(objeto);
}

document.getElementById('cadastroForm').addEventListener('submit', function (event) {
  event.preventDefault();

  let estabelecimento = {
    nome: document.getElementById('nome-estabelecimento').value,
    endereco: document.getElementById('endereco').value,
    email: document.getElementById('email').value,
    cnpj: document.getElementById('cnpj').value,
    contato: document.getElementById('contato-proprietario').value,
    capacidade: document.getElementById('capacidade-pessoas').value,
    horario: document.getElementById('horario-funcionamento').value,
    descricao: document.getElementById('descricao').value
  };

  exibirJSON(estabelecimento);
});

document.getElementById('redesSociaisForm').addEventListener('submit', function (event) {
  event.preventDefault();

  let redesSociais = {
    whatsapp: document.getElementById('whatsapp').value,
    instagram: document.getElementById('instagram').value,
    facebook: document.getElementById('facebook').value
  };

  exibirJSON(redesSociais);
});


class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);
mobileNavbar.init();*/