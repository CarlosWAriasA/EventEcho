const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./router/login");
const registerRoutes = require("./router/register");
const homeRouter = require("./router/homeRouter");
const eventRouter = require("./router/eventRouter");
const profileRouter = require("./router/profileRouter");
const comentarioRouter = require("./router/comentarioRouter");
const notificacionRouter = require("./router/notificacionRouter");
const userEventsRouter = require("./router/userEventsRouter");
const sequelize = require("./connection/connection");
const defineAssociations = require("./connection/associations");
const userRoutes = require("./router/userRouter");
const forgotPasswordRouter = require("./router/forgotPasswordRouter");
const resetPasswordRouter = require("./router/resetPasswordRouter");

dotenv.config();

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/", authRoutes);
app.use("/api/", registerRoutes);

app.use("/", homeRouter);
app.use("/api/events/", eventRouter);
app.use("/api/profile/", profileRouter);
app.use("/api/comentarios/", comentarioRouter);
app.use("/api/notificaciones/", notificacionRouter);
app.use("/api/", userEventsRouter);

//Ruta de los usuarios
app.use("/api/", userRoutes);
app.use("/api/forgot-password/", forgotPasswordRouter);
app.use("/api/reset-password/", resetPasswordRouter);

// para servir imagenes estaticas
app.use("/api/uploads/", express.static(path.join(__dirname, "uploads")));

// Middleware para manejar rutas inexistentes y devolver un error 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 5000;

defineAssociations();

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;