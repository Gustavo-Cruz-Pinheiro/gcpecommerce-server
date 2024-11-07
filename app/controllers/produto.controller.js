const Produto = require("../models/produto.model.js");

// Create and Save a new Produto
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Produto
  const produto = new Produto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    preco: req.body.preco
  });

  // Save Produto in the database
  Produto.create(produto, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Produto."
      });
    else res.send(data);
  });
};

// Retrieve all Produtos from the database (with condition).
exports.findAll = (req, res) => {
  const nome = req.query.nome;

  Produto.getAll(nome, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving produtos."
      });
    else res.send(data);
  });
};

// Find a single Produto by Id
exports.findOne = (req, res) => {
  Produto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Produto with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Produto with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Produto identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Produto.updateById(
    req.params.id,
    new Produto(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Produto with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Produto with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Produto with the specified id in the request
exports.delete = (req, res) => {
  Produto.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Produto with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Produto with id " + req.params.id
        });
      }
    } else res.send({ message: `Produto was deleted successfully!` });
  });
};

// Delete all Produtos from the database.
exports.deleteAll = (req, res) => {
  Produto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all produtos."
      });
    else res.send({ message: `All Produtos were deleted successfully!` });
  });
};
