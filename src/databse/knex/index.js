// requisição do knex
const config = require("../../../knexfile");
//requisição do nex configurado
const knex = require("knex");
//conexao do knex do servidor
const connection = knex(config.development);
//exportação do conteudo
module.exports = connection;