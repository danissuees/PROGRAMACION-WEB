const express = require('express');
const app = express();
app.use(express.json());

const datosGuardados = {
    admin: [],
    maestros: [],
    estudiantes: {}
};

app.get('/admin', (req, res) => {
    const mensaje = req.body.mensaje || 'Servidor contesta a la petición';
    console.log(req.body);
    res.send(mensaje);
});

app.get('/maestros', (req, res) => {
    const mensaje = req.body.mensaje || 'Servidor contesta a la petición';
    console.log(req.body);
    res.send(mensaje);
});

app.get('/estudiantes/:carrera', (req, res) => {
    const carrera = req.params.carrera;
    const mensaje = req.body.mensaje;
    
    if (mensaje) {
        if (!datosGuardados.estudiantes[carrera]) {
            datosGuardados.estudiantes[carrera] = [];
        }
        datosGuardados.estudiantes[carrera].push(mensaje);
    }
    
    console.log(`Mensajes de estudiantes en ${carrera}:`, datosGuardados.estudiantes[carrera]);
    console.log(datosGuardados);
    res.send(`Último mensaje para la carrera ${carrera}: ${datosGuardados.estudiantes[carrera][datosGuardados.estudiantes[carrera].length - 1] || 'Sin mensajes'}`);
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
