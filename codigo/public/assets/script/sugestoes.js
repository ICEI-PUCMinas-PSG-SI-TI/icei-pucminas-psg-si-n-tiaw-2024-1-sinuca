//FUNÇÃO DE CARREGAR COMENTARIOS


async function CarregaComentario() {


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
    user = parseInt(user)


    let usuariologado = data.find(data => data.userId == user)

    let acharsedeulike = data[i].likesdados.find(likesdados => likesdados.idLike == user)

    const nome = data[i].usuario
    const sugestao = data[i].conteudo
    const likes = data[i].likes
    const idcoment = data[i].userId


    if (acharsedeulike) {
      if(idcoment == user){
        comentarios.innerHTML += (`<div class="comentario"id="${idcoment}" style="background-color:#d9ffd1;"> <h3>Você</h3><p>${sugestao}<span onclick=DarLike(this)><a href="#" class="bg-success p-1 text-white border rounded-pill">${likes}❤️</a></span></div>`)

      }
      else{
      comentarios.innerHTML += (`<div class="comentario"id="${idcoment}"> <h3>${nome}</h3><p>${sugestao}<span onclick=DarLike(this)><a href="#" class="bg-success p-1 text-white border rounded-pill">${likes}❤️</a></span></div>`)
    }
    }


    else {
      if (idcoment == user){
        comentarios.innerHTML += (`<div class="comentario SEU"id="${idcoment}" style="background-color:#d9ffd1;"><h3>Você</h3><p>${sugestao}<span onclick=DarLike(this)><a href="#" class="text-dark p-1">${likes}❤️</a></span></div>`)
      }
      else{
      comentarios.innerHTML += (`<div class="comentario"id="${idcoment}"><h3>${nome}</h3><p>${sugestao}<span onclick=DarLike(this)><a href="#" class="text-dark p-1">${likes}❤️</a></span></div>`)
    }
    }
    }
   

})
.catch(error => {
  console.error('Erro:', error); // Trata os erros da requisição
});




}

    
  
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
           const idcoment = meuscoments[i].userId
   
           if (idcoment == user) {
             meuscomentarios.innerHTML += (`<div class="comentario" id="${idcoment}"style="background-color:#d9ffd1;""> <h3>Você</h3><p>${sugestao}<span>${likes}❤️</span><button onclick=ExcluirComentario(this)>Excluir Comentario</button></div>`)
           }
         }
 
       }
       catch (erro) {
         console.error('Ocorreu um erro no fetch comentarios:', erro);
       }
 
       
 
     }
     
   
//FUNÇÃO DE CARREGAR COMENTARIOS

function CarregaComentarioGeral(){
  CarregaComentario()
  MeusComentarios()
}

