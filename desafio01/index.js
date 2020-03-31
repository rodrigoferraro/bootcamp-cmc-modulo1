const express = require('express');

const server = express();
server.use(express.json());

const projects = [{id:"1", title: "Novo projeto", tasks:["Nova tarefa"]}];
// const projects = [];
/*

Middlewares

    => Crie um middleware que será utilizado em todas rotas que recebem o ID do projeto nos parâmetros da URL
     que verifica se o projeto com aquele ID existe. Se não existir retorne um erro, caso contrário permita a
      requisição continuar normalmente;

    Crie um middleware global chamado em todas requisições que imprime (console.log) uma contagem de quantas 
    requisições foram feitas na aplicação até então;
*/

let contador = 0;
function contaAcessos(req, res, next) {
    console.log(`req: ${contador++}`);
    next();
}

server.use(contaAcessos);

function checkId(req, res, next){
    const { id } = req.params;

    if (!projects[id]) {
        console.log("erro: Insira id");
        return res.status(400).json({"mensagem":"Erro: indice" +id+"não encontrado."});
    }

    next();
}

server.post('/projects', (req, res) => {
  const {id, title} = req.body;
  const newProject = {id: id, title:title, tasks:[]};
  projects.push(newProject);
  return res.json(projects);
});

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.put('/projects/:id',checkId, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects[id].title = title;

    return res.json(projects);
});

server.delete('/projects/:id', checkId, (req, res) => {
    const { id } = req.params;
    projects.splice(id,1);
    return res.json(projects);
});

server.post('/projects/:id/tasks', checkId, (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    projects[id].tasks.push(task);
   
    return res.json(projects[id]);
});

server.listen(3000);
