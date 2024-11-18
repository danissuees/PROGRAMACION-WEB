const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors')
const app = express();
const port = 6666;

console.log(__dirname);
console.log(__filename);

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const folder = path.join(__dirname, 'archivos');
const upload = multer({ dest: folder }); 

app.post('/Formulario/', upload.single('archivo'), (req, res) => {
  console.log(req.body);
  res.send('Recibido');
});

app.listen(port, () => {
  console.log('Port'+port);
});