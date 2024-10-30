drop table agencia_cliente;
CREATE TABLE agencia_cliente(
empresa varchar(2) ,
id_agencia integer NOT NULL DEFAULT autoincrement,
tipo_agencia char(1),
codcli char(8),
nomcli varchar(30),
dir_agencia varchar (300),
idruta varchar (8),
PRIMARY KEY (empresa, id_agencia)
)

drop table pedido_ruta;
CREATE TABLE pedido_ruta(
empresa varchar(2) ,
id_pedido_ruta integer NOT NULL DEFAULT autoincrement,
numtra_pedido char(8),
fectra date,
hora time,
idruta varchar(8),
id_agencia double,
fecha_entrega date,
hora_entrega time,
status_entrega varchar (50),
PRIMARY KEY (empresa, id_pedido_ruta)
)

alter table pedido_ruta add fecha_entrega_efectiva date;
alter table pedido_ruta add observacion_entrega varchar (200);
alter table pedido_ruta add hora_entrega_efectiva time;


CREATE TABLE imagen_despacho(
codemp varchar(2) ,
id_pedido_ruta char(4),
imagen1 varchar(500),
imagen2 varchar(500),
imagen3 varchar(500),
imagen4 varchar(500),
imagen5 varchar(500)
)

