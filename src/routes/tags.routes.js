const { Router } = require('express');
const usersRoutes = Router();

const tagsController = require('../controllers/tagsController');
const TagsController = new tagsController();

// xisSalada é um Middleware
function xisSalada(request, response, next) {
  if (request.body.maionese) {
    return response.json({ mensagem: 'Você não é bem vindo por aqui' });
  }

  next();
}

usersRoutes.get('/:user_id', xisSalada, TagsController.Index);
// OR
// usersRoutes.use(xisSalada)

module.exports = usersRoutes;
