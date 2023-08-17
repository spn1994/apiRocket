const { verify } = require("jsonwebtoken");
const AppError = require("../utils/appError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next){
  /* token usuarioario */
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError("JWT Token não informado", 401)
  }

  const [, token] = authHeader.split(" "); //bearer no insomnia onde coloquei token

  try {
    /* sub é o conteúdo que está armazenado */
   const { sub: user_id } = verify(token, authConfig.jwt.secret);

   request.user = {
    id: Number(user_id)
   }

   return next();
  }catch{
    throw new AppError("JWT Token inválido", 401)
  }
}
module.exports = ensureAuthenticated;