//ALERTA PARA CADASTRO

function ready(fn) {
    if (document.readyState != "loading") {
        fn();

    }
    else {
        document.addEventListener('DOMContentLoaded', fn);

    }
}


function cadastro() {
    window.location.href = '../cadastro/cadastro.html';
}
function login() {
    window.location.href = '../login/login.html';
}

function deslogar(){
  localStorage.clear();
  location.reload()
}

function estabelecimento(id) {
  if (id == 'cadastroEstabelecimento') {
      window.location.href = '../estabelecimento/cadastroestabelecimento.html'
  }
  else if (id == 'loginEstabelecimento'){
      window.location.href = '../estabelecimento/loginestabelecimento.html'
  }
  else {alert('Erro')}
}

//SCRIPT DO CARROSSEL DE CARDS

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

//PREENCHE A PAGINA COM OS CARDS DOS JOGOS
function preencherCards() {
    fetch('/torneiospublicos')
      .then(response => response.json())
      .then(dados => {
        console.log(dados); 
  
        const containerPublicas = document.querySelector('.swiper-wrapper.publicas');
  
        if (!containerPublicas) {
          console.error('Container para torneios públicos não encontrado');
          return;
        }
  
        containerPublicas.innerHTML = '';
  
        const criarCard = (partida) => {
            const descricaoListItems = (partida.lista || []).map(item => `<li>${item}</li>`).join('');
          
            // Calcular o número de pessoas participando
            const numeroParticipantes = partida.convidados ? partida.convidados.length : 0;
            const maximoPessoas = parseInt(partida.maximopessoas);
          

          
            return `
              <div class="swiper-slide">
                  <div class="col pt-4">
                      <div class="card">
                          <div class="card-body text-center">
                              <h5 class="card-title text-light">${partida.titulo}</h5>
                              <h6 class="card-subtitle mb-2 text-light">${partida.endereco || ''}</h6>
                              <p class="card-text text-light">
                                  <ul>${descricaoListItems}</ul>
                              </p>
                              <p class="card-text text-light">
                                  Data: ${partida.data}<br>
                                  Horário: ${partida.horario}<br>
                                  Participantes: ${numeroParticipantes} / ${partida.maximopessoas}
                              </p>
                              <div class="d-flex justify-content-center">
                              <a class="botaoParticipar btn btn-primary  d-flex justify-content-center text-center" href="/detalhespartida/partida.html?id=${partida.id}" role="button">Detalhes</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            `;
          };
          
          
  
        if (dados && dados.length > 0) { 
          dados.forEach(partida => {
            containerPublicas.innerHTML += criarCard(partida);
          });
        } else {
          console.error('Dados de torneios públicos não encontrados');
        }
      })
      .catch(error => console.error('Erro ao carregar os dados:', error));
  }
  
  preencherCards();

  function preencherCardsPrivadas() {
    fetch('/torneiosprivados') 
      .then(response => response.json())
      .then(dados => {
        console.log(dados); 
  
        const containerPrivadas = document.querySelector('.swiper-wrapper.privadas');
  
        if (!containerPrivadas) {
          console.error('Container para torneios privados não encontrado');
          return;
        }
  
        containerPrivadas.innerHTML = '';
  
        const criarCard = (partida) => {
            const descricaoListItems = (partida.lista || []).map(item => `<li>${item}</li>`).join('');
          
            // Calcular o número de pessoas participando
            const numeroParticipantes = partida.convidados ? partida.convidados.length : 0;
            const maximoPessoas = parseInt(partida.maximopessoas);
          

          
            return `
              <div class="swiper-slide">
                  <div class="col pt-4">
                      <div class="card" id="${partida.id}">
                          <div class="card-body text-center">
                              <h5 class="card-title text-light">${partida.titulo}</h5>
                              <p class="card-text text-light">
                                  <ul>${descricaoListItems}</ul>
                              </p>
                              <p class="card-text text-light">
                                  Data: ${partida.data}<br>
                                  Horário: ${partida.horario}<br>
                                  Participantes: ${numeroParticipantes} / ${partida.maximopessoas}
                              </p>
                              <div class="d-flex justify-content-center">
                              <a class="botaoParticipar btn btn-primary" onclick=MostrarModal(this) data-bs-toggle="modal" data-bs-target="#PartidaModal" href="/mostrartorneioprivado/mostrartorneioprivado.html?id=${partida.id}" role="button">Detalhes</a>
                              </div>
                              
                          </div>
                      </div>
                  </div>
              </div>
            `;
          };
          
          
  
        if (dados && dados.length > 0) { 
          dados.forEach(partida => {
            containerPrivadas.innerHTML += criarCard(partida);
          });
        } else {
          console.error('Dados de torneios privados não encontrados');
        }
      })
      .catch(error => console.error('Erro ao carregar os dados:', error));
  }
  
  preencherCardsPrivadas();

  
  async function MostrarModal(div){
   
    let Parent1 = div.parentElement
    let Parent2 = Parent1.parentElement
    let Parent3 = Parent2.parentElement
    let idTorneio = Parent3.id

    let modal = document.getElementById('modal')
    let titulomodal = document.getElementById('tituloModal')
    let novaid = document.getElementById('idtorneio')
    

    try {
      let resposta = await fetch('/torneiosprivados')
      if (!resposta.ok){
        console.error('Não foi possivel acessar o torneio')
        return
      }
      let dadostorneios = await resposta.json()

      let torneioclicado = dadostorneios.find(dadostorneios => dadostorneios.id == idTorneio)
      titulomodal.textContent = torneioclicado.titulo
      novaid.id = torneioclicado.id


    }

    catch(erro){console.error('Falha no try', erro)}
  }


  async function ValidarSenhaTorneioPrivado(id){

    let senhaColocada = document.getElementById('senhapraentrar').value

    try{
      let resposta = await fetch('/torneiosprivados')
      if (!resposta.ok){
        console.error('Não foi possivel acessar o torneio')
        return
      }
      let dadostorneios = await resposta.json()
      let torneioclicado = dadostorneios.find(dadostorneios => dadostorneios.id == id)
      if (senhaColocada == torneioclicado.senha){
        window.location = `../mostrartorneioprivado/mostrartorneioprivado.html?id=${torneioclicado.id}`
      }
      else{
        alert('Senha incorreta, tente novamente.')
      }
    }
    catch(erro){console.error('Falha no try', erro)}
    

  }