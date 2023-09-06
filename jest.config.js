// bail se teste falhar ele para de executar
//coverage 
module.exports = {
  bail: true,
  coverageProvider: "v8",
// root faz com q n le modules
  testMatch: [
    "<rootDir/src/>**/"
  ],
}