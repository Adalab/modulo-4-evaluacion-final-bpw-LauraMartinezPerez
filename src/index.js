

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

//config variables entorno
require("dotenv").config(); 

//4. Establecemos el puerto de conexion y Arrancamos el servidor en el puerto 
const serverPort = process.env.PORT;
server.listen(serverPort, ()=>{
    console.log("server is running on http://localhost:" + serverPort);
});

//5. Función para conexión con la DB
async function getDBConnection(){
    const connection = await mysql.createConnection({
        host: "127.0.0.1",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database:  "strongtrack_db"
    })
    connection.connect();
    return connection;
}


//6. ENDPOINTS
server.get("/strongtrack/entrenamientos", async (req, res) => {
   const connection = await getDBConnection();
   const sqlQuery = "SELECT * FROM entrenamientos";
   const [entrenamientosResult] = await connection.query(sqlQuery);
    connection.end();

   res.status(200).json({
    info: {
        count: entrenamientosResult.length
    },
    result: entrenamientosResult
    
   });

})

server.get("/strongtrack/entrenamiento/:id", async (req, res) => {

    const connection = await getDBConnection();
    const {id} = req.params;
    const sqlQuery = "SELECT * FROM entrenamientos WHERE id = ?";
    const [entrenamientoResult] = await connection.query(sqlQuery, [id]);
    connection.end();
console.log(entrenamientoResult);
       if (entrenamientoResult.length === 0) {
        res.status(404).json({
            success: false,
            message: "Entrenamiento not found"
        });
       } else {
            res.status(200).json({
                status: "seccess",
                result: entrenamientoResult
        });
       }
}) 

server.post("/strongtrack/entrenamiento", async (req, res) => {
    const connection = await getDBConnection();
  
    let fecha, grupo_muscular, equipamiento, descripcion, series, repeticiones, tiempo_descanso, fk_usuario;
  
    if (!req.body) {
      res.status(404).json({
        success: false,
        message: "Proveide the params"
      });

    } else {
      ({ fecha, grupo_muscular, equipamiento, descripcion, series, repeticiones, tiempo_descanso, fk_usuario } = req.body);
    }
  
    if (!fecha || !grupo_muscular || !equipamiento || !descripcion || !series || !repeticiones || !tiempo_descanso || !fk_usuario) {
      return res.status(400).json({
        success: false,
        message: "Bad params. Provide all params"
      });
    }
  
    const sqlQuery = "INSERT INTO entrenamientos (fecha, grupo_muscular, equipamiento, descripcion, series, repeticiones, tiempo_descanso, fk_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const [entrenamientoResult] = await connection.query(sqlQuery, [
      fecha,
      grupo_muscular,
      equipamiento,
      descripcion,
      series,
      repeticiones,
      tiempo_descanso,
      fk_usuario
    ]);
    connection.end();
  
    res.status(201).json({
      success: true,
      id: entrenamientoResult.insertId
    });
  });
  

server.put("/strongtrack/entrenamiento/:id", async (req, res) => {

    const connection = await getDBConnection();
    let { id } = req.params;
    let fecha, grupo_muscular, equipamiento, descripcion, series, repeticiones, tiempo_descanso, fk_usuario;

    if (!req.body) {
        res.status(404).json({
          success: false,
          message: "Proveide the params"
        });
  
      } else {
        ({ id } = req.params);
        ({ fecha, grupo_muscular, equipamiento, descripcion, series, repeticiones, tiempo_descanso, fk_usuario } = req.body);
      }

      if (!fecha || !grupo_muscular || !equipamiento || !descripcion || !series || !repeticiones || !tiempo_descanso) {
        return res.status(400).json({
          success: false,
          message: "Bad params. Provide all params"
        });
      }

    const sqlQuery = "UPDATE entrenamientos SET fecha = ?, grupo_muscular = ?, equipamiento = ?, descripcion = ?, series = ?, repeticiones = ?, tiempo_descanso = ? WHERE id = ?";
    const [entrenamientoResult] = await connection.query(sqlQuery, [fecha, grupo_muscular, equipamiento, descripcion, series, repeticiones, tiempo_descanso, id]);
   
    connection.end();
    console.log("ID recibido:", id);
    console.log("Resultado de la actualización:", entrenamientoResult);


    if (entrenamientoResult.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Entrenamiento not found"
        });
      }
    
      res.status(200).json({
        success: true,
        message: "Entrenamiento updated successfully",
        id
      });

})

server.delete("/strongtrack/entrenamiento/:id", async (req, res) => {

    const connection = await getDBConnection();
    const {id} = req.params;
    const sqlQuery = "DELETE FROM entrenamientos WHERE id = ?";
    const [entrenamientoResult] = await connection.query(sqlQuery, [id]);

    connection.end();

    if (entrenamientoResult.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Entrenamiento not found"
        });
      }
    
      res.status(200).json({
        success: true,
        message: "Entrenamiento delete successfully",
        id
      });


})



//Servidor de estaticos
const staticServerPath = "./web"; //carpeta de mis ficheros html, ruta de la raiz del proyecto
server.use(express.static(staticServerPath));