//FUNÇÃO DE ADICIONAR COMENTARIOS
function EnviarComentario() {
  

  let user = localStorage.getItem('user')
  let novoComentario;
  let camposugestão = document.getElementById('sugestao')
  if (camposugestão.value.trim() === ''){
    alert('Preencha o campo de sugestão')
    return
  }

  if (!user){
    alert('Por favor, cadastre para comentar')
    return;
  }
 let usuarioID = obterUsuarioPorNome(user)
  async function obterUsuarioPorNome(user) {
    try {
      let resposta = await fetch('/usuarios');
      if (!resposta.ok) {
        throw new Error('Erro ao obter usuários');
      }
      let usuarios = await resposta.json();
      if (user >= usuarios.length){
        alert('Usuário não encontrado, por favor, faça login novamente')
    return;
      }
      let userLogin = usuarios.find(usuario => usuario.id == user);
      let idlogin = userLogin.id
      
      
      const conteudoComentario = camposugestão.value
      try {
        const respostaUsuario = await fetch(`/usuarios/${idlogin}`);
        if (!respostaUsuario.ok) {
          throw new Error('Erro ao obter informações do usuário');
        }
        const usuario = await respostaUsuario.json();
        user = parseInt(user)
        const comentario = {
          userId: user,
          usuario: usuario.nome,
          conteudo: conteudoComentario,
          likes: 0,
          likesdados: []
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
 
  CarregaComentarioGeral()
}}
 
  
  


//FUNÇÃO DE REMOVER COMENTARIOS
async function ExcluirComentario(button) {

  let confirmacao = confirm("Deseja excluir esse comentário?")

  try{
    let fetchComents = await fetch('/comentarios')
    if (!fetchComents.ok) {
      throw new Error('Erro ao obter informações do usuário');
    }
    let resposta = await fetchComents.json();

    var parentDiv1 = button.parentElement;
    var parentDiv2 = parentDiv1.parentElement;
    var DivId = parentDiv2.id



    let comentarioDelete = resposta.find(resposta => resposta.userId == DivId)
    let iddelete = comentarioDelete.id


    

    try{
      let deletar = await fetch(`/comentarios/${iddelete}`,{ method: 'DELETE'})
      if (!deletar.ok){
        throw new error('Erro ao deletar comentário')
      }

      console.log('Comentário deletado com SUCESSO')
      CarregaComentarioGeral()
    }
    catch(erro){
      console.error("Erro no fetch delete", erro)
    }
  }
  catch(erro){
    console.error("Erro no fetch comentarios", erro)
  }


}
//FUNÇÃO DE REMOVER COMENTARIOS


//FUNÇÃO DE DAR LIKE
async function DarLike(span) {
 
  let Parent1 = span.parentElement
  let Parent2 = Parent1.parentElement
  let iddocomentario = Parent2.id
  let usuariologado = localStorage.getItem('user')
  if (!usuariologado){
    alert('Por favor, cadastre para dar like')
    return;
  }
    try {
      let resposta = await fetch('/comentarios');
      if (!resposta.ok) {
        throw new Error('Erro ao obter comentarios');
      }
      
      let jsoncomentarios = await resposta.json()
      

      let DonoDoComentario = jsoncomentarios.find(jsoncomentarios => jsoncomentarios.userId == iddocomentario)

      let idDoDono = DonoDoComentario.id

      let user = localStorage.getItem('user')

      let resposta2 = await fetch('/usuarios')
      if (!resposta2.ok){
        throw new Error('Erro ao obter usuários');
      }
      let dadosUsuarios = await resposta2.json()
      console.log('length',dadosUsuarios.length)
      if (usuariologado >= dadosUsuarios.length){
        alert('Usuário não encontrado, por favor, faça login novamente')
    return;
      }
      
      let UsuarioADarLike = dadosUsuarios.find(dadosUsuarios => dadosUsuarios.id == usuariologado)
      console.log('usuario a dar like = ')

      let idDoUsuarioLike = UsuarioADarLike.id
      
      
      
      let adicionarlikenodono = DonoDoComentario.likesdados
      let likenodonojson = JSON.stringify(adicionarlikenodono)
      let likeversaoarray = JSON.parse(likenodonojson)
      likeversaoarray.push({idLike: idDoUsuarioLike})



      let darlike = {
        likesdados:likeversaoarray
      }

      let newlikes = DonoDoComentario.likes + 1

      let morelikes = {
        likes: newlikes
      }

      //SE JA DEU LIKE
      let acharsedeulike = DonoDoComentario.likesdados.find(likesdados => likesdados.idLike == user)
      if (acharsedeulike){

        let remocaodolike = DonoDoComentario.likesdados.filter(likesdados => likesdados.idLike !== acharsedeulike.idLike)

        

        let tiralike = {
          likesdados:remocaodolike
        }

        newlikes = DonoDoComentario.likes - 1

        let menoslike = {
          likes: newlikes
        }

        const diminuirlike = await fetch(`/comentarios/${idDoDono}`,{
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(menoslike)
        });

        const removerlike = await fetch(`/comentarios/${idDoDono}`,{
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tiralike)
        });
        CarregaComentarioGeral()
        return
      }
            //SE JA DEU LIKE

      
        const aumentarlike = await fetch(`/comentarios/${idDoDono}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(morelikes)
        });

        if (!aumentarlike.ok) {
          throw new Error('Erro ao postar comentário');
        }
    
        const likesaumentandos = await aumentarlike.json();
        console.log('Like Aumentado:', likesaumentandos);

        const respostaComentario = await fetch(`/comentarios/${idDoDono}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(darlike)
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

  CarregaComentarioGeral()

  }
 