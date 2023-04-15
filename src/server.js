const express = require('express')
const routes = require('./routes')

const app = express()
app.use(express.json())
app.use(routes)

const PORT = 3333

app.listen(PORT, () => {
  console.log(`server is now running. Port: ${PORT}`)
})

/*
ROUTE PARAMS EXAMPLE

app.get('/sabores/:id', (request, response) => {
  response.send(
    `Você acessou os sabores de Xis do Porto. Xis escolhido pelo usuário: ${request.params.id}`
  )
})

QUERY PARAMS EXAMPLE

app.get('/retirar', (request, response) => {
  const { vegetable, sauce } = request.query

  response.send(
    `O usuário solicita a retirada dos seguintes   ingredientes.
    
    Vegetal a ser retirado: ${vegetable}
    Molho a ser retirado: ${sauce}`
  )
})

const PORT = 3333

app.listen(PORT, () => {
  console.log(`server is now running. Port: ${PORT}`)
})
*/
