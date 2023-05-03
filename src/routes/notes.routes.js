const { Router } = require('express');
const notesRoutes = Router();

const NotesController = require('../controllers/notesControllers');
const notesController = new UserController();

// xisSalada é um Middleware
function xisSalada(request, response, next) {
  if (request.body.maionese) {
    return response.json({ mensagem: 'Você não é bem vindo por aqui' });
  }

  next();
}

usersRoutes.post('/:user_id', xisSalada, notesController.Create);
// OR
// usersRoutes.use(xisSalada)

module.exports = notesRoutes;
