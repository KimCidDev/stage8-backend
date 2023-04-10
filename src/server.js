const express = require('express')
const app = express()
app.get('/sabores/:id', (request, response) => {
  response.send(
    `Você acessou os sabores de Xis do Porto. Xis escolhido pelo usuário: ${request.params.id}`
  )
})
const PORT = 3333

app.listen(PORT, () => {
  console.log(`server is now running. Port: ${PORT}`)
})
