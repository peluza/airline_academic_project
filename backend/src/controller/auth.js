const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const connection = require("../models/db.js");
const config = require("../controller/config.js");

// Auth
module.exports.isAuth = function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ mesage: "Favor ingrese token" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decode = jwt.verify(token, config.clave);
    const sql = `SELECT * FROM Personas WHERE id_usuario = ${decode.id_users}`;
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        next();
      } else {
        return res.status(403).send("Not found");
      }
    });
  } catch (error) {
    return res.status(403).send({ mesage: "Sin acceso" });
  }
};

module.exports.encryptPassword = function encryptPassword(password) {
  const salt = CryptoJS.MD5(password);
  return salt;
};

module.exports.comparePassword = function comparePassword(
  password,
  receivedPassword
) {
  if (password == receivedPassword) {
    return true;
  } else {
    return false;
  }
};

module.exports.create_token = function create_token(payload, clave) {
  const token = jwt.sign(payload, clave, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  });
  return token;
};
