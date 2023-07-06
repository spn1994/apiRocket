const { Router } = require("express");

const UsersController = require("../controllers/usersController");

const usersRoutes = Router();

/*  //segurança, ele verifica a ação proposta
function myMiddleware(request, response, next) {
  console.log("Vc passou pelo mmiddleware")
  //consigo ver o terminal o requestconsole.log no lugar do if
  if (!request.body){
    return response.json({ message: "User nao autorizado" });
  }
  // faz passa pelo resposta middleware e dar continuidade
 next();
}
*/
const usersController = new UsersController();
//post usa quando quer cadastrar algo

//usersRoutes.use(myMiddleware); coloca middleware em todas rotas
//usersRoutes.post("/",myMiddleware, usersController.create);
usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);
//exportando pra quem quiser usar.
module.exports = usersRoutes;