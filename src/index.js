

//1. Importar los módulos de NPM que necesito

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise"); //modulo promesas de mysql2
const path = require("path"); //modulo propio de express
const jwt = require('jsonwebtoken');//para usar JWT-autenticacion de usuarios     
const bcrypt = require("bcrypt");//modulo bcrypt para encriptar contraseñas
const { clear } = require("console");

//2. Crear el servidor web
const server = express();

//3. Configurar el servidor (permitir que el servidor ecepte peticiones)
server.use(cors());
server.use(express.json({limit: "25mb"})); //para limitar el tamaño
server.set("view engine, ejs"); //para usar EJS

require("dotenv").config(); 

//4. Establecemos el puerto de conexion y Arrancamos el servidor en el puerto 
const serverPort = 4001;
server.listen(serverPort, ()=>{
    console.log("server is running on http://localhost:" + serverPort);
});

//Servidor de estaticos
const staticServerPath = "./web"; //carpeta de mis ficheros html, ruta de la raiz del proyecto
server.use(express.static(staticServerPath));

