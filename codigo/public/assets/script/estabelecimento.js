

//FUNÇÃO PARA CADASTRAR ESTABELECIMENTO
async function CadastroEstabelecimento(){

  let nomeestabelecimento = document.getElementById('nome-estabelecimento').value
  let endereco = document.getElementById('endereco').value
  let cep = document.getElementById('cep').value
  let senha = document.getElementById('senha').value
  let email = document.getElementById('email').value
  let cnpj = document.getElementById('cnpj').value
  let contatoproprietario = document.getElementById('contato-proprietario').value
  let descricao = document.getElementById('descricao').value
  let instagram = document.getElementById('instagram').value
  let whatsapp = document.getElementById('whatsapp').value

  if (nomeestabelecimento.trim() === '' || endereco.trim() === '' || cep.trim() === ''|| email.trim() === ''|| cnpj.trim() === ''|| contatoproprietario.trim() === '' || descricao.trim() === '') {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
}

  let novoestabelecimento = {
    nome: nomeestabelecimento,
    endereco: endereco,
    cep: cep,
    senha: senha,
    email: email,
    cnpj: cnpj,
    contato: contatoproprietario,
    descricao: descricao,
    instagram: instagram,
    whatsapp: whatsapp
  }

  try{
    let resposta = await fetch('/estabelecimentos',{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoestabelecimento)})

    if (!resposta.ok){
      console.error('Falha no Post estabelecimento')
    }

    alert('Estabelecimento cadastrado com sucesso')

    window.location = '../estabelecimento/loginestabelecimento.html'

    
    
  }
  catch (erro) {
    console.error('Ocorreu um erro:', erro);
  }
}

//LOGAR NO ESTABELECIMENTO
async function LoginEstabelecimento(){

  let cnpj = document.getElementById('cnpj').value
  let senhaestabelecimento = document.getElementById('senhaestabelecimento').value

  if (cnpj.trim() === '' || senhaestabelecimento.trim() === '') {
    alert('Por favor, preencha todos os campos.');
    return;
}

try{
  let resposta = await fetch('/estabelecimentos')
  if (!resposta.ok){
      console.error('Não foi possivel obter estabelecimentos')
  }
  let estabelecimentodados = await resposta.json()

  let estabelecimentologado = estabelecimentodados.find(estabelecimentodados => estabelecimentodados.cnpj == cnpj)
  if (!estabelecimentologado) {
      alert('Estabelecimento não cadastrado. Por favor, cadastre-se primeiro.');
      return;
  }
  
  let cnpjdoestabelecimento = estabelecimentologado.cnpj
  if (estabelecimentologado.senha === senhaestabelecimento) {
      
      
      const params = new URLSearchParams({
        id: cnpjdoestabelecimento
      })
      
      console.log(params.toString())
      var notification = alertify.notify('LOGADO COM SUCESSO !', 'success', 5, function () { console.log('dismissed'); });
      window.location.href = `../estabelecimento/torneioestabelecimento.html?${params.toString()}`;

  } else {
      alert('Senha incorreta. Por favor, tente novamente.');
  }
}
catch(erro)
{
  console.log(erro)
}


}
