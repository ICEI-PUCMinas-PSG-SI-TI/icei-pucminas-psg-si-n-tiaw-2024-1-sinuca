
//CARREGA OS DETALHES DA PARTIDA SELECIONADA
async function carregarDetalhesPartida() {
    try {

        const response = await fetch('/torneiospublicos');
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados da partida');
        }
        const dados = await response.json();

        console.log('Dados recebidos:', dados);


        if (!dados || !Array.isArray(dados)) {
            throw new Error('Estrutura de dados inválida: torneiospublicos não encontrado');
        }

        const urlParams = new URLSearchParams(window.location.search);
        const idPartida = urlParams.get('id');

        if (!idPartida) {
            throw new Error('ID da partida não especificado na URL');
        }

        const DadosPartida = dados.find(partida => partida.id === parseInt(idPartida));

        if (!DadosPartida) {
            throw new Error('Partida não encontrada com o ID fornecido');
        }

        let idLogado = localStorage.getItem('user')
        let btnParticipar = document.getElementById('btnParticipar')
        let JaEstaParticipando = DadosPartida.convidados.find(convidados => convidados.id == idLogado)
        if (JaEstaParticipando) {
            btnParticipar.innerText = "Cancelar Participação";
            btnParticipar.style.backgroundColor = 'red';
        }
        else {
            btnParticipar.innerText = "Participar";
            btnParticipar.style.backgroundColor = '';
        }

        let convidadosdapartida = DadosPartida.convidados
        console.log('convidados =', convidadosdapartida)
        // Preenche os detalhes da partida no HTML
        document.getElementById('nomeLocal').innerText = DadosPartida.titulo;
        document.getElementById('descricao').innerText = DadosPartida.endereco;
        document.getElementById('horario').innerText = `Data: ${DadosPartida.data}, Horário: ${DadosPartida.horario}`;
        document.getElementById('contato').innerText = `Máximo de pessoas: ${DadosPartida.maximopessoas}`;
        for (let i = 0; i < convidadosdapartida.length; i++) {
            document.getElementById('convidados').innerHTML += `<div class="convidados col-lg-12 mb-3 d-flex align-items-center"><img src="${convidadosdapartida[i].fotodeperfil}"  class="me-2" alt="" width="50px">${convidadosdapartida[i].nome}</div>`;
        }

        var map = L.map('map').setView([DadosPartida.latitude, DadosPartida.longitude], 10);

        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=rEFsjBSQTua458cEzVAB', {
            attribution: 'MapTiler © Todos os direitos reservados'
        }).addTo(map);

        L.marker([DadosPartida.latitude, DadosPartida.longitude]).addTo(map)
            .bindPopup(DadosPartida.titulo)
            .openPopup();


    } catch (error) {
        console.error('Erro ao carregar os detalhes da partida:', error);
        alert("Erro ao carregar os detalhes da partida");
        window.location.href = "/index.html";
    }
}

document.addEventListener('DOMContentLoaded', carregarDetalhesPartida);
//FUNCIONALIDADE PARA PARTICIPAR NA PARTIDA 
async function ParticiparPartida() {

    let idLogado = localStorage.getItem('user')

    if (!idLogado) {
        alertify.alert('Atenção !', 'Você precisa estar logado para participar de partidas', function () { });
        alertify.dialog('alert').set({ transition: 'zoom' }).show();
        return
    }

    try {
        let respostaUsuarios = await fetch(`/usuarios/${idLogado}`)
        if (!respostaUsuarios.ok) {
            console.error('Usuário não encontrado')
        }
        let DadosUsuarios = await respostaUsuarios.json()
        console.log('dadosusuarios = ', DadosUsuarios)
        console.log('userlog = ', DadosUsuarios)

        let nomedeusuario = DadosUsuarios.nome
        let fotodeperfil = DadosUsuarios.fotodeperfil

        const urlParams = new URLSearchParams(window.location.search);
        const idTorneio = urlParams.get('id');

        let repostaTorneio = await fetch(`/torneiospublicos/${idTorneio}`)
        if (!repostaTorneio.ok) {
            console.error('Torneio não encontrado')
        }
        let DadosTorneio = await repostaTorneio.json()
        console.log(DadosTorneio)
        if (DadosTorneio.convidados.length >= DadosTorneio.maximopessoas){
            alert('Essa partida ja está cheia')
            return
        }

        let AddConvidado = DadosTorneio.convidados
        let AddConvidadoJson = JSON.stringify(AddConvidado)
        let AddConvidadoArray = JSON.parse(AddConvidadoJson)
        AddConvidadoArray.push({ id: idLogado, nome: nomedeusuario, fotodeperfil: fotodeperfil })



        let Convidar = {
            convidados: AddConvidadoArray
        }

        let JaEstaParticipando = DadosTorneio.convidados.find(convidados => convidados.id == idLogado)


        if (JaEstaParticipando) {
            console.log('ja ta participando')

            let RemoveParticipacaoID = DadosTorneio.convidados.filter(convidados => convidados.id !== JaEstaParticipando.id)
            console.log('removeid=', RemoveParticipacaoID)

            RemoveParticipacaoID = DadosTorneio.convidados.filter(convidados => convidados.nome !== JaEstaParticipando.nome)
            console.log('removenome=', RemoveParticipacaoID)
            RemoveParticipacaoID = DadosTorneio.convidados.filter(convidados => convidados.fotodeperfil !== JaEstaParticipando.fotodeperfil)
            console.log('removefoto=', RemoveParticipacaoID)


            let TiraParticipacao = {
                convidados: RemoveParticipacaoID
            }
            alertify.notify('Você cancelou a participação na partida', 'success', 5);
            btnParticipar.innerText = "Participar";
            btnParticipar.style.backgroundColor = '';

            const TiraConvidado = await fetch(`/torneiospublicos/${idTorneio}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(TiraParticipacao)
            });

            RecarregarConvidados()
            return
        }
        alertify.notify('Você está participando da partida', 'success', 5);
        btnParticipar.innerText = "Cancelar Participação";
        btnParticipar.style.backgroundColor = 'red';

        const NovoConvidado = await fetch(`/torneiospublicos/${idTorneio}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Convidar)
        });

        RecarregarConvidados()


    }
    catch (erro) { console.error('falha ao participar da partida', erro) }

//RECARREGA A LISTA DE CONVIDADOS
   async function RecarregarConvidados(){
    document.getElementById('convidados').innerHTML = ''
    const response = await fetch('/torneiospublicos');
    if (!response.ok) {
        throw new Error('Erro ao carregar os dados da partida');
    }
    const dados = await response.json();

    console.log('Dados recebidos:', dados);


    if (!dados || !Array.isArray(dados)) {
        throw new Error('Estrutura de dados inválida: torneiospublicos não encontrado');
    }


    const urlParams = new URLSearchParams(window.location.search);
    const idPartida = urlParams.get('id');


    if (!idPartida) {
        throw new Error('ID da partida não especificado na URL');
    }


    const DadosPartida = dados.find(partida => partida.id === parseInt(idPartida));

    if (!DadosPartida) {
        throw new Error('Partida não encontrada com o ID fornecido');
    }

  

    let convidadosdapartida = DadosPartida.convidados



    for (let i = 0; i < convidadosdapartida.length; i++) {
        document.getElementById('convidados').innerHTML += `<div class="convidados col-lg-12 mb-3 d-flex align-items-center"><img src="${convidadosdapartida[i].fotodeperfil}"  class="me-2" alt="" width="50px">${convidadosdapartida[i].nome}</div>`;
    }
    }

}
