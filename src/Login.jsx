import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alerta, generarToken } from './helpers/funciones.js';
import Input from "./Components/Input";
import Button from "./Components/Button";
import "./Login.css";
import { usuarios as baseUsuarios } from "./services/database.js"; // <--- IMPORTAR USUARIOS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const buscarUsuario = () => {
    return baseUsuarios.find(
      (item) => email === item.Correo && password === item.contrasena
    );
  };

  const handleLogin = () => {
    const usuarioEncontrado = buscarUsuario();
    if (usuarioEncontrado) {
      const tokenAcceso = generarToken();
      localStorage.setItem("token", tokenAcceso);
      localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
      alerta("Bienvenido", "Acceso al sistema", "success");
      navigate("/home");
    } else {
      alerta("Error", "Usuario o contraseña incorrectos", "error");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <Button text="Login" onClick={handleLogin} className="btn" />
      <p>
        No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;
