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

        var participando = false;
        var btnParticipar = document.getElementById('btnParticipar');
        btnParticipar.addEventListener('click', function() {
            if (participando) {
                alertify.notify('Você cancelou a participação na partida', 'success', 5);
                btnParticipar.innerText = "Participar";
                btnParticipar.style.backgroundColor = '';
            } else {
                alertify.notify('Você está participando da partida', 'success', 5);
                btnParticipar.innerText = "Cancelar Participação";
                btnParticipar.style.backgroundColor = 'red';
            }
            participando = !participando;
        });

    } catch (error) {
        console.error('Erro ao carregar os detalhes da partida:', error);
        alert("Erro ao carregar os detalhes da partida");
        window.location.href = "/index.html"; 
    }
}

document.addEventListener('DOMContentLoaded', carregarDetalhesPartida);
