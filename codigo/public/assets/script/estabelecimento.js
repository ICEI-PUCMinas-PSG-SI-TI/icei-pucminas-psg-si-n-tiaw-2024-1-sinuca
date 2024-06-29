function exibirJSON(objeto) {
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
mobileNavbar.init();