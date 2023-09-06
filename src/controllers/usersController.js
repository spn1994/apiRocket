//importar criptografia e compare pra comparar criptografia da senha velha e nova
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/appError");

const userRepository = require("../repositories/userRepository");
const sqliteConnection = require("../databse/sqlite");
const userCreateService = require("../services/userCreateService")

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;
const UserRepository = new userRepository();
const UserCreateService = new userCreateService(UserRepository);

await UserCreateService.execute({ name, email, password });
    
    return response.status(201).json();
  }
  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    /*const { id } = request.params; era antes quando n tinha autenticação*/
    const user_id = request.user.id;
    
    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if (!user) {
        throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email já está em uso");
    }
    //se tiver conteudo em name, vai ser usado se nao o outro
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if ( password && !old_password){
      throw new AppError("Voce precisa informar a senha antiga para definir a nova senha");
    }
    //insere nova senha
    if ( password && old_password){
      const checkOldPassword = await compare(old_password, user.password)
      if (!checkOldPassword){
        throw new AppError("A senha antiga não confere.");
      }

        user.password = await hash(password, 8);
    }


    await database.run(`
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`,
        [user.name, user.email, user.password, user_id]
        );

    return response.json();
}
}



module.exports = UsersController;

/* 
máximo 5 métodos
pode ter função de 
index - GET para listar vários registros
show - GET para exibir registro especifico
create - POST pra criar registro
update - PUT para atualizar registro
delete - DELETE para remover registro

*/