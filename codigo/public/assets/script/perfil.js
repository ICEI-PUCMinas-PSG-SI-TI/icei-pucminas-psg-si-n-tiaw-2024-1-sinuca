
//CARREGA OS DADOS DO PERFIL LOGADO NA PÁGINA
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

    let respostapartidas = await fetch('/torneiospublicos')
    if (!respostapartidas.ok) {
      console.error('Fetch Get (2) falha')
    }
    let HistoricoDePartida = document.getElementById('matchList')
    let DadosTorneiosPublicos = await respostapartidas.json()
    console.log('dadostortneiospublicos = ', DadosTorneiosPublicos)
    for (let i = 0; i < DadosTorneiosPublicos.length; i++) {
      let ConvidadosPublicos = DadosTorneiosPublicos[i].convidados
      let TorneioPublicoParticipando = ConvidadosPublicos.find(ConvidadosPublicos => ConvidadosPublicos.id == userLogado)
      if (TorneioPublicoParticipando) {
        HistoricoDePartida.innerHTML += `<a href="/detalhespartida/partida.html?id=${DadosTorneiosPublicos[i].id}"><div>${DadosTorneiosPublicos[i].titulo}</div></a>`
      }
    }

    let respostapartidaspriv = await fetch('/torneiosprivados')
    if (!respostapartidas.ok) {
      console.error('Fetch Get (3) falha')
    }
    let DadosTorneiosPrivados = await respostapartidaspriv.json()
    console.log('DadosTorneiosPrivados = ', DadosTorneiosPrivados)

    for (let i = 0; i < DadosTorneiosPrivados.length; i++) {
      let ConvidadosPrivados = DadosTorneiosPrivados[i].convidados
      let TorneioPrivadoParticipando = ConvidadosPrivados.find(ConvidadosPrivados => ConvidadosPrivados.id == userLogado)
      if (TorneioPrivadoParticipando) {
        HistoricoDePartida.innerHTML += `<a href="#" id="${DadosTorneiosPrivados[i].id}" onclick=MostrarModal(this.id) data-bs-toggle="modal" data-bs-target="#PartidaModal"><div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
</svg>${DadosTorneiosPrivados[i].titulo}</div></a>`
      }
    }

  }
  catch (erro) {
    console.log('falha na função carregar dados', erro)
  }
}
//FUNCIONALIDA PARA TROCAR AS FOTOS BASEADAS EM ENDEREÇO DE IMAGEM
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
    if (!resposta2.ok) {
      console.erro('Falha no Patch Trocar Foto')
    }
    console.log('respota 2 : ok')
  }

  catch (erro) {
    console.error('falha na função de trocar foto', erro)
  }

  CarregarDadosPerfil()

}
//FUNÇÃO PARA MOSTRAR O MODAL DO BOOTSTRAP
async function MostrarModal(div){

  let idTorneio = div
  console.log('idtorneio = ',idTorneio)

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
    console.log('torneioclicado = ', torneioclicado)
    titulomodal.textContent = torneioclicado.titulo
    novaid.id = idTorneio

  }

  catch(erro){console.error('Falha no try', erro)}
}
//VALIDA A SENHA DAS PARTIDAS PRIVADAS
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
    console.log('torneioclicado 2 = ', torneioclicado)
    if (senhaColocada == torneioclicado.senha){
      window.location = `../mostrartorneioprivado/mostrartorneioprivado.html?id=${torneioclicado.id}`
    }
    else{
      alert('Senha incorreta, tente novamente.')
    }
  }
  catch(erro){console.error('Falha no try', erro)}
  

}
