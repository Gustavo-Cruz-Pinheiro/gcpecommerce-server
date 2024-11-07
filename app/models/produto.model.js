const sql = require("./db.js");

// constructor
const Produto = function(produto) {
  this.nome = produto.nome;
  this.descricao = produto.descricao;
  this.preco = produto.preco;
};

Produto.create = (newProduto, result) => {
  sql.query("INSERT INTO produtos SET ?", newProduto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created produto: ", { id: res.insertId, ...newProduto });
    result(null, { id: res.insertId, ...newProduto });
  });
};

Produto.findById = (id, result) => {
  sql.query(`SELECT * FROM produtos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found produto: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Produto with the id
    result({ kind: "not_found" }, null);
  });
};

Produto.getAll = (nome, result) => {
  let query = "SELECT * FROM produtos";

  if (nome) {
    query += ` WHERE nome LIKE '%${nome}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("produtos: ", res);
    result(null, res);
  });
};

Produto.updateById = (id, produto, result) => {
  sql.query(
    "UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?",
    [produto.nome, produto.descricao, produto.preco, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Produto with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated produto: ", { id: id, ...produto });
      result(null, { id: id, ...produto });
    }
  );
};

Produto.remove = (id, result) => {
  sql.query("DELETE FROM produtos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Produto with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted produto with id: ", id);
    result(null, res);
  });
};

Produto.removeAll = result => {
  sql.query("DELETE FROM produtos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} produtos`);
    result(null, res);
  });
};

module.exports = Produto;
