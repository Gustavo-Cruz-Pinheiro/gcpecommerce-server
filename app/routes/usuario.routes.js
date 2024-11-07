module.exports = app => {
    const usuarios = require("../controllers/usuario.controller.js");
  
    var router = require("express").Router();
  
    // Create a new usuario
    router.post("/", usuarios.create);
  
    // Retrieve all usuarios
    router.get("/", usuarios.findAll);
  
    // Retrieve a single usuario with id
    router.get("/:id", usuarios.findOne);
  
    // Update a usuario with id
    router.put("/:id", usuarios.update);
  
    // Delete a usuario with id
    router.delete("/:id", usuarios.delete);
  
    // Delete all usuarios
    router.delete("/", usuarios.deleteAll);

    // Delete all usuarios
    router.post("/login", usuarios.login);
  
    app.use('/api/usuarios', router);
  };
  