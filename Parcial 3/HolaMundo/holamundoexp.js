const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Adios mundo....')
})

app.listen(port, () => {
  console.log(`Hola Mundo!!!! desde el port` + port)
})