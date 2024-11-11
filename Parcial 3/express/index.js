const express = require ('express')
const app = express()
app.use(express.json());


app.get('/admin', (req,res) =>{
    console.log(req.body)
    res.send('Servidor contesta a la peticion')
})
app.get('/maestros', (req,res) =>{
    console.log(req.body)
    res.send('Servidor contesta a la peticion')
})
app.get('/estudiantes/:carrera', (req, params) =>{
    console.log(req.params.carrera)
    console.log(req.query.control)
    res.send('Servidor contesta a la peticion')
})
app.listen(3000,()=>{
    console.log('port: ' + 3000)
})


