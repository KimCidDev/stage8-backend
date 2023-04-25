const appError = require('../utils/appError');

const sqliteConnection = require('../database/sqlite');

const { hash } = require('bcryptjs');

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
    const { name, email } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const userWithUpdatedEmail = await database.get(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id)


      return response
        .status(201)
        .json({ name: name, email: email, password: hashedPassword });
  }
}

module.exports = UsersController;
