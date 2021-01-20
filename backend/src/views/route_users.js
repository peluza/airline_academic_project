const { Router } = require("express");
const router_user = Router();
const connection = require("../models/db.js");
const auth_token = require("../controller/auth.js");
const config = require("../controller/config.js");

router_user.post("/login", (req, res) => {
  if (
    req.body == null ||
    req.body.id_usuario == null ||
    req.body.password_ == null
  ) {
    return res.status(404).send("Datos invalidos");
  }
  const id_users = req.body.id_usuario;
  const password__ = auth_token.encryptPassword(req.body.password_);
  const sql = `SELECT password_ FROM Personas WHERE id_usuario = ${id_users}`;
  connection.query(sql, (error, results) => {
    if (error) return res.status(404).send(`Verificar contraseña`);
    if (results.length > 0) {
      let agrupado = results.reduce((accum, row) => {
        let { password_: id } = row;
        accum[id] = accum[id] || { id };
        return accum[id];
      }, {});
      password_1 = agrupado.id;
      password_2 = password__.toString();
      const result_compa = auth_token.comparePassword(password_1, password_2);
      if (result_compa == true) {
        const payload = {
          id_users: id_users,
        };
        const token = auth_token.create_token(payload, config.clave);
        return res.send({
          token,
        });
      } else {
        return res.status(403).send("error de contraseña");
      }
    } else {
      return res.status(403).send("usuario no existe");
    }
  });
});

// Register

router_user.post("/register", (req, res) => {
  if (
    req.body == null ||
    req.body.id_usuario == null ||
    req.body.nombre_usuario == null ||
    req.body.correo == null ||
    req.body.password_ == null
  ) {
    return res.status(404).send("Datos invalidos");
  }
  const sql = "INSERT INTO Personas SET ?";
  const customerObj = {
    id_usuario: req.body.id_usuario,
    nombre_usuario: req.body.nombre_usuario,
    correo: req.body.correo,
    password_: auth_token.encryptPassword(req.body.password_),
  };
  connection.query(sql, customerObj, (error) => {
    if (error)
      return res.status(404).send(`Favor verificar informacion ${error}`);
    return res.status(201).send("data created!");
  });
});

module.exports = router_user;
