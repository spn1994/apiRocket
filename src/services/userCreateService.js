const { hash } = require("bcryptjs");
const AppError = require("../utils/appError");
class userCreateService {
  //construtor é da classe, por isso fica fora
  constructor(UserRepository){
    //desse jeito fica disponivel pra todos
    //quem for usar essa classe que fala qual banco ser usado,( sqlite, sql)
    this.UserRepository = UserRepository;
  }


  async execute({ name, email, password }) {         
    const checkUsersExist = await this.UserRepository.findByEmail(email);
    if(checkUsersExist) {
      throw new AppError("Este email já está em uso.");   
    }
    //criptografia senha
    const hashedPassword = await hash(password, 8)
      //insere usuario
    const userCreated = await this.UserRepository.create({ name, email, password: hashedPassword });
    return userCreated;
  }
}
module.exports = userCreateService;