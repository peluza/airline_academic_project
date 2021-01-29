const { Router } = require("express");
const router = Router();
const connection = require("../models/db.js");
const auth_token = require("../controller/auth.js");

router.get("/v1", (req, res) => {
  res.send("Welcome to API");
});

/* 
  SECTION GET
  ===================================================
*/

// Get the flights
router.get("/consulta_vuelos", auth_token.isAuth, (req, res) => {
  const sql = "SELECT * FROM Consulta_Vuelos";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).send("No encontrado");
    }
  });
});

// Get relevant user data to start session
router.get("/usuarios", auth_token.isAuth, (req, res) => {
  const sql = "SELECT * FROM Personas";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).send("No encontrado");
    }
  });
});

// Get user data relevant to flights
router.get("/datos_usuarios", auth_token.isAuth, (req, res) => {
  const sql = "SELECT * FROM Date_Users";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).send("No encontrado");
    }
  });
});

// Get user data relevant for flights by id
router.get("/datos_usuarios/:id", auth_token.isAuth, (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Date_Users WHERE id_usuario = ${id}`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).send("No encontrado");
    }
  });
});

// Get relevant user data to start session by id
router.get("/usuarios/:id", auth_token.isAuth, (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Personas WHERE id_usuario = ${id}`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).send("No encontrado");
    }
  });
});

