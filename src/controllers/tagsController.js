const knex = require("../databse/knex");

class TagsController {
  async index(request,response) {
    const user_id = request.user.id;
    

    const tags = await knex("tags")
    //quando se tem nome igual, nao precisa por assim user_id: user_id 
    .where({ user_id })
    // função q faz trazer só as coisas com nome
    .groupBy("name")

    return response.json(tags);
  }

}

module.exports = TagsController;