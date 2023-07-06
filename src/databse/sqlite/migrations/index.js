const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers");

async function migrationsRun(){
  //esquemas refere a tabela
  const schemas = [
    createUsers
  ].join('');/* esse join é usado como paramentro pra juntar,posso por virgula */
  
  sqliteConnection()
  .then(db => db.exec(schemas))
  .catch(error => console.error(error));
} 

module.exports = migrationsRun;