const express = require("express");
const path = require("path");
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

// para servir imagenes estaticas
app.use('/api/uploads/', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

defineAssociations();

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
