function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return { id };
}

async function carregarDetalhesPartida() {
    try {

        const response = await fetch('/torneiosprivados');
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
        let JaEstaParticipando = DadosPartida.convidados.find(convidados => convidados.usuarioid == idLogado)
        if (JaEstaParticipando){
            btnParticipar.innerText = "Cancelar Participação";
            btnParticipar.style.backgroundColor = 'red';
        }
        else{
            btnParticipar.innerText = "Participar";
            btnParticipar.style.backgroundColor = ''; 
        }


        document.getElementById('nomeLocal').innerText = DadosPartida.titulo;
        document.getElementById('descricao').innerText = DadosPartida.endereco;
        document.getElementById('horario').innerText = `Data: ${DadosPartida.data}, Horário: ${DadosPartida.horario}`;
        document.getElementById('contato').innerText = `Máximo de pessoas: ${DadosPartida.maximopessoas}`;
        document.getElementById('senha').innerText = `Senha: ${DadosPartida.senha}`;


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

async function ParticiparPartida() {

    let idLogado = localStorage.getItem('user')
    try {
        let respostaUsuarios = await fetch(`/usuarios/${idLogado}`)
        if (!respostaUsuarios.ok) {
            console.error('Usuário não encontrado')
        }
        let DadosUsuarios = await respostaUsuarios.json()
        // let UsuarioLogado = DadosUsuarios.find(DadosUsuarios => DadosUsuarios.id == idLogado)
        console.log('userlog = ', DadosUsuarios)

        const idTorneio = getQueryParams()

        let repostaTorneio = await fetch(`/torneiosprivados/${idTorneio.id}`)
        if (!repostaTorneio.ok) {
            console.error('Torneio não encontrado')
        }
        let DadosTorneio = await repostaTorneio.json()
        console.log(DadosTorneio)

        let AddConvidado = DadosTorneio.convidados
        let AddConvidadoJson = JSON.stringify(AddConvidado)
        let AddConvidadoArray = JSON.parse(AddConvidadoJson)
        AddConvidadoArray.push({ usuarioid: idLogado })



        let Convidar = {
            convidados: AddConvidadoArray
        }

        let JaEstaParticipando = DadosTorneio.convidados.find(convidados => convidados.usuarioid == idLogado)
       
        
        if (JaEstaParticipando) {

            let RemoveParticipacao = DadosTorneio.convidados.filter(convidados => convidados.usuarioid !== JaEstaParticipando.usuarioid)


            let TiraParticipacao = {
                convidados: RemoveParticipacao
            }
            alertify.notify('Você cancelou a participação na partida', 'success', 5);
                btnParticipar.innerText = "Participar";
                btnParticipar.style.backgroundColor = '';

            const TiraConvidado = await fetch(`/torneiosprivados/${idTorneio.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(TiraParticipacao)
            });



            return
        }
        alertify.notify('Você está participando da partida', 'success', 5);
                btnParticipar.innerText = "Cancelar Participação";
                btnParticipar.style.backgroundColor = 'red';

            const NovoConvidado = await fetch(`/torneiosprivados/${idTorneio.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Convidar)
            });



       
    }
    catch (erro) { console.error('falha ao participar da partida', erro) }




}