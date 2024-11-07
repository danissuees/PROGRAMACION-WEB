const db = require('../config/local');

exports.selectEventos= () => {
    
    return db.eventos;
};
exports.selectEvento = (id)=>{
    const evento = db.eventos.find(evento=>evento.id == id);
    return evento;
}
exports.insertarEvento = (nombre,descripcion, fecha, lugar) =>{
    const id= db.eventos[db.eventos.length - 1 ].id+1;
    db.eventos.push({
        id,
        nombre,
        descripcion,
        fecha,
        lugar
    })
    return id;
}
exports.updateEvento =(id,nombre, descripcion, fecha, lugar) =>{
    const evento = db.eventos.find(evento=>evento.id ==id)
    evento.nombre = nombre;
    evento.descripcion = descripcion;
    evento.fecha = fecha;
    evento.lugar = lugar;
    return id;
}

exports.deleteEvento = (id)=>{
    const index = db.eventos.findIndex(evento=>evento.id==id);
if(index!==-1){
    db.eventos.splice(index,1)
}
    return id;
}