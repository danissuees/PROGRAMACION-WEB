const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

console.log(__dirname);
console.log(__filename);

app.use(express.json());
app.use(express.text());

app.get('/administracion', (req, res) => {
  console.log(req.body);
  res.render('admin');
});

app.get('/maestros', (req, res) => {
  const mensaje = req.body.mensaje || 'Servidor contesta a la petición';
  console.log(req.body);
  res.send(mensaje);
});

app.get('/estudiantes/:carrera', (req, res) => {
  const mensaje = req.body.mensaje || `Servidor contesta a la petición para ${req.params.carrera}`;
  console.log(req.params.carrera);
  console.log(req.query.control);
  res.send(mensaje);
});

const port = 6000;

app.listen(port, () => {
  console.log('Hola Mundo desde el Port ' + port);
});
