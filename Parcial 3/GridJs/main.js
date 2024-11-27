const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); 

let data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];


app.get('/api/data', (req, res) => {
  res.json(data);
});


app.post('/api/data', (req, res) => {
  const { id, name, email } = req.body;
  if (id && name && email) {
    data.push({ id, name, email });
    res.status(201).json({ message: 'Datos agregados' });
  } else {
    res.status(400).json({ message: 'Formato Incorrecto' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Corre en ${PORT}`);
});
