
localStorage.setItem('user', 1)
//FUNÇÃO DE CARREGAR COMENTARIOS

function CarregaComentario() {


fetch("/comentarios")
.then(response => {
  
  if (!response.ok) {
    throw new Error('Erro na requisição');
  }
  return response.json(); 
})
.then(data => {
  //PROCESSAR
  


  const filtro = document.getElementById('FiltroBtn')



  if (filtro.value == "likeFiltro") {
    data.sort((a, b) => b.likes - a.likes);

  }

  else if (filtro.value == "newFiltro") {
    data.sort((a, b) => a.id - b.id);

  }

  let comentarios = document.getElementById('comentariosconteudo')
  comentarios.innerHTML = ""

  for (let i = 0; i < data.length; i++) {
    let user = localStorage.getItem('user')
    const nome = data[i].usuario
    const sugestao = data[i].conteudo
    const likes = data[i].likes
    const idcoment = data[i].id

    if (data[i].likesdados) {
      if(idcoment == user){
        comentarios.innerHTML += (`<div class="comentario"id="${idcoment}" style="background-color:#d9ffd1;"> <h3>Você</h3><p>${sugestao}<span onclick=DarLike(this)><a href="#" class="bg-success p-1 text-white border rounded-pill">${likes}❤️</a></span></div>`)

      }
      else{
      comentarios.innerHTML += (`<div class="comentario"id="${idcoment}"> <h3>${nome}</h3><p>${sugestao}<span onclick=DarLike(this)><a href="#" class="bg-success p-1 text-white border rounded-pill">${likes}❤️</a></span></div>`)
    }
    }


    else {
      if (idcoment == user){
        comentarios.innerHTML += (`<div class="comentario"id="${idcoment}"><h3>Você</h3><p>${sugestao}<span onclick=DarLike(this)><a href="#" class="text-white p-1">${likes}❤️</a></span></div>`)
      }
      else{
      comentarios.innerHTML += (`<div class="comentario"id="${idcoment}"><h3>${nome}</h3><p>${sugestao}<span onclick=DarLike(this)><a href="#" class="text-white p-1">${likes}❤️</a></span></div>`)
    }
    }
    }
    console.log('meuscoments')
MeusComentarios()
   
  //MeusComentarios()
 async function MeusComentarios() {


    let meuscomentarios = document.getElementById('MeusComentariosConteudo')
      meuscomentarios.innerHTML = ''

    
      try
      {
        let resposta = await fetch('/comentarios');
        if (!resposta.ok) {
          throw new Error('Erro ao obter usuários');
        }
        let meuscoments = await resposta.json();
        for (let i = 0; i < meuscoments.length; i++) {
          const nome = meuscoments[i].usuario
          let user = localStorage.getItem('user')
          const sugestao = meuscoments[i].conteudo
          const likes = meuscoments[i].likes
          const idcoment = meuscoments[i].id
  
          if (idcoment == user) {
            meuscomentarios.innerHTML += (`<div class="comentario" id="${idcoment}"style="background-color:#d9ffd1;""> <h3>Você</h3><p>${sugestao}<span>${likes}❤️</span><button onclick=ExcluirComentario(this)>Excluir Comentario</button></div>`)
          }
        }

      }
      catch (erro) {
        console.error('Ocorreu um erro no fetch comentarios:', erro);
      }

      

    }
    

   
  




  
})
.catch(error => {
  console.error('Erro:', error); // Trata os erros da requisição
});




}
//FUNÇÃO DE CARREGAR COMENTARIOS



//FUNÇÃO DE ADICIONAR COMENTARIOS
function EnviarComentario() {
  

  let user = localStorage.getItem('user')
  let novoComentario;
  // console.log(nomeComentario.value)
 let usuarioID = obterUsuarioPorNome(user)
  async function obterUsuarioPorNome(user) {
    try {
      let resposta = await fetch('/usuarios');
      if (!resposta.ok) {
        throw new Error('Erro ao obter usuários');
      }
      let usuarios = await resposta.json();
      console.log('usuariosdata',usuarios)
      let userLogin = usuarios.find(usuario => usuario.id == user);
      console.log('userlogin = ',userLogin)
      let idlogin = userLogin.id
      
      let camposugestão = document.getElementById('sugestao')
      const conteudoComentario = camposugestão.value
      console.log(idlogin)
      try {
        const respostaUsuario = await fetch(`/usuarios/${idlogin}`);
        if (!respostaUsuario.ok) {
          throw new Error('Erro ao obter informações do usuário');
        }
        const usuario = await respostaUsuario.json();
    
        const comentario = {
          usuario: usuario.nome,
          conteudo: conteudoComentario,
          likes: 0,
          likesdados: false
        };
    
        const respostaComentario = await fetch('/comentarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(comentario)
        });
    
        if (!respostaComentario.ok) {
          throw new Error('Erro ao postar comentário');
        }
    
        const novoComentario = await respostaComentario.json();
        console.log('Comentário postado com sucesso:', novoComentario);
      }
     catch (erro) {
      console.error('Ocorreu um erro:', erro);
    }
    
  }
  catch (erro) {
    console.error('Ocorreu um erro:', erro);
  }
 
  console.log('a')
  CarregaComentario()
}}
  // Função para postar um comentário
 
  
    // fetchedData não está disponível aqui imediatamente após o fetch iniciar

    // Exemplo de como usar fetchedData posteriormente, após o fetch ter completado
 
  
  
  
  

  // Chamada de exemplo para usar os dados após o fetch ter completado




  
 

