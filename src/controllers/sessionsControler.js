const knex = require("../databse/knex");
const AppError = require("../utils/appError");
const { compare } = require("bcryptjs");
const authConfig = require("../configs/auth");
/* esse sign esta dentro do pacote jsonwebtoken */
const { sign } = require("jsonwebtoken");
/* autenticação da aplicação da aplicação */
class SessionsController {
  async create(request, response){
    const { email, password } = request.body;

    const user = await knex("users").where({email}).first();
    if(!user) {
      throw new AppError("E-mail e/ ou senha incorreta", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new AppError("E-mail e/ ou senha incorreta", 401)
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({ user, token })
  }
}

module.exports = SessionsController;