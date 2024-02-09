import express from 'express';

// Creamos una instancia de express
const app = express();

// Definimos una ruta
app.get('/', (req, res) => {
  res.send('KLK!');
});

// Iniciamos el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});