



//VARIAVEIS PRA ABRIR ABA E FECHAR ABA
var aba1 = document.getElementById('aba1js')
var aba2 = document.getElementById('aba2js')
var aba3 = document.getElementById('aba3js')
var aba4 = document.getElementById('aba4js')
var aba5 = document.getElementById('aba5js')





var aba1content = document.getElementById('contentRegras')
var aba2content = document.getElementById('contentDefinicoes')
var aba3content = document.getElementById('contentTecnicas')
var aba4content = document.getElementById('contentEstrategias')
var aba5content = document.getElementById('contentDicas')





var aba1nav = document.getElementById('regras1')
var aba2nav = document.getElementById('regras2')
var aba3nav = document.getElementById('regras3')
var aba4nav = document.getElementById('regras4')
var aba5nav = document.getElementById('regras5')
//VARIAVEIS PRA ABRIR ABA E FECHAR ABA



//ABRIR ABA REGRAS | FECHAR OUTRAS
aba1.addEventListener('click', function abaRegras(){
  aba1content.className = 'mx-5'
  aba1nav.className = 'py-4 m-4 d-flex justify-content-center border border-3 rounded-pill'

  aba2content.className = 'mx-5 d-none'
  aba2nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba3content.className = 'mx-5 d-none'
  aba3nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba4content.className = 'mx-5 d-none'
  aba4nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba5content.className = 'mx-5 d-none'
  aba5nav.className = 'py-4 m-4 d-flex justify-content-center'
})

//ABRIR ABA DEFINIÇÕES | FECHAR OUTRAS
aba2.addEventListener('click', function abaDefinicoes(){
  aba2content.className = 'mx-5'
  aba2nav.className = 'py-4 m-4 d-flex justify-content-center border border-3 rounded-pill'

  aba1content.className = 'mx-5 d-none'
  aba1nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba3content.className = 'mx-5 d-none'
  aba3nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba4content.className = 'mx-5 d-none'
  aba4nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba5content.className = 'mx-5 d-none'
  aba5nav.className = 'py-4 m-4 d-flex justify-content-center'
})

//ABRIR ABA TÉCNICAS | FECHAR OUTRAS
aba3.addEventListener('click', function abaTecnicas(){
  aba3content.className = 'mx-5'
  aba3nav.className = 'py-4 m-4 d-flex justify-content-center border border-3 rounded-pill'

  aba1content.className = 'mx-5 d-none'
  aba1nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba2content.className = 'mx-5 d-none'
  aba2nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba4content.className = 'mx-5 d-none'
  aba4nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba5content.className = 'mx-5 d-none'
  aba5nav.className = 'py-4 m-4 d-flex justify-content-center'
})

//ABRIR ABA ESTRATÉGIAS | FECHAR OUTRAS
aba4.addEventListener('click', function abaEstrategias(){
  aba4content.className = 'mx-5'
  aba4nav.className = 'py-4 m-4 d-flex justify-content-center border border-3 rounded-pill'

  aba1content.className = 'mx-5 d-none'
  aba1nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba2content.className = 'mx-5 d-none'
  aba2nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba3content.className = 'mx-5 d-none'
  aba3nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba5content.className = 'mx-5 d-none'
  aba5nav.className = 'py-4 m-4 d-flex justify-content-center'
})

//ABRIR ABA DICAS | FECHAR OUTRAS
aba5.addEventListener('click', function abaDicas(){
  aba5content.className = 'mx-5'
  aba5nav.className = 'py-4 m-4 d-flex justify-content-center border border-3 rounded-pill'

  aba1content.className = 'mx-5 d-none'
  aba1nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba2content.className = 'mx-5 d-none'
  aba2nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba3content.className = 'mx-5 d-none'
  aba3nav.className = 'py-4 m-4 d-flex justify-content-center'

  aba4content.className = 'mx-5 d-none'
  aba4nav.className = 'py-4 m-4 d-flex justify-content-center'
})

//cadastro e login
function cadastro(){
  window.location.href = '/cadastro/cadastro.html';
}
function login(){
  window.location.href = '/login/login.html';
}