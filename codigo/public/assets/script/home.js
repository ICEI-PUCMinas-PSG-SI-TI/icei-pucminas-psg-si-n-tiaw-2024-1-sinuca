//ALERTA PARA CADASTRO

function ready(fn){
    if(document.readyState != "loading"){
        fn();

    }
    else{
        document.addEventListener('DOMContentLoaded', fn);

    }
}
ready(function(){
    alertify.alert('Atenção !', 'Você precisa estar logado para participar de partidas', function(){  });
    alertify.dialog('alert').set({transition:'zoom'}).show(); 

})

function cadastro(){
    window.location.href = '/cadastro/cadastro.html';
}
function login(){
    window.location.href = '/login/login.html';
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
 //CRIAR O LOCAL STORAGE E PREENCHER OS DADOS COM JSON
 function salvarDados() {
  const dados = {
      publicas: [
          {titulo: "Bilhares Brunswick", subtitulo: "Torneio mensal do Brunswick", lista: ["Dia/Horário: 19:00 as 22:00 - 01/05", "Tipo de jogo: Sinuca tradicional", "Endereço: Av. Afonso Pena, 4172 - 2º andar - Cruzeiro. Belo Horizonte"], jogadores: "8/20", idPartida: "1"},
          {titulo: "Sinucas Point", subtitulo: "Torneio semanal do Sinucas Point", lista: ["Dia/Horário: 15:00 as 22:00 - 08/07", "Tipo de jogo: Sinuca tradicional", "Endereço: Av. Brasil, 1238 - Funcionários, Belo Horizonte"], jogadores: "8/15", idPartida: "2"},
          {titulo: "Bilhares Elite", subtitulo: "Torneio mensal do Bilhares Elite", lista: ["Dia/Horário: 17:30 as 22:00 - 28/04", "Tipo de jogo: Bilhar Francês", "Endereço: R. Gávea, 370 - Jardim America, Belo Horizonte"], jogadores: "3/10", idPartida: "3"},
          {titulo: "Ponto Chic Bilhares", subtitulo: "Torneio semanal do Ponto Chic Bilhares", lista: ["Dia/Horário: 14:00 as 22:00 - 20/05", "Tipo de jogo: Sinuca tradicional", "Endereço: Av. Presidente Carlos Luz, 452 - Caiçaras, Belo Horizonte"], jogadores: "9/10", idPartida: "4"},
          {titulo: "Tim Academia de Bilhares Ltda", subtitulo: "Torneio mensal do Tim Academia de Bilhares", lista: ["Dia/Horário: 18:00 as 23:00 - 13/09", "Tipo de jogo: Sinuca tradicional", "Endereço:Rua dos Carijós, 109 - Centro, Belo Horizonte"], jogadores: "3/6", idPartida: "5"},
      ],
      privadas: [
          {titulo: "Casa do Guilherme", subtitulo: "Torneio privado", lista: ["Dia/Horário: 17:30 as 22:00 - 28/04", "Tipo de jogo: Sinuca tradicional", "Endereço: R. Lurdes, 370 - São Gabriel, Belo Horizonte"], jogadores: "3/10"},
          {titulo: "Casa do Mateus", subtitulo: "Torneio privado", lista: ["Dia/Horário: 13:45 as 20:00 - 23/04", "Tipo de jogo: Sinuca tradicional", "Endereço: R. da Vitória, 51 - Funcionários, Belo Horizonte"], jogadores: "4/10"},
          {titulo: "Casa do Pedro", subtitulo: "Torneio privado", lista: ["Dia/Horário: 17:30 as 21:00 - 26/07", "Tipo de jogo: Sinuca tradicional", "Endereço: Av. Proncipal 420 - Maria Goretti, Belo Horizonte"], jogadores: "3/10"},
          {titulo: "Casa do Bernardo", subtitulo: "Torneio privado", lista: ["Dia/Horário: 17:30 as 00:00 - 18/02", "Tipo de jogo: Sinuca tradicional", "Endereço: R. Gávea, 250 - Jardim America, Belo Horizonte"], jogadores: "8/10"},
          {titulo: "Casa do Rafael", subtitulo: "Torneio privado", lista: ["Dia/Horário: 09:30 as 18:00 - 28/04", "Tipo de jogo: Sinuca tradicional", "Endereço: R. Cabral, 70 - Santa inês, Belo Horizonte"], jogadores: "6/10"},
      ]
  };

  localStorage.setItem('db', JSON.stringify(dados));
}

salvarDados();
//LE OS DADOS DO LOCAL STORAGE 
function leDados() {
  let strDados = localStorage.getItem('db');
  let objDados = {};

  if (strDados) {
      objDados = JSON.parse(strDados);
  }

  return objDados;
}
//PREENCHE A PAGINA COM OS CARDS DOS JOGOS
function preencherCards() {
  const dados = leDados();

  const containerPublicas = document.querySelector('.swiper-wrapper.publicas');
  const containerPrivadas = document.querySelector('.swiper-wrapper.privadas');

  containerPublicas.innerHTML = '';
  containerPrivadas.innerHTML = '';

  const criarCard = (partida) => {
      const descricaoListItems = partida.lista.map(item => `<li>${item}</li>`).join('');

      return `
          <div class="swiper-slide">
              <div class="col pt-4">
                  <div class="card">
                      <div class="card-body">
                          <h5 class="card-title text-light">${partida.titulo}</h5>
                          <h6 class="card-subtitle mb-2 text-light">${partida.subtitulo}</h6>
                          <p class="card-text text-light">
                              <ul>${descricaoListItems}</ul>
                          </p>
                          <span class="fa-regular fa-user text-light">${partida.jogadores}</span>
                          <a class="botaoParticipar btn btn-primary mx-3" href="/detalhespartida/partida.html?id=${partida.idPartida}" role="button">Detalhes</a>
                      </div>
                  </div>
              </div>
          </div>
      `;
  };

  dados.publicas.forEach(partida => {
      containerPublicas.innerHTML += criarCard(partida);
  });

  dados.privadas.forEach(partida => {
      containerPrivadas.innerHTML += criarCard(partida);
  });
}


document.addEventListener('DOMContentLoaded', preencherCards);