const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); 

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bem vindo à minha aplicação." });
});

require("./app/routes/produto.routes.js")(app);
require("./app/routes/usuario.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}.`);
});
