import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home.jsx";
import Login from "../Login.jsx";
import Register from "../Register.jsx";
import VisionMision from "../VisionMision.jsx";
import Planeador from "../Planeador.jsx";
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
        <Route path='/vision-mision' element={<VisionMision />} />
        <Route path='/planeador' element={<Planeador />} />
      </Routes>

      <Footer />
    </>
  );
};

export default Enrutador;
