CREATE DATABASE eventos_db;
USE eventos_db;
CREATE TABLE eventos(
id int auto_increment primary key,
    nombre varchar (255) not null,
    descripcion text,
    fecha date not null,
    lugar varchar(255)
);

CREATE TABLE reservas(
    id int auto_increment primary key,
    evento_id int,
    ususario_id int,
    fecha_reserva date,
    foreign key (evento_id) references eventos (id)
);
