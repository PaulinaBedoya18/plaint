import React, { useState } from "react";
import Button from "./Components/Button";
import Input from "./Components/Input";
import "./Login.css";
// import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with", email, password);
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
        No tienes cuenta? <a to="/register">Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;