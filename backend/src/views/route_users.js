const { Router } = require("express");
const router_user = Router();
const connection = require("../models/db.js");
const auth_token = require("../controller/auth.js");
const config = require("../controller/config.js");

// Reoute for login
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
        return res.status(403).send({ mesage: "error de contraseña" });
      }
    } else {
      return res.status(403).send("usuario no existe");
    }
  });
});

// Reoute for Register
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

// Reoute for test the conection for react
router_user.get("/consult", (req, res) => {
  const dcit_value = [
    {
      id_usuario: 123,
      numero_vuelo: "ED01",
      fechaPago: "2020-01-03 06:00:00",
      ciudad_salida: "Medellin",
      ciudad_destino: "Bogota",
      fecha_salida: "2020-01-08 06:00:00",
      fecha_llegada: "2020-01-08 7:00:00",
      tarifaVuelo: 800000,
      estado_vuelo: 1,
      asiento: "A1",
    },
  ];
  return res.status(200).json(dcit_value);
});
module.exports = router_user;
