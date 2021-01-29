import React, { Component } from "react";
import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const baseURL = "http://127.0.0.1:3052/users/login";

class Login extends Component {
  state = {
    form: {
      id_usuario: "",
      password_: "",
    },
  };
  // Add value to state
  handleChange = async (e) => {
    await this.setState({
      from: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  // Request for API
  iniciarSesion = async () => {
    // Simple POST request with a JSON body using axios
    await axios
      .post(baseURL, {
        id_usuario: this.state.form.id_usuario,
        password_: this.state.form.password_,
      })
      .then(function (response) {
        response.json();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="id_usuario"
              onChange={this.handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password_"
              onChange={this.handleChange}
            />
            <br />
            <button
              className="btn btn-primary"
              onClick={() => this.iniciarSesion()}
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
