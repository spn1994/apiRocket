const knex = require("../databse/knex");
const AppError = require("../utils/appError")
const DiskStorage = require("../providers/DiskStorage")
class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const user = await knex("users")
    //quando se tem nome igual, nao precisa por assim user_id: user_id 
      .where({ id: user_id }).first();

      if(!user) {
        throw new AppError("Somente usuarios autenticados podem mudar avatar, 401")
      }

      if(user.avatar){
        await diskStorage.deleteFile(user.avatar);
      }

      const filename = await diskStorage.saveFile(avatarFilename);
      user.avatar = filename;

      await knex("users").update(user).where({ id: user_id })

      return response.json(user);

  }
}

module.exports = UserAvatarController;