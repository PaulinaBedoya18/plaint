import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "./Components/Input";
import Button from "./Components/Button";
import Swal from "sweetalert2";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/usuarios");
      const usuarios = await response.json();

      const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.password === password
      );

      if (usuarioEncontrado) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: `Hola ${usuarioEncontrado.nombre || "usuario"}, has iniciado sesión con éxito.`,
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/planeador");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error de acceso",
          text: "Usuario o contraseña incorrectos. Intenta de nuevo.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar a la API.",
      });
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
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;

