/*document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

function addTask(text) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.textContent = text;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover';
    removeBtn.addEventListener('click', function() {
        removeTask(li);
    });

    li.addEventListener('click', function() {
        li.classList.toggle('completed');
        updateLocalStorage();
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);
    updateLocalStorage();
}

function removeTask(taskItem) {
    taskItem.remove();
    updateLocalStorage();
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        tasks.push({
            text: taskItem.firstChild.textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text);
        if (task.completed) {
            document.querySelectorAll('#task-list li').forEach(taskItem => {
                if (taskItem.firstChild.textContent === task.text) {
                    taskItem.classList.add('completed');
                }
            });
        }
    });
}
//fim da lista

async function lerFormulario() {
   
   let titulopartida = document.getElementById('titulopartida').value
   let endereco = document.getElementById('endereco').value
   let cep = document.getElementById('cep').value
   let data = document.getElementById('data').value
   let maximo = document.getElementById('maximo').value
   let horario = document.getElementById('horario').value

   if (titulopartida.trim() === '' || endereco.trim() === '' || cep.trim() === ''|| data.trim() === ''|| maximo.trim() === ''|| horario.trim() === ''){
    alert('Preencha todos os campos')
    return
   }

   const torneiodados = {
    titulo: titulopartida,
    endereco: endereco,
    cep: cep,
    data: data,
    maximopessoas: maximo,
    horario: horario,
    convidados: []
   }

   try{
     
    let resposta = await fetch('/torneiosprivados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(torneiodados)
      });

      if (!resposta.ok){
        console.error('Erro ao fazer o Post dos convidados')
      }

   }

   catch (erro) {
    console.error('Ocorreu um erro:', erro);
  }*/

 


async function lerFormulario() {
    try {
        let titulopartida = document.getElementById('titulopartida').value;
        let endereco = document.getElementById('endereco').value;
        let cep = document.getElementById('cep').value
        console.log('cep = ',cep)
        let data = document.getElementById('data').value;
        let maximo = document.getElementById('maximo').value;
        let horario = document.getElementById('horario').value;
        let telefone = document.getElementById('telefone').value;
        let email = document.getElementById('email').value;
        let senha = document.getElementById('senha').value;

        let respostaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!respostaCEP.ok) {
            throw new Error('Não foi possível obter os dados do CEP');
        }

        let dadosCEP = await respostaCEP.json();

        document.getElementById('endereco').value = `${dadosCEP.logradouro}, ${dadosCEP.bairro}`;

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
            data: data,
            maximopessoas: maximo,
            horario: horario,
            latitude: parseFloat(dadosGeo[0].lat),
            longitude: parseFloat(dadosGeo[0].lon),
            convidados: [],
            senha: senha
        };

        let respostaTorneio = await fetch('/torneiosprivados', {
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
            document.getElementById('form-partida').reset();
        }

    } catch (erro) {
        console.error('Ocorreu um erro:', erro);
        alert('Ocorreu um erro ao criar o torneio. Verifique os dados e tente novamente.');
    }
}

   
   
   
   
   
   
   
   
   
   /*
   // Seleciona o formulário
    const form = document.getElementById('form-partida');

    // Coleta os valores dos campos do formulário
    const nomePartida = form.elements['nome-partida'].value;
    const endereco = form.elements['endereco'].value;
    const data = form.elements['data'].value;
    const cep = form.elements['cep'].value;
    const contato = form.elements['contato'].value;
    const maximo = form.elements['maximo'].value;
    const horario = form.elements['horario'].value;

    // Cria um objeto com os valores coletados
    const dadosFormulario = {
        nomePartida: nomePartida,
        endereco: endereco,
        email: email,
        cep: cep,
        contato: contato,
        maximo: maximo,
        horario: horario
    };

    // Converte o objeto para uma string JSON
    const dadosFormularioJSON = JSON.stringify(dadosFormulario);

    // Exibe a string JSON no console 
    console.log(dadosFormularioJSON);*/

//fim array ler formulário

/*async function lerConvidado() {
    
    let jogadorconvidado = document.getElementById('jogadorconvidado').value
    
    if (!sessionStorage.getItem('convidados')){
        sessionStorage.setItem('convidados', [])
    }

    try {
        let resposta = await fetch('/usuarios')
        if (!resposta.ok){
            console.error('Falha ao pegar dados de usuarios')
        }
        let DadosDosUsuarios = await resposta.json()
        console.log('Dados dos usuarios = ', DadosDosUsuarios)

        let acharjogador = DadosDosUsuarios.find(DadosDosUsuarios => DadosDosUsuarios.nome == jogadorconvidado)
        if (!acharjogador){
            alert('Jogador não encontrado')
            return
        }



    }

    catch(erro) {
        console.error('Erro no Get (1)', erro)
    }









  /*  const form = document.getElementById('task-form');

    
    const amigo = form.elements['task-input'].value;    
    
    const dadosConvidado = {
        amigo: amigo,
    };

    
    const dadosConvidadoJSON = JSON.stringify(dadosConvidado);

    
    console.log(dadosConvidadoJSON);
}
//fim array ler convidado
*/
