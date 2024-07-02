//FUNÇÃO PRA PEGAR OS PARAMETROS DA PAGINA
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return { id };
  }


//FUNÇÃO PRA LER OS DADOS E ENVIAR PARA O SERVIDOR
async function lerFormulario() {
    try {
        let getcep = await fetch('/estabelecimentos')
        let dadosestabelcimento = await getcep.json()
        const cnpjAtual = getQueryParams();
        let AtualEstabelecimento = dadosestabelcimento.find(dadosestabelcimento => dadosestabelcimento.cnpj == cnpjAtual.id)
        let CepAtual = AtualEstabelecimento.cep







        let titulopartida = document.getElementById('nome-partida').value;
        let endereco = AtualEstabelecimento.endereco;
        let cep = CepAtual;
        let data = document.getElementById('data').value;
        let maximo = document.getElementById('maximo').value;
        let horario = document.getElementById('horario').value;


        let respostaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!respostaCEP.ok) {
            throw new Error('Não foi possível obter os dados do CEP');
        }

        let dadosCEP = await respostaCEP.json();



        let enderecoCompleto = `${dadosCEP.logradouro}, ${dadosCEP.localidade}, ${dadosCEP.uf}`;
        let respostaGeo = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto)}`);
        if (!respostaGeo.ok) {
            throw new Error('Não foi possível obter as coordenadas geográficas');
        }

        let dadosGeo = await respostaGeo.json();

        if (dadosGeo.length === 0) {
            throw new Error('Coordenadas geográficas não encontradas para o endereço especificado');
        }

        const torneiodados = {
            titulo: titulopartida,
            endereco: endereco,
            cep: cep,
            cnpj: cnpjAtual.id,
            data: data,
            maximopessoas: maximo,
            horario: horario,
            latitude: parseFloat(dadosGeo[0].lat),
            longitude: parseFloat(dadosGeo[0].lon),
            convidados: []
        };


        let respostaTorneio = await fetch('/torneiospublicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(torneiodados)
        });

        if (!respostaTorneio.ok) {
            throw new Error('Erro ao fazer o POST dos dados do torneio');
        } else {
            alert('Torneio criado com sucesso!');
            document.getElementById('form-partida').reset()
            window.location=document.referrer;
        }

    } catch (erro) {
        console.error('Ocorreu um erro:', erro);
        alert('Ocorreu um erro ao criar o torneio. Verifique os dados e tente novamente.');
    }
}