//
  
//
  /*fetch("/usuarios")
  .then(response1 => {
    if (!response1.ok) {
      throw new Error('Erro ao buscar recurso1: ' + response1.status);
    }
    return response1.json(); // retorna a resposta da primeira requisição como JSON
  })
  .then(data1 => {
    

    
    return fetch("/comentarios", {
      
    });
  })
  .then(response2 => {
    if (!response2.ok) {
      throw new Error('Erro ao criar recurso2: ' + response2.status);
    }
    return response2.json(); // retorna a resposta da segunda requisição como JSON
  })
  .then(data2 => {
    console.log('Recurso2 criado com sucesso:', data2);
    // Aqui você pode manipular a resposta da segunda requisição
  })
  .catch(error => {
    console.error('Erro durante as requisições:', error);
  });

  

  /*

  if (emailComentario.value == "" || sugestaoComentario.value == ""){
    alert('Email / Sugestão em branco')
  }
  else {
    

  CarregaComentario()
  }

*/

//FUNÇÃO DE ADICIONAR COMENTARIOS





//FUNÇÃO DE MOSTRAR SEUS COMENTARIOS


//FUNÇÃO DE MOSTRAR SEUS COMENTARIOS






//FUNÇÃO DE REMOVER COMENTARIOS
async function ExcluirComentario(button) {

  let confirmacao = confirm("Deseja excluir esse comentário?")

  try{
    let fetchComents = await fetch('/comentarios')
    if (!fetchComents.ok) {
      throw new Error('Erro ao obter informações do usuário');
    }
    let resposta = await fetchComents.json();
    console.log('resposta = ', resposta)

    var parentDiv1 = button.parentElement;
    console.log('parentDiv1',parentDiv1)
    var parentDiv2 = parentDiv1.parentElement;
    console.log('parentDiv2',parentDiv2)
    var DivId = parentDiv2.id
    console.log('DivId',DivId)



    let comentarioDelete = resposta.find(resposta => resposta.id == DivId)
    console.log('comentariodelete = ', comentarioDelete)
    let iddelete = comentarioDelete.id
    console.log('iddelete = ', iddelete)


    

    try{
      let deletar = await fetch(`/comentarios/${iddelete}`,{ method: 'DELETE'})
      if (!deletar.ok){
        throw new error('Erro ao deletar comentário')
      }

      console.log('Comentário deletado com SUCESSO')
      CarregaComentario()
    }
    catch(erro){
      console.error("Erro no fetch delete", erro)
    }
  }
  catch(erro){
    console.error("Erro no fetch comentarios", erro)
  }

/*
  if (confirmacao) {
    const commentGet = localStorage.getItem('comentarios')
    const commentParse = JSON.parse(commentGet)



    

    

    
    commentParse.splice(idcomentario, 1)
    console.log(commentParse)
    const commentString = JSON.stringify(commentParse)
    localStorage.setItem('comentarios', commentString)

    CarregaComentario()
  }
  else {

  }
*/
}
//FUNÇÃO DE REMOVER COMENTARIOS


//FUNÇÃO DE DAR LIKE
function DarLike(span) {
 
  let Parent1 = span.parentElement
  let Parent2 = Parent1.parentElement
  let idLikes = Parent2.id

 
 
  fetch('/comentarios')
  .then(response => {
    if (!response.ok) {
        throw new Error('Erro ao buscar os dados dos comentarios');
    }
    return response.json();
  })
  .then(data => {
    console.log('Dados dos comentários:', data);
    
    let idComentario = data.find(item => item.id == idLikes)
    
    if (idComentario.likesdados){
      alert('Você já curtiu esse comentário')
      return;
    }
    
    let updatedData = {
      likes: idComentario.likes + 1,
      likesdados: true
    };
     

    return fetch(`/comentarios/${idComentario.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
    });
  })
  .then(response => {
    CarregaComentario()
    if (!response.ok) {
        throw new Error('Erro ao atualizar os dados');
    }
    console.log('Dados atualizados com sucesso');

  })
  .catch(error => {
    console.error('Erro:', error);
  });   
}
  
  
  

 
////////////
 
   
    
    
  

  


    

   

    
    
    /*let validacao = true;

    for (let i = 0; i < likesParse.length; i++) {
      

      if (idLikes == likesParse[i].id) {
        alert('Você ja curtiu esse comentário!')
        validacao = false;
        break;
      }
      else {
        validacao = true;
      }
    }
    if (validacao == true) {
      commentParse[idLikes].curtidas += 1

      const newComentario = {
        "id": idLikes,
      }

      likesParse.push(newComentario)


      const likesString = JSON.stringify(likesParse)
      localStorage.setItem('seuslikes', likesString)

      const commentString = JSON.stringify(commentParse)
      localStorage.setItem('comentarios', commentString)


      CarregaComentario()*/

      
    

  

  
 
  




  // let novaCurtida = commentParse.find(item => item.id === idLikes)




//FUNÇÃO DE DAR
