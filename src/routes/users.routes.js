const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/usersController");
const UserAvatarController = require("../controllers/userAvatarController");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

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
const userAvatarController = new UserAvatarController();
//post usa quando quer cadastrar algo

//usersRoutes.use(myMiddleware); coloca middleware em todas rotas
//usersRoutes.post("/",myMiddleware, usersController.create);
usersRoutes.post("/", usersController.create);
/* antes do midleware tinha id do usuario/:id */
usersRoutes.put("/", ensureAuthenticated, usersController.update);
//patch pra atualizar campo especifico
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)
//exportando pra quem quiser usar.
module.exports = usersRoutes;