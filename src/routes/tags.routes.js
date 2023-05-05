const { Router } = require('express');
const usersRoutes = Router();

const UserController = require('../controllers/usersControllers');
const userController = new UserController();

// xisSalada é um Middleware
function xisSalada(request, response, next) {
  if (request.body.maionese) {
    return response.json({ mensagem: 'Você não é bem vindo por aqui' });
  }

  next();
}

usersRoutes.post('/', xisSalada, userController.Create);
usersRoutes.put('/:id', xisSalada, userController.Update);
// OR
// usersRoutes.use(xisSalada)

module.exports = usersRoutes;
