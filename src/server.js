require("express-async-errors");
const migrationsRun = require("./databse/sqlite/migrations")
const AppError = require("./utils/appError")
//importar express
const express = require("express");
//pra inicializar express
//por padrao quando não coloca pasta de acesso ele usa index
const routes = require("./routes");

migrationsRun();
const app = express();
app.use(express.json());

app.use(routes);

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
app.use(( error, request, response, next ) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }
  console.error(error);
  return response.status(500).json({
    status:"error",
    message: "Internal server error",
  });
})





//qual porta que vai a requisição(endereço)
const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));