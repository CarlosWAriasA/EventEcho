const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./connection/connection");
const dotenv = require("dotenv");
const authRoutes = require("./router/login");
const registerRoutes = require("./router/register");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
   res.json({ working: "THE APP IS WORKING" });
});

app.use("/api/", authRoutes);
app.use("/api/", registerRoutes);

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
