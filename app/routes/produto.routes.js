module.exports = app => {
  const produtos = require("../controllers/produto.controller.js");

  var router = require("express").Router();

  // Create a new produto
  router.post("/", produtos.create);

  // Retrieve all produtos
  router.get("/", produtos.findAll);

  // Retrieve a single produto with id
  router.get("/:id", produtos.findOne);

  // Update a produto with id
  router.put("/:id", produtos.update);

  // Delete a produto with id
  router.delete("/:id", produtos.delete);

  // Delete all produtos
  router.delete("/", produtos.deleteAll);

  app.use('/api/produtos', router);
};
