const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const api_key = require('./config/config');
const router = require("./routes/auth-routes");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors());
app.use(router)

const PORT = process.env.PORT || 8000;

mongoose.connect(api_key.mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error al conectar a la base de datos:", error);
  });

