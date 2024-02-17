import express from 'express';
//import { PORT } from './config/constants.js';

// Creamos una instancia de express


//Modifique el Port porque a la hora de iniciarlo no lo encontraba, lo declare aqui en vez de extraerlo de un modulo
const app = express();
const PORT = 3000;

// Definimos una ruta
app.get('/', (req, res) => {
  res.send('Home Page!');
});

// Iniciamos el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});