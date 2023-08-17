npm init -y (cria um pacote padrao json)

express é o mais utilizado pra requisiçoes em node
npm install express --save (instala o express) adiciona a biblioteca express

apos essas fases apareceu pasta node_modules (express rpecisa de outras bibliootecas pra funcionar), se eu apagar a pasta eu posso colocar npm install, que gera ela d novo.. Eu nao preciso da pasta no github.

pra executar--
node src/server.js e pra parar de executar ctrl c
outra mandeira de executar é colocar no package json(script-"start": "node ./src/server.js")e apertar npm start


http://localhost:3333/users?page=5&limit=10 para acessar query params


// npm instal nodemon --save-dev   (pra atualizar automaticamente nodemon) só utilizo quando estiver desenvolvendo nodemon

pra iniciar vc usa npm run dev


*navegador só da pra testar get, por isso eu instalo insomnia




----------------------------
//importar express
const express = require("express");
//pra inicializar express
const app = express();
app.use(express.json());
//consigo extrair e responder, esse é rota tbm(response devolve resposta)
//request obtem informaçoes do q esta sendo enviadas para API(no caso a rota)
//id é um parametro, posso usar quantos parametros quiser (/:id/:user)
//Parametros são utilizados dados simples
//message é a roda, poderia ser product,route params é obrigatorio ter
/*  app.get("/message/:id/:user", (request, response) => {
  const { id, user } = request.params;

  response.send(`Id da mensagem: ${id}.
  Para o usuario: ${user}`)
})*/

//query params nao precisa obrigatoriamente colocar paramtros id, users
/*  app.get("/users", (request, response) => {
  const { page, limit } = request.query;

  response.send (`Página: ${page}. Mostrar: ${limit}`)
});*/

//post usa quando quer cadastrar algo
app.post("/users", (request, response) => {
  const { name, email, password} = request.body;
  //posso trocar send por json({ name, email, password});
  response.send(`Usuario: ${name} - Email : ${email} -senha: ${password}`);
})
//qual porta que vai a requisição(endereço)
const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

-----------------------------------------------


para instalar biblioteca de erros npm install express-async-errors --save
                                  

-------------------------------------------
npm install sqlite3 sqlite --save
//AUTOINCREMENT pra gerar novo usuario automatico, NULL pra deixar nulo a primeiro momento DEFAULT CURRENT_TIMESTAMP pra colocar automatico a data
SQL = banco de dado relacional

CREATE - criar
DROP - deletar tabela
ALTER - atualizar tabela

ALTER TABLE users
RENAME TO clients
// add tabela status
ALTER TABLE users
ADD status VARCHAR

ALTER TABLE users
RENAME COLUMN status TO active
// apagar coluna
ALTER TABLE users
DROP COLUMN status

//qualquer aplicação usa esses itens  
C - create - INSERT
R - read - SELECT
U - Update - UPDATE
D - Delete - DELETE

//insere  itens
INSERT INTO users
(name, email, password)
VALUES
('Sergio', 'spn1994@gmail.com', '123')

//seleciona itens
SELECT * from users

INSERT INTO users
(name, email, password)
VALUES
('Sergio', 'spn1994@gmail.com', '123');

//seleciona tabela
// se colocar id, name, email no lugar * mostra só esses
SELECT * from users;
//aatualiza toda tabela 'sergio.png' 
UPDATE users SET 
avatar = NULL
//atualização especifica
UPDATE users SET 
avatar = 'sergio.png',
name = 'Sergio P'
WHERE id = 1
// deleta usuario
DELETE FROM users 
WHERE id = 3


-------------------
const AppError = require("../utils/appError")
//Parte inteligente da aplicação
class UsersController {
  create(request, response) {
    const { name, email, password } = request.body;
    //posso trocar send por json({ name, email, password});status serve pra indicar o que http fez
    if(!name){
      throw new AppError("Nome é obrigatorio!");
    }
    response.status(201).json({ name, email, password });
  }
}

---------------------------
//para instalar criptografia
 npm install bcryptjs


 // query builder
 instalação
 npm install knex --save

 -- para configurar knex
 npx knex init ele instala um arquivo de configuração

// pra criar notes, tags oq for preciso eu uso depois make
npx knex migrate:make createNotes
npx knex migrate:make createTags 
//pra rodar a migrations do knex
npx knex migrate:latest
coloquei scrip json knex migrate:latest


//chave estrangeira é gerada em outra tabela pra criar vinculo com tabela



-------------------
//map percore todo array e devolve novo array
//posso finalizar com return tag; com {} retorna objeto
const tags=[
{id: 1, name: "node", note_id:1},
{id: 2, name: "express", note_id:1},
{id: 3, name: "react", note_id:1},
{id: 4, name: "javascript", note_id:2},
{id: 5, name: "frontend", note_id:2},
];

const newArray = tags.map(tag => {
  return {
    name: tag.name
  }
});
console.log(newArray)
------------------------------------------
const newArray = tags.map(tag => {
  return {
    ...tag,
    date: new Date()
  }
});
console.log(newArray)
//pra colocar data
-----------------------
// filter filtra
const tags=[
{id: 1, name: "node", note_id:1},
{id: 2, name: "express", note_id:1},
{id: 3, name: "react", note_id:1},
{id: 4, name: "javascript", note_id:2},
{id: 5, name: "frontend", note_id:2},
];

const newArray = tags.filter(tag => tag.note_id === 1);
console.log(newArray)
--------------------------------------------------

<!-- pra gerar token do usuario -->
npm install jsonwebtoken

CTRl + barra espaço é um atalho insomnia pra achar as funçoes do token enviroment no base(manange enviroment)

<!-- biblioteca para upload -->
npm install  multer


----------------------------------------------------
API Restfull
biblioteca pra conectar front + back
npm install cors
--------------------------------------------
