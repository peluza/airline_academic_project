import React, { Component } from "react";
import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";

const baseURL = "http://127.0.0.1:3052/users/consult";
const cookies = new Cookies();

// Request for API
const run_consult = async () => {
  // Simple GET request using fetch
  await axios
    .get(baseURL)
    .then(function (response) {
      return response.data;
    })
    .then((response) => {
      if (response.length > 0) {
        var respuesta = response[0];
        cookies.set("id_usuario", respuesta.id_usuario, { path: "/" });
        cookies.set("numero_vuelo", respuesta.numero_vuelo, {
          path: "/",
        });
        cookies.set("fechaPago", respuesta.fechaPago, { path: "/" });
        cookies.set("ciudad_salida", respuesta.ciudad_salida, {
          path: "/",
        });
        cookies.set("ciudad_destino", respuesta.ciudad_destino, {
          path: "/",
        });
        cookies.set("fecha_salida", respuesta.fecha_salida, {
          path: "/",
        });
        cookies.set("fecha_llegada", respuesta.fecha_llegada, {
          path: "/",
        });
        cookies.set("tarifaVuelo", respuesta.tarifaVuelo, { path: "/" });
        cookies.set("estado_vuelo", respuesta.estado_vuelo, {
          path: "/",
        });
        cookies.set("asiento", respuesta.asiento, { path: "/" });
      }
    })
    .catch(function (error) {
      console.log("estoy dentro de error");
      console.log(error);
    });
};
run_consult();

class Consult extends Component {
  render() {
    return (
      <div>
        <ReactBootStrap.Table>
          <thead>
            <tr>
              <th>id_usuario</th>
              <th>numero_vuelo </th>
              <th>fechaPago</th>
              <th>ciudad_salida</th>
              <th>ciudad_destino</th>
              <th>fecha_salida</th>
              <th>fecha_llegada </th>
              <th>tarifaVuelo</th>
              <th>estado_vuelo</th>
              <th>asiento</th>
            </tr>
          </thead>
          <tr>
            <td>{cookies.get("id_usuario")}</td>
            <td>{cookies.get("numero_vuelo")}</td>
            <td>{cookies.get("fechaPago")}</td>
            <td>{cookies.get("ciudad_salida")}</td>
            <td>{cookies.get("ciudad_destino")}</td>
            <td>{cookies.get("fecha_salida")}</td>
            <td>{cookies.get("fecha_llegada")}</td>
            <td>{cookies.get("tarifaVuelo")}</td>
            <td>{cookies.get("estado_vuelo")}</td>
            <td>{cookies.get("asiento")}</td>
          </tr>
        </ReactBootStrap.Table>
      </div>
    );
  }
}

export default Consult;
