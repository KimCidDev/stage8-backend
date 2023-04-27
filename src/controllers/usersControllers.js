const appError = require('../utils/appError');

const sqliteConnection = require('../database/sqlite');

const { hash, compare } = require('bcryptjs');

/**
 LER OS MÉTODOS PODE SER COMPLICADO, CONFUSO. MAS TENTA LEMBRAR DOS PASSOS E DAS VARIÁVEVIS NECESSÁRIAS PARA CONTRUIR A LÓGICA. 

POR EXEMPLO, SE O MÉTODO É 'CREATE',  ENTÃO TU VAI PRECISAR DE ALGUMAS INFORMAÇÕES GUARDADAS EM VARIÁVEIS PARA PODER MANIPULAR.

1) OS DADOS DO REQUEST A SEREM INSERIDOS - const { name, email } = request.body;
2) O BANCO DE DADOS, que é uma função importada de outra paste que se ocupa só de liberar o acesso ao banco de dados - const connection = require('folder/file path');
  const database = await conection();
3) E VARIÁVEIS para definir alguns ERROS para o cliente. Por exemplo, ao criar um usuário, tu cria uma
  const CheckIfInDatabase = await database.get(`SELECT * FROM users WHERE email = (?), [email]`)

enfim 
 */

class UsersController {
  async Create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get(
      'select * FROM users WHERE email = (?)',
      [email]
    );

    if (checkUserExists) {
      throw new appError('Este e-mail já está em uso');
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    return response
      .status(201)
      .json({ name: name, email: email, password: hashedPassword });
  }

  async Update(request, response) {
    const { name, email, password, oldPassword } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

    if (!user) {
      throw new appError('Usuário não encontrado.');
    }

    const userWithNewEmail = await database.get(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (userWithNewEmail && userWithNewEmail.id !== user.id) {
      throw new appError('Email já em uso.');
    }

    user.name = name;
    user.email = email;

    if (password && !oldPassword) {
      throw new appError('É necessário informar a senha previamente usada.');
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new appError('Senha antiga não confere.');
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
      [user.name, user.email, user.password, id]
    );

    return response.json({ name: name, email: email, password: user.password });
  }
}

module.exports = UsersController;
