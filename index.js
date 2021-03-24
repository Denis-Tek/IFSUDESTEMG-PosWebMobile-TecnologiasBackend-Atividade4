const express    = require('express');
const bodyparser = require('body-parser');
const path       = require('path');
const app        = express();

const contatos   = require('./contatos.js');

const port = 3000;

// ROTAS REDIRECIONADAS PERMANENTEMENTE
app.get('/', (req, res) => {
  res.writeHead(301, {'Location': '/public/index.html'});
  res.end();
});

app.get('/favicon.ico', (req, res) => {
  res.writeHead(301, {'Location': '/public/favicon.ico'});
  res.end();   
}); 

// MIDDLEWARES (PLUGINS)
const middlewareAntes = function (req, res, next) {
  console.log('ANTES');
  next();
}

const middlewareRegistraRequisicao = function (req, res, next) {
  let inicio  = Date.now();
  let dhInicio = new Date(inicio);
  //req.request_time = dInicio;
  console.log(dhInicio.toUTCString() + ' => ' + req.method + ': ' + decodeURI(req.path));
  //console.log(req.headers);
  console.log('  Executando o middleware 1 - antes next.');
  next();
  console.log('  Executando o middleware 1 - após next.');
  console.log('Tempo de processamento da rota: ' + (Date.now() - inicio) + ' milissegundo(s)\n');        
}

const middleware2 = function (req, res, next) {
  console.log('    Executando o middleware 2 - antes next.');
  next();
  console.log('    Executando o middleware 2 - após next.');    
}

const middlewareDepois = function (req, res, next) {
  next();
  console.log('DEPOIS');
}

const middlewareNotFound = function (req, res, next) {
  res.status(404).send("Não tente invadir o meu site. Esta rota não existe! Seu IP foi registrado.");
  res.end();
  console.log(`      Um mané com IP ${req.ip} tentou acessar rota inexistente ${req.method}: ${decodeURI(req.path)}`);
} 

// REGISTRO DOS MIDDLEWARES
app.use(middlewareAntes);
app.use(middlewareRegistraRequisicao);
app.use(middleware2);
app.use('/public', express.static(__dirname + '/public')); 
app.use(middlewareDepois);
app.use(bodyparser.urlencoded({extended: false}));
app.use(contatos);
app.use(middlewareNotFound);

// REGISTRO DE ENGINE DE TEMPLATE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));


// ATIVANDO O SERVIDOR
app.listen(port, ()=> {
   console.log(`Servidor atendendo na porta ${port}`);
} );