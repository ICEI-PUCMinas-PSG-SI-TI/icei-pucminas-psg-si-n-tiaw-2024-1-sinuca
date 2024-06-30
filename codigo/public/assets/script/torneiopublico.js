async function lerFormulario() {
    try {
        let titulopartida = document.getElementById('nome-partida').value;
        let endereco = document.getElementById('endereco').value;
        let cep = document.getElementById('cep').value;
        let data = document.getElementById('data').value;
        let maximo = document.getElementById('maximo').value;
        let horario = document.getElementById('horario').value;
        let telefone = document.getElementById('telefone').value;
        let email = document.getElementById('email').value;

        // Fetch para obter os dados do CEP
        let respostaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!respostaCEP.ok) {
            throw new Error('Não foi possível obter os dados do CEP');
        }

        let dadosCEP = await respostaCEP.json();

        // Preenche os campos de endereço com os dados obtidos do CEP
        document.getElementById('endereco').value = `${dadosCEP.logradouro}, ${dadosCEP.bairro}`;

        // Fetch para obter latitude e longitude do endereço
        let enderecoCompleto = `${dadosCEP.logradouro}, ${dadosCEP.localidade}, ${dadosCEP.uf}`;
        let respostaGeo = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto)}`);
        if (!respostaGeo.ok) {
            throw new Error('Não foi possível obter as coordenadas geográficas');
        }

        let dadosGeo = await respostaGeo.json();

        // Verifica se foram encontradas coordenadas
        if (dadosGeo.length === 0) {
            throw new Error('Coordenadas geográficas não encontradas para o endereço especificado');
        }

        // Atribui as coordenadas ao objeto de dados do torneio
        const torneiodados = {
            titulo: titulopartida,
            endereco: endereco,
            cep: cep,
            data: data,
            maximopessoas: maximo,
            horario: horario,
            latitude: parseFloat(dadosGeo[0].lat),
            longitude: parseFloat(dadosGeo[0].lon),
            convidados: []
        };

        // Fetch para enviar os dados do torneio para o servidor
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
            console.log('Torneio criado com sucesso!');
            // Limpa os campos do formulário após o envio bem-sucedido
            document.getElementById('form-partida').reset();
        }

    } catch (erro) {
        console.error('Ocorreu um erro:', erro);
        alert('Ocorreu um erro ao criar o torneio. Verifique os dados e tente novamente.');
    }
}
