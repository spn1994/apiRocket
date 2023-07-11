//pra importar de qualquer sistema operacional
const path = require("path");
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "databse", "database.db")
    },
    //comanda abaixo é pra habilitar funcionalidade de quando deletar nota ele deleta em cascata
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },  
   
    migrations:{
      directory: path.resolve(__dirname, "src","databse", "knex", "migrations")
    },
    //propiedade padrao pra trabalhar com sqlite
    useNullAsDefault: true
  },  
};
