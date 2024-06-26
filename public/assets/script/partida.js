//IDENTIFICA O ID DA PARTIDA
const urlParams = new URLSearchParams(window.location.search);
const idPartida = urlParams.get('id');

//PREENCHER OS DETALHES DAS PARTIDAS
var dadosPartida = {
    "partida1": {
        "nomeLocal": "Bilhares Brunswick",
        "descricao": "Restaurante informal espaçoso com um salão amplo e várias mesas de bilhar",
        "horario": "19:00 as 22:00 01/05",
        "contato": "Telefone: (31) 3213-7200 Email: contato@brunswickbh.com.br",
        "latitude": "-19.94653499958792",
        "longitude": "-43.92151727648558"
    },
    "partida2": {
        "nomeLocal": "Sinucas Point",
        "descricao": "Serve ótimos coquetéis, tem jogos de bar, serve comida no bar",
        "horario": "15:00 as 22:00 - 08/07",
        "contato": "Telefone: (31) 3646-0793",
        "latitude": "-19.928874886196024",
        "longitude": "-43.93039299411579"
    },
    "partida3": {
        "nomeLocal": "Bilhares Elite",
        "descricao": "Porções de bolinhos, batatas, pastéis, cervejas e drinques, em atmosfera descontraída com mesas de bilhar",
        "horario": "17:30 as 22:00 - 28/04",
        "contato": "Telefone: (31) 3373-7613",
        "latitude": "-19.939503625033268",
        "longitude": "-43.9767611978131"
    },
    "partida4": {
        "nomeLocal": "Ponto Chic Bilhares",
        "descricao": "Local com comida boa e muitas mesas para se divertir",
        "horario": "14:00 as 22:00 - 20/05",
        "contato": "Telefone: (31) 3411-7396",
        "latitude": "-19.904805663184213",
        "longitude": "-43.964275897813934"
    },
    "partida5": {
        "nomeLocal": "Tim Academia de Bilhares Ltda",
        "descricao": "Bar de sinuca para se divertir com os amigos",
        "horario": "18:00 as 23:00 - 13/09",
        "contato": "Telefone: (31) 3226-8476",
        "latitude": "-19.91966659492644",
        "longitude": "-43.936329593680696"
    },
};

const DadosPartida = dadosPartida["partida" + idPartida];

if (DadosPartida) {
    document.getElementById('nomeLocal').innerText = DadosPartida.nomeLocal;
    document.getElementById('descricao').innerText = DadosPartida.descricao;
    document.getElementById('horario').innerText = DadosPartida.horario;
    document.getElementById('contato').innerText = DadosPartida.contato;
} else {
    alert("Partida não encontrada");
    window.location.href = "/index.html";
}

//MUDA BOTÃO PARRRTICIPAR
var participando = false; 
var btnParticipar = document.getElementById('btnParticipar');
btnParticipar.addEventListener('click', function() {
    if (participando) {
        var notification = alertify.notify('Você cancelou a participação na partida', 'success', 5, function(){  console.log('dismissed'); });
        btnParticipar.innerText = "Participar";
        btnParticipar.style.backgroundColor = '';
    } else {
        var notification = alertify.notify('Você está participando da partida', 'success', 5, function(){  console.log('dismissed'); });
        btnParticipar.innerText = "Cancelar Participação";
        btnParticipar.style.backgroundColor = 'red';
    }

    participando = !participando;
});

// Função para inicializar o mapa
function initMap() {
    // Verifica se a partida correspondente foi encontrada no JSON
    if (!DadosPartida) {
        alert("Partida não encontrada");
        window.location.href = "/index.html";
        return;
    }

    // Coordenadas da partida atual
    const coordenadas = {
        latitude: DadosPartida.latitude,
        longitude: DadosPartida.longitude
    };

    // Configurações do mapa
    var map = L.map('map').setView([coordenadas.latitude, coordenadas.longitude], 10);

    // Adicione o mapa base do MapTiler (ou outro provedor de mapas compatível com Leaflet)
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=rEFsjBSQTua458cEzVAB', {
        attribution: 'MapTiler © Todos os direitos reservados'
    }).addTo(map);

    // Adiciona o marcador para a localização da partida
    L.marker([coordenadas.latitude, coordenadas.longitude]).addTo(map)
        .bindPopup(DadosPartida.nomeLocal) // Exibe o nome do local ao clicar no marcador
        .openPopup();
}

// Chama a função initMap quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', initMap);