// Get the flights by flight number
router.get("/consulta_vuelos/:id", auth_token.isAuth, (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Consulta_Vuelos WHERE numero_vuelo = "${id}"`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).send("No encontrado");
    }
  });
});

/* 
  SECTION POST
  ===================================================
*/

// Post the fligths
router.post("/consulta_vuelos", auth_token.isAuth, (req, res) => {
  if (
    req.body == null ||
    req.body.numero_vuelo == null ||
    req.body.ciudad_salida == null ||
    req.body.ciudad_destino == null ||
    req.body.fecha_salida == null ||
    req.body.fecha_llegada == null ||
    req.body.tarifaVuelo == null ||
    req.body.estado_vuelo == null
  ) {
    return res.status(404).send("Datos invalidos");
  }
  const sql = "INSERT INTO Consulta_Vuelos SET ?";
  const customerObj = {
    numero_vuelo: req.body.numero_vuelo,
    ciudad_salida: req.body.ciudad_salida,
    ciudad_destino: req.body.ciudad_destino,
    fecha_salida: req.body.fecha_salida,
    fecha_llegada: req.body.fecha_llegada,
    tarifaVuelo: req.body.tarifaVuelo,
    estado_vuelo: req.body.estado_vuelo,
  };
  connection.query(sql, customerObj, (error) => {
    if (error)
      return res.status(404).send(`Favor verificar informacion ${error}`);
    return res.status(201).send("Datos creados!");
  });
});

// Post user data relevant to flights
router.post("/datos_usuarios", (req, res) => {
  if (
    req.boy == null ||
    req.body.id_usuario == null ||
    req.body.numero_vuelo == null ||
    req.body.fechaPago == null
  ) {
    return res.status(404).send("Datos invalidos");
  }
  const sql = "INSERT INTO Date_Users SET ?";
  const customerObj = {
    id_usuario: req.body.id_usuario,
    numero_vuelo: req.body.numero_vuelo,
    fechaPago: req.body.fechaPago,
  };
  connection.query(sql, customerObj, (error) => {
    if (error)
      return res.status(404).send(`Favor verificar informacion ${error}`);
    return res.status(201).send("Datos creados!");
  });
});

/* 
  SECTION PUT
  ===================================================
*/

// Put relevant user data to start session
router.put("/usuarios/:id/update", auth_token.isAuth, (req, res) => {
  if (
    req.body == null ||
    req.body.nombre_usuario == null ||
    req.body.correo == null ||
    req.body.password_ == null
  ) {
    return res.status(404).send("Datos invalidos");
  }
  const { id } = req.params;
  const { nombre_usuario, correo, password_ } = req.body;
  const password__ = auth_token.encryptPassword(password_);
  const sql = `UPDATE Personas SET nombre_usuario = "${nombre_usuario}", correo = "${correo}",
    password_ = "${password__}" WHERE id_usuario = "${id}"`;
  connection.query(sql, (error) => {
    if (error)
      return res.status(404).send(`Favor verificar informacion ${error}`);
    return res.status(201).send("Usuario actuaizado!");
  });
});

// Put relevant user data to start session (password)
router.put("/usuarios/:id/password", auth_token.isAuth, (req, res) => {
  if (req.body == null || req.body.password_ == null) {
    return res.status(404).send("Datos invalidos");
  }
  const { id } = req.params;
  const { password_ } = req.body;
  const password__ = auth_token.encryptPassword(password_);
  const sql = `UPDATE Personas SET password_ = "${password__}" WHERE id_usuario = "${id}"`;
  connection.query(sql, (error) => {
    if (error)
      return res.status(404).send(`Favor verificar informacion ${error}`);
    return res.status(201).send("Usuario actuaizado!");
  });
});

// Put relevant user data to start session (mail)
router.put("/usuarios/:id/correo", auth_token.isAuth, (req, res) => {
  if (req.body == null || req.body.correo == null) {
    return res.status(404).send("Datos invalidos");
  }
  const { id } = req.params;
  const { correo } = req.body;
  const sql = `UPDATE Personas SET correo = "${correo}" WHERE id_usuario = "${id}"`;
  connection.query(sql, (error) => {
    if (error)
      return res.status(404).send(`Favor verificar informacion ${error}`);
    return res.status(201).send("Usuario actuaizado!");
  });
});

// Put relevant user data to start session (name user)
router.put("/usuarios/:id/nombre_usuario", auth_token.isAuth, (req, res) => {
  if (req.body == null || req.body.nombre_usuario == null) {
    return res.status(404).send("Datos invalidos");
  }
  const { id } = req.params;
  const { nombre_usuario } = req.body;
  const sql = `UPDATE Personas SET nombre_usuario = "${nombre_usuario}" WHERE id_usuario = "${id}"`;
  connection.query(sql, (error) => {
    if (error)
      return res.status(404).send(`Favor verificar informacion ${error}`);
    return res.status(201).send("Usuario actualizado!");
  });
});

// Put relevant user data to start session (id user)
router.put("/datos_usuarios/:id", auth_token.isAuth, (req, res) => {
  if (
    req.body == null ||
    req.body.numero_vuelo == null ||
    req.body.fechaPago == null
  ) {
    return res.status(404).send("Datos invalidos");
  }
  const { id } = req.params;
  const { numero_vuelo, fechaPago } = req.body;
  const sql = `UPDATE Personas SET numero_vuelo = "${numero_vuelo}", fechaPago = "${fechaPago}" 
    WHERE id_usuario = "${id}"`;
  connection.query(sql, (error) => {
    if (error)
      return res.status(404).send(`Favor verificar informacion ${error}`);
    return res.status(201).send("Usuario actuaizado!");
  });
});

// Put user data relevant for flights by number flights (number flights)
router.put(
  "/datos_usuarios/:id/numero_vuelo",
  auth_token.isAuth,
  (req, res) => {
    if (req.body == null || req.body.numero_vuelo == null) {
      return res.status(404).send("Datos invalidos");
    }
    const { id } = req.params;
    const { numero_vuelo } = req.body;
    const sql = `UPDATE Personas SET numero_vuelo = "${numero_vuelo}" WHERE id_usuario = "${id}"`;
    connection.query(sql, (error) => {
      if (error)
        return res.status(404).send(`Favor verificar informacion ${error}`);
      return res.status(201).send("Usuario actualizado!");
    });
  }
);

// Put user data relevant for flights by number flights (Payment date)
router.put("/datos_usuarios/:id/fechaPago", auth_token.isAuth, (req, res) => {
  if (req.body == null || req.body.fechaPago == null) {
    return res.status(404).send("Datos invalidos");
  }
  const { id } = req.params;
  const { fechaPago } = req.body;
  const sql = `UPDATE Personas SET fechaPago = "${fechaPago}" WHERE id_usuario = "${id}"`;
  connection.query(sql, (error) => {
    if (error)
      return res.status(404).send(`Favor verificar informacion ${error}`);
    return res.status(201).send("Usuario actualizado!");
  });
});

// Put the flights by flight number (flight seat)
router.put("/consulta_vuelos/:id/asiento", auth_token.isAuth, (req, res) => {
  if (
    req.body == null ||
    req.body.asiento == null ||
    req.body.id_usuario == null
  ) {
    return res.status(404).send("Datos invalidos");
  }
  const { id } = req.params;
  const asiento = req.body.asiento;
  const id_usuario = req.body.id_usuario;
  const sql = `UPDATE Consulta_Vuelos SET asiento_${asiento} = "${id_usuario}" WHERE numero_vuelo = "${id}"`;
  connection.query(sql, (error) => {
    if (error)
      return res.status(404).send(`Favor verificar informacion ${error}`);
    return res.status(201).send("Usuario actualizado!");
  });
});

/* 
  SECTION DELETE
  ===================================================
*/

// Delete relevant user data to start session by id
router.delete("/usuarios/:id", auth_token.isAuth, (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Personas WHERE id_usuario = ${id}`;
  connection.query(sql, (error) => {
    if (error)
      return res.status(404).send(`Favor verificar informacion ${error}`);
    return res.send("Usuario eliminado");
  });
});

// Delete user data relevant for flights by id
router.delete("/datos_usuarios/:id", auth_token.isAuth, (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Date_Users WHERE id_usuario = ${id}`;
  connection.query(sql, (error) => {
    if (error)
      return res.status(404).send(`Favor verificar informacion ${error}`);
    return res.send("User deleted");
  });
});

// Delete the flights by flight number
router.delete("/consulta_vuelos/:id", auth_token.isAuth, (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Consulta_Vuelos WHERE id_usuario = ${id}`;
  connection.query(sql, (error) => {
    if (error)
      return res.status(404).send(`Favor verificar informacion ${error}`);
    return res.send("User deleted");
  });
});

module.exports = router;
