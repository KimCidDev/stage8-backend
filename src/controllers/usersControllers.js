const appError = require('../utils/appError');

const sqliteConnection = require('../database/sqlite');
const AppError = require('../utils/appError');

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get(
      'select * FROM users WHERE email = (?)',
      [email]
    );

    if (checkUserExists) {
      throw new appError('Este e-mail já está em uso');
    }

    return response.status(201).json();
  }
}

module.exports = UsersController;
