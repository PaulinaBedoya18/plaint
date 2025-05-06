import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../Home.jsx";
import Login from "../Login.jsx";
import Register from "../Register.jsx";
import HistorialUsuario from "../HistorialUsuario.jsx";
import VisionMision from "../VisionMision.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";




const Enrutador = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/historial' element={<HistorialUsuario />} />
        <Route path='/vision-mision' element={<VisionMision />} />
      </Routes>

      <Footer />
    </>
  );
};

export default Enrutador;
