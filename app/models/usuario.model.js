const sql = require("./db.js");

// constructor
const Usuario = function(usuario) {
  this.email = usuario.email;
  this.senha = usuario.senha;
};

Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created usuario: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

Usuario.findById = (id, result) => {
  sql.query(`SELECT * FROM usuarios WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found usuario: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Usuario with the id
    result({ kind: "not_found" }, null);
  });
};

Usuario.findLogin = (usuario, result) => {
  sql.query("SELECT * FROM usuarios WHERE email = ? and senha = ?",
  [usuario.email, usuario.senha], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found usuario: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Usuario with the id
    result({ kind: "not_found" }, null);
  });
};

Usuario.getAll = (email, result) => {
  let query = "SELECT * FROM usuarios";

  if (email) {
    query += ` WHERE email LIKE '%${email}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuarios: ", res);
    result(null, res);
  });
};

Usuario.updateById = (id, usuario, result) => {
  sql.query(
    "UPDATE usuarios SET email = ?, senha = ? WHERE id = ?",
    [usuario.email, usuario.senha, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Usuario with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated usuario: ", { id: id, ...usuario });
      result(null, { id: id, ...usuario });
    }
  );
};

Usuario.remove = (id, result) => {
  sql.query("DELETE FROM usuarios WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Usuario with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted usuario with id: ", id);
    result(null, res);
  });
};

Usuario.removeAll = result => {
  sql.query("DELETE FROM usuarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} usuarios`);
    result(null, res);
  });
};

module.exports = Usuario;
