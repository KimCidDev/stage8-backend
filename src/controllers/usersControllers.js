const appError = require('../utils/appError');

class UsersController {
  create(request, response) {
    const { name, email, password, ingredienteFav, maionese } = request.body;

    if (!name) {
      throw new appError('o nome é obrigatório');
    }

    response
      .status(201)
      .json({ name, email, password, ingredienteFav, maionese });
  }
}

module.exports = UsersController;
