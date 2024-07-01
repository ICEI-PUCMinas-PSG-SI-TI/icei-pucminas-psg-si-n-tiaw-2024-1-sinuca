function ready(fn) {
  if (document.readyState != "loading") {
      fn();

  }
  else {
      document.addEventListener('DOMContentLoaded', fn);

  }
}
ready(function () {
  let user = localStorage.getItem('user')
  let cadastrologin = document.getElementById('cadastro-login')
  if (!user) {
    alertify.alert('Atenção !', 'Você precisa estar logado para participar de partidas', function () { });
    alertify.dialog('alert').set({ transition: 'zoom' }).show();
  }
  if (user){
    let cadastrobtn = document.getElementById('cadastrobtn')
    let loginbtn = document.getElementById('loginbtn')
    console.log('tem user')
    cadastrobtn.style.display = 'none'
    loginbtn.style.display = 'none'
  }

})

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
