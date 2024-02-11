import express from 'express';
import { PORT } from './config/constants.js';

// Creamos una instancia de express
const app = express();

// Definimos una ruta
app.get('/', (req, res) => {
  res.send('Home Page!');
});

// Iniciamos el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});