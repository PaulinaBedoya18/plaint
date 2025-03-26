import React from "react";
import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from "react-router-dom";
import Home from "./home.jsx";
import HistorialUsuario from "./HistorialUsuario.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import VisionMision from "./VisionMision.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import"./main.css";
import "./home.css";
import "./HistorialUsuario.css";
import "./Login.css"; 
import "./Register.css";
import "./VisionMision.css";  



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <Home />
    <HistorialUsuario />
    <Login />
    <Register />
    <VisionMision />
    <Footer />
  </React.StrictMode>
);