const { Router } = require('express')
const usersRoutes = Router()

const UserController = require('../controllers/usersControllers')
const userController = new UserController()

function xisSalada(request, response, next) {
  if (request.body.maionese) {
    return response.json({ mensagem: 'Você não é bem vindo por aqui' })
  }

  next()
}

usersRoutes.post('/', xisSalada, userController.create)

module.exports = usersRoutes
