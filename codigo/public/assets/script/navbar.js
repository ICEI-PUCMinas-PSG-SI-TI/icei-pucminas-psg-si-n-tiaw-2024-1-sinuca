//CARREGAR PÁGINA
function ready(fn) {
  if (document.readyState != "loading") {
      fn();

  }
  else {
      document.addEventListener('DOMContentLoaded', fn);

  }
}
//FUNÇÃO PARA REMOVER BOTAO DE LOGIN/CADASTRO CASO LOGADO E TROCAR NOME DA ABA PERFIL PELO NOME DA CONTA LOGADA
ready(async function () {
  let user = localStorage.getItem('user')
  let cadastrologin = document.getElementById('cadastro-login')
  if (!user) {
    alertify.alert('Atenção !', 'Você precisa estar logado para participar de partidas', function () { });
    alertify.dialog('alert').set({ transition: 'zoom' }).show();
  }
  if (user){
    let cadastrobtn = document.getElementById('cadastrobtn')
    let loginbtn = document.getElementById('loginbtn')
    let deslogarbtn = document.getElementById('deslogarbtn')
    console.log('tem user')
    cadastrobtn.style.display = 'none'
    loginbtn.style.display = 'none'
    deslogarbtn.style.display = 'inline-block'
    try{
      let resposta = await fetch('/usuarios')
      if(!resposta.ok){
        console.error('Falha ao pegar /usuarios')
      }
      let dadosUsuarios = await resposta.json()
      let usuariologado = dadosUsuarios.find(dadosUsuarios => dadosUsuarios.id == user)
      let perfilnavbar = document.getElementById('perfilnavbar')
      perfilnavbar.innerHTML = usuariologado.nome


  }
  catch(erro){console.error('Erro na mudança de dados navbar', erro)}
  }



  


})

//FUNÇÃO PARA IR PARA TORNEIO PRIVADO
function torneioprivado(){
  
  let user = localStorage.getItem('user')
  if (!user){
    alertify.alert('Atenção !', 'Você precisa estar logado para participar de partidas', function () { });
    alertify.dialog('alert').set({ transition: 'zoom' }).show();
    return
  }
  else{
    window.location = './torneioprivado/torneioprivado.html'
  }
  
}
//FUNÇÃO DE IR PARA PÁGINA DE PERFIL
function perfil(){
  
  let user = localStorage.getItem('user')
  if (!user){
    alertify.alert('Atenção !', 'Você precisa estar logado para visualizar seu perfil', function () { });
    alertify.dialog('alert').set({ transition: 'zoom' }).show();
    return
  }
  else{
    window.location = './perfil/perfil.html'
  }
  
}

//IR PARA CADASTRO/LOGIN
function cadastro() {
  window.location.href = '../cadastro/cadastro.html';
}
function login() {
  window.location.href = '../login/login.html';
}

//FUNÇÃO PARA DESLOGAR DA CONTA
function deslogar(){
localStorage.clear();
location.reload()
}











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
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
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
  mobileNavbar.init();