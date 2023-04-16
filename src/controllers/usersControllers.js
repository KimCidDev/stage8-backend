class UsersController {
  create(request, response) {
    const { name, email, password, ingredienteFav, maionese } = request.body

    response.status(201).json({ name, email, password, ingredienteFav, maionese })
  }
}

module.exports = UsersController  
