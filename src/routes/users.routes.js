const { router } = require('express')

const userRoutes = router()

userRoutes.post('/users', (request, response) => {
  const { name, email, password } = request.body

  response.json({ name, email, password })
})

module.exports = userRoutes
