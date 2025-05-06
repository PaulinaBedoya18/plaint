import React, { useState } from "react";
import "./Register.css";
// import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert("Registro exitoso");
    // navigate("/login");
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
       <input
          type="nombre"
          placeholder="Nombres"
          value={String}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="apellido"
          placeholder="Apellidos"
          value={String}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={String}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
        type="fecha de nacimiento"
        placeholder="Fecha de nacimiento"
        value={Date}
        onChange={(e) => setFechadenacimiento(e.target.value)}
        required
      />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
