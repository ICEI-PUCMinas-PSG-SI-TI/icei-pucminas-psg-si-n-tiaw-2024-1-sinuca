document.addEventListener('DOMContentLoaded', loadTasks);

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

function lerFormulario() {
    // Seleciona o formulário
    const form = document.getElementById('form-partida');

    // Coleta os valores dos campos do formulário
    const nomePartida = form.elements['nome-partida'].value;
    const endereco = form.elements['endereco'].value;
    const email = form.elements['email'].value;
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
    console.log(dadosFormularioJSON);
}
//fim array ler formulário

function lerConvidado() {
    
    const form = document.getElementById('task-form');

    
    const amigo = form.elements['task-input'].value;    
    
    const dadosConvidado = {
        amigo: amigo,
    };

    
    const dadosConvidadoJSON = JSON.stringify(dadosConvidado);

    
    console.log(dadosConvidadoJSON);
}
//fim array ler convidado
