//esse éo drive q vai conectar base de dados
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
//resolve endereço de onde salva os arquivos de qualquer sistema operacional
const path = require("path");


async function sqliteConnection(){
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  });
  return database
  
}

module.exports = sqliteConnection;

//SGBD eu tenho que usar pra ver o banco de dados(SISTEMA GERENCIADOR DE BANCO DE DADOS)
//https://www.beekeeperstudio.io/get