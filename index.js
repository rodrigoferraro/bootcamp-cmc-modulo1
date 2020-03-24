 const express = require('express');
const server = express();
server.use(express.json());

// Query params OK
// Route params Em progresso passo 2
// Request body

const users = [ 'Dunga', 'Atchim', 'Dengoso', 'Mestre', 'Feliz', 'Zangado', 'Soneca']

server.get('/users', (req,res) => {
  return res.json(users);
})

server.get('/users/:index', (req, res)=>{
  const  { index } = req.params;

  return res.json(users[index]);
});

server.post('/users', (req, res) => {
  const { name } = req.body;

  users.push(name);

  console.log(users);
  return res.json(users);

});

server.put('/users/:index', (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  return res.json(users);
});

server.delete("/users/:index", (req,res) => {
    const { index } = req.params;
    if (users[index]){
      users.splice(index, 1);
      return res.json({mensagem: "Usuário removido"});
    } else {
       return res.json({"mensagem": "Usuário não encontrado"})
    }
})

server.listen(3000);


