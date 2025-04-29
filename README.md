# 🏋🏼‍♀️ API REST de StrongTrack

StrongTrack es una API REST desarrollada con Node.js, Express y MySQL para gestionar entrenamientos personales. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre registros de entrenamientos, facilitando el seguimiento y la planificación de rutinas de ejercicio.

## ⚙️ Tecnologías y librerías utilizadas
- **Backend:**
- Node.js
- Express.js
- MySQL2
- Cors
- Postman
- **Variables de entorno::** dotenv
- **Base de datos:** MySQL

## Tecnologías Pendientes de Implementar
- **Autenticación:** JSON Web Tokens (JWT)
- **Encriptación de contraseñas:** bcrypt
- **Frontend:**
- Node.js
- Express.js

## 🚀 Guia de Instalación y ejecución

### 📋 Requisitos previos
- Tener instalado **Node.js**
- Tener una instancia de **MySQL** en ejecución


### 🛠️ Pasos para ejecutar el proyecto

1️⃣ **Clonar el repositorio**
```
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

2️⃣ **Instalar dependencias**
```
npm install
```

3️⃣ **Configurar variables de entorno**  
Crea un archivo `.env` en la raíz del proyecto con los siguientes valores:
```
PORT=4001
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
```

4️⃣ **Ejecutar el backend**
```
npm run dev
```
La API se ejecutará en `http://localhost:4001`


---

## 📡 Endpoints Disponibles
### 🏋️‍♂️ Entrenamientos

GET:	/strongtrack/entrenamientos ---> Obtiene todos los entrenamientos

GET	:   /strongtrack/entrenamiento/:id ---> Obtiene un entrenamiento por ID

POST:   /strongtrack/entrenamiento ---> Crea un nuevo entrenamiento

PUT:	/strongtrack/entrenamiento/:id ---> Actualiza un entrenamiento existente

DELETE:	/strongtrack/entrenamiento/:id ---> Elimina un entrenamiento por ID


### 👩🏻‍🦳 Usuarios (pendiente de implementar)


---

## 🛠 Posibles Objetivos y Mejoras
- Implementar autenticación y autorización de usuarios con JWT en el backend y en el frontend
- Despliegue en Producción


