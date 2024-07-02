// Função para obter os parâmetros da URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return { id };
  }
  
  // Exibe os parâmetros na página
  
  


//SCRIPT DO SWIPER
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

//COLOCA O NOME DO ESTABELECIMENTO NA PAGINA
async function DadosDaPágina(){
  let titulodoestabelecimento = document.getElementById('titulodoestabelecimento')
  const userInfo = getQueryParams();
  try{
    let resposta = await fetch('/estabelecimentos')
    if (!resposta.ok){
      console.error('Falha no Get Estabelecimento')
    }
    let dadosdoestabelecimento = await resposta.json()
    console.log('dados = ', dadosdoestabelecimento)
    let estabelecimentoAtual = dadosdoestabelecimento.find(dadosdoestabelecimento => dadosdoestabelecimento.cnpj == userInfo.id)
    console.log('Atual = ', estabelecimentoAtual)
    titulodoestabelecimento.innerHTML = estabelecimentoAtual.nome
  }
  catch(erro){
    console.error('Erro na função Try', erro)
  }
}





//PREENCHE A PAGINA COM OS CARDS DOS JOGOS
function preencherCards() {
    fetch('/torneiospublicos')
      .then(response => response.json())
      .then(dados => {
        console.log('dados = ',dados); 
  
        const containerPublicas = document.querySelector('.swiper-wrapper.publicas');
  
        if (!containerPublicas) {
          console.error('Container para torneios públicos não encontrado');
          return;
        }
        const userInfo = getQueryParams();
        console.log('userinfo = ', userInfo)
        containerPublicas.innerHTML = '';
  
        const criarCard = (partida) => {
            console.log('partida =', partida)
            if (userInfo.id != partida.cnpj){
                return ''
            }
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
                              <div class="d-flex justify-content-around mb-2">
                              <a class="botaoParticipar btn btn-primary d-flex justify-content-space-around text-center" href="/detalhespartida/partida.html?id=${partida.idPartida}" role="button">Detalhes</a>
                              <button class="btn btn-danger d-flex justify-content-center text-center" id="${partida.id}" onclick=RemoverTorneio(this.id)>Excluir</button>
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


// FUNÇÃO PRA IR PARA A PÁGINA DE CRIAÇÃO DE TORNEIO PUBLICO
  function IrParaCriacaoTorneioPublico(){


    const userInfo = getQueryParams();
    let cnpjEstabelecimento = userInfo.id

    const params = new URLSearchParams({
      id: cnpjEstabelecimento
    })
    
    window.location.href = `../torneiopublico/torneiopublico.html?${params.toString()}`;

  }


//FUNÇÃO PARA REMOVER TORNEIO
  async function RemoverTorneio(id){

    let idDoTorneioASerExcluido = id
    const containerPublicas = document.querySelector('.swiper-wrapper.publicas');

    if (!confirm('Tem certeza que quer excluir esse torneio?')){
      console.log('nao excluiu')
      return
    }

    try {
      let resposta = await fetch(`/torneiospublicos/${idDoTorneioASerExcluido}`,{
        method: 'DELETE'
      })
      if (!resposta.ok){
        console.error('Falha ao deletar torneio')
      }
      alert('O Torneio foi excluido com sucesso.')
      containerPublicas.innerHTML = ''
      preencherCards()
    }

    catch(erro){
      console.error('Falha no try', erro)
    }

  }