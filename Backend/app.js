const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./router/login");
const registerRoutes = require("./router/register");
const homeRouter = require("./router/homeRouter");
const eventRouter = require("./router/eventRouter");
const profileRouter = require("./router/profileRouter");
const userRouter = require("./router/userRouter");
const userEventsRouter = require("./router/userEventsRouter");
const sequelize = require("./connection/connection");
const defineAssociations = require("./connection/associations");
const userRoutes = require('./router/userRouter');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/", authRoutes);
app.use("/api/", registerRoutes);

app.use("/", homeRouter);
app.use("/api/events/", eventRouter);
app.use("/api/registro-evento/", userRouter);
app.use("/api/profile/", profileRouter);

app.use("/api/", userEventsRouter);

//Ruta de los usuarios
app.use('/api/usuarios/', userRoutes);


//Solo para Probar que las Rutas no estan Mal
app.use((req, res, next) => {
  res.status(404).json({
      ok: false,
      msg: 'Ruta no encontrada'
  });
});


const PORT = process.env.PORT || 5000;

defineAssociations();

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ok ${PORT}`);
  });
});

module.exports = app;
