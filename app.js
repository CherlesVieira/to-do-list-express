///////////////////////////////////////////////////////////////////////////
/////// npm run dev  ==> executa o servidor app.js
//// npm init
//// npm install express --save
//// npm install nodemon --save-dev
//// npm install mongoose 
//// npm install ejs --save
//// npm install method-override --save
///////////////////////////////////////////////////////////////////////////

const express = require('express');
const path = require('path');

////import as rotas = arquivos
const checkListRouter = require('./src/routes/checklist');
const taskRouter = require('./src/routes/task');

const rootRouter = require('./src/routes/index');
const methodOverride = require('method-override');

//conectar no database mongoDB
require('./config/database')

const app = express()
//middleware ( verifica se na requisicao veio json e converte)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method', { methods: ['POST', 'GET']}));

//definicao de onde estarão os arquivos staticos ex: bulma  
app.use(express.static(path.join(__dirname, 'public')));

//criacao da engine do EJS
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

//middleware ( log , faz e depois envia para o proximo = NEXT)
// const log = (req, res, next) => {
//   console.log('=========================  LOG DA REQUISIÇÃO  ===========================');
//   console.log(req.body);
//   console.log(`Data: ${Date.now()}`)
//   console.log('=================================  FIM LOG  ==============================');
//   next();
// }
// app.use(log);

////usa as rotas no app
app.use('/', rootRouter)
app.use('/checklists', checkListRouter)
app.use('/checklists', taskRouter.checklistDepedent)
app.use('/tasks', taskRouter.simple)


///// rotas exemplos => nao usada pelo to-do-list
app.get('/', (req, res) => {
  res.send('<h1>Minha lista de tarefas<h1>')
})

app.get('/json', (req, res) => {
  console.log(req.body)
  res.json({ title: "Tarefa X", done: true })
})
////////////////////////////////////////////////////

app.listen(3010, () => {
  console.log('Servidor foi iniciado na porta 3010')
})

