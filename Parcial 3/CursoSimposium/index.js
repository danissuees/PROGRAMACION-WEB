const express = require('express');
const dotenv = require ('dotenv');
const eventRoutes = require ('./routes/eventRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/eventos', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.info('Hola mundo :3');
    console.info('Servidor corriendo en el puerto '+ PORT);
});