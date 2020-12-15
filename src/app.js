const express = require('express');
const morgan = require('morgan');
const app = express();
const myConnection = require('express-myconnection');
const mysql = require('mysql');
//modulo path paara unir directorios
const path = require('path');
//

//importando rutas
const customerRoutes = require('./routes/customer');

/*
al desplegar el proyecto en un verdadero servidor este preguntara que puertos estan 
disponbles y lo desplegara en el primero
sin embargo si no hay puertos disponibles lo hara en el puerto 3000 
*/
app.set('port', process.env.PORT || 3000)
//plantillas ejs (basicamnte es como jsp)
app.set('view engine','ejs');
//ajustamos la direccion para los views
app.set('views', path.join(__dirname, 'views'));

//los middlewares son funciones que se ejcutan antes de las peticiones (rutas del servidor)
//morgan 
app.use(morgan('dev'));

//para acceder a la base de datos
app.use(myConnection(mysql, {
    host : 'bxuibvexkihe4q7eswk5-mysql.services.clever-cloud.com',
    user: 'utz2jlaobo8vvfvb',
    password: 'XwumVajBigFxmS8FjOpa',
    port: 3306,
    database: 'bxuibvexkihe4q7eswk5'
}, 'single'));

app.use(express.urlencoded({extended: false})); //envia campos del formulario

//rutas
app.use('/', customerRoutes);

//archivos estaticos
/*
basicamente en esta parte meteremos imagenes o css
*/
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('servidor corriendo en el puerto 3000');
});
//nodemon sirve para que se guarden y ejecuten los cambios hechos en el programa sin necesidad 
//de tirar el servidor
