
const{
    selectEventos,
    selectEvento,
    updateEvento,
    insertarEvento,
    deleteEvento
}=require('../dal/local.js')


exports.getEvento = async(req,res) =>{
   
    const {id}= req.params;
    try{
       
        const evento = await selectEvento(id);
        if(!evento){
            return res.status(404).json('El evento no existe');
        }
        res.status(200).json(evento);
    }
    catch(error){
        res.status(500).json(error.message);
    }
    
}

exports.getEventos = async(req,res)=>{
    res.status(200).json( await selectEventos());
}

exports.editEvento = async(req,res) => {
    const {id} = req.params; 
    const {nombre, descripcion, fecha, lugar} = req.body;

    const filasAfectadas= await updateEvento(id,nombre,descripcion, fecha, lugar);
    res.status(200).json('Se modificaron: ' + filasAfectadas)
}

exports.createEvento = async(req,res)=>{
    const {nombre, descripcion, fecha, lugar} = req.body;

    if(!nombre){
        res.status(400).json('El nombre no es valido')
        return;
    }
    if(!descripcion){
        res.status(400).json('La descripcion no es valida');
        return;
    }
    if(!lugar){
        res.status(400).json('El lugar no es valido');
    }
    if(!fecha){
        fecha = new Date();
    }

    const id = await insertarEvento(nombre,descripcion, fecha, lugar);
    res.status(200).json('Se creo el evento ' + nombre + ' con el id: '+ id);
    
}

exports.deleteEvento = async(req,res) =>{
    try{
    const { id } = req.params;

    const filasAfectadas = await deleteEvento(id);

    if(filasAfectadas == 1){
        res.status(200).json('Se elimino el evento ' + id);
    }
    else{
        res.status(404).json('No se afecto nada jasjajasjajs')
    }
    }
    catch(error){
        res.status(400).json(error);
    }
}
