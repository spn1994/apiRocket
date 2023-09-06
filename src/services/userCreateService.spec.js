//em teste vc sempre trabalha com a expectativa(npm test) pra executar test"it ésua expectativa"
const UserCreateService = require("./userCreateService")
const UserRepositoryInMemory = require("../repositories/userRepositoryInMemory")
const AppError = require("../utils/appError");

describe("userCreateService",() => {
  let userRepositoryInMemory = null;
  let userCreateService = null;
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepository);
  })

  it("user should be create", async () => {
    const user = {
      name: "User test",
      email:"spn1994@hotmail.com",
      password: "123"
    };

    const userCreated = await UserCreateService.execute(user);
  
    expect(userCreated).toHaveProperty("id");
  });

  it("usuario não criado por email ja em uso", async () => {
    const user1 = {
      name: "User test1",
      email: "user@test.com",
      password: "123"
    };

    const user2 = {
      name: "User test2",
      email: "user@test.com",
      password: "456"
    };

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este email já está em uso."))
  });
});
