import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Planeador.css";

const Planeador = () => {
  const [destino, setDestino] = useState("");
  const [resultado, setResultado] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const buscarDestino = async () => {
    try {
      const res = await fetch(`http://localhost:3001/destinos?ciudad=${destino}`);
      const data = await res.json();
      if (data.length > 0) {
        setResultado(data[0]);
      } else {
        Swal.fire("No encontrado", "Destino no disponible en la base de datos", "warning");
        setResultado(null);
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo buscar el destino", "error");
    }
  };

  const guardarBusqueda = async () => {
    if (!resultado) {
      Swal.fire("Oops", "Primero debes hacer una búsqueda", "info");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/busquedas");
      const data = await res.json();

      const yaGuardado = data.some(item => item.ciudad === resultado.ciudad);

      if (yaGuardado) {
        Swal.fire("Destino ya guardado", "Este destino ya está en tu historial", "info");
        return;
      }

      await fetch("http://localhost:3001/busquedas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultado),
      });

      Swal.fire("Guardado", "Destino guardado correctamente", "success");
      obtenerHistorial();
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar el destino", "error");
    }
  };

  const obtenerHistorial = async () => {
    const res = await fetch("http://localhost:3001/busquedas");
    const data = await res.json();
    setHistorial(data);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    Swal.fire("Sesión cerrada", "Has cerrado sesión correctamente", "info").then(() => {
      window.location.href = "/login";
    });
  };

  useEffect(() => {
    obtenerHistorial();
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  return (
    <div className="planeador-container">
      <div className="planeador-header">
        {usuario && (
          <h2 className="bienvenida">
            ¡Bienvenid@ {usuario.Nombres || usuario.nombre} a tu planeador de viajes!
          </h2>
        )}
        <button className="cerrar-btn" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      <div className="planeador-contenido">
        <section className="section-box">
          <h2>Búsqueda nueva</h2>
          <input
            type="text"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            placeholder="Ingresa una ciudad"
          />
          <button onClick={buscarDestino}>Buscar</button>

          {resultado && (
            <div className="resultado">
              <h3>{resultado.ciudad}, {resultado.pais}</h3>
              <p><strong>Comida típica:</strong> {resultado.comida}</p>
              <p><strong>Playas famosas:</strong> {resultado.playas}</p>
              <p><strong>Hoteles (USD):</strong> {resultado.hoteles}</p>
              <p><strong>Transporte público (USD):</strong> {resultado.transporte}</p>
              <p><strong>Precio de tiquete (USD):</strong> {resultado.tiquete}</p>
              <p><strong>Sitios turísticos:</strong> {resultado.sitios}</p>
              <button onClick={guardarBusqueda}>Guardar búsqueda</button>
            </div>
          )}
        </section>

        <section className="section-box">
          <h2>Historial de búsquedas</h2>
          <ul>
            {historial.map((item, i) => (
              <li key={i} className="historial-item">
                <strong>{item.ciudad}, {item.pais}</strong> – {item.comida}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Planeador;
