import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Planeador.css";

const Planeador = () => {
  const [modoBusqueda, setModoBusqueda] = useState("ciudad");
  const [input, setInput] = useState("");
  const [ciudadesDisponibles, setCiudadesDisponibles] = useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [resultado, setResultado] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [ciudadExpandida, setCiudadExpandida] = useState(null);

  const cambiarModo = (e) => {
    setModoBusqueda(e.target.value);
    setResultado(null);
    setInput("");
    setCiudadSeleccionada("");
    setCiudadesDisponibles([]);
  };

  const buscar = async () => {
    if (modoBusqueda === "ciudad") {
      const res = await fetch(`http://localhost:3001/destinos?ciudad=${input}`);
      const data = await res.json();
      if (data.length > 0) {
        setResultado(data[0]);
      } else {
        Swal.fire("No encontrado", "Ciudad no disponible", "warning");
        setResultado(null);
      }
    } else {
      const res = await fetch(`http://localhost:3001/destinos?pais=${input}`);
      const data = await res.json();
      if (data.length > 0) {
        const ciudades = data.map((d) => d.ciudad);
        setCiudadesDisponibles(ciudades);
      } else {
        Swal.fire("No encontrado", "País no disponible", "warning");
      }
    }
  };

  const buscarCiudadDelPais = async () => {
    const res = await fetch(`http://localhost:3001/destinos?pais=${input}&ciudad=${ciudadSeleccionada}`);
    const data = await res.json();
    if (data.length > 0) {
      setResultado(data[0]);
    } else {
      Swal.fire("No encontrado", "Ciudad no disponible", "warning");
    }
  };

  const guardarBusqueda = async () => {
    if (!resultado) return Swal.fire("Oops", "Primero haz una búsqueda", "info");

    const res = await fetch("http://localhost:3001/busquedas");
    const data = await res.json();

    const yaExiste = data.some((item) => item.ciudad === resultado.ciudad);
    if (yaExiste) return Swal.fire("Ya guardado", "Este destino ya está guardado", "info");

    await fetch("http://localhost:3001/busquedas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...resultado, id: undefined }),
    });

    Swal.fire("Guardado", "Destino guardado correctamente", "success");
    obtenerHistorial();
  };

  const obtenerHistorial = async () => {
    const res = await fetch("http://localhost:3001/busquedas");
    const data = await res.json();
    setHistorial(data);
  };

  const eliminarCiudad = async (id) => {
    try {
      await fetch(`http://localhost:3001/busquedas/${id}`, {
        method: "DELETE",
      });
      Swal.fire("Eliminado", "Destino eliminado del historial", "success");
      obtenerHistorial(); // Refresca la lista
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el destino", "error");
    }
  };

  useEffect(() => {
    obtenerHistorial();
  }, []);

  return (
    <div className="planeador">
      <section className="nueva-busqueda">
        <h2>Búsqueda nueva</h2>
        <select value={modoBusqueda} onChange={cambiarModo}>
          <option value="ciudad">Buscar por ciudad</option>
          <option value="pais">Buscar por país</option>
        </select>

        <input
          type="text"
          placeholder={modoBusqueda === "ciudad" ? "Ingresa una ciudad" : "Ingresa un país"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={buscar}>Buscar</button>

        {modoBusqueda === "pais" && ciudadesDisponibles.length > 0 && (
          <>
            <select value={ciudadSeleccionada} onChange={(e) => setCiudadSeleccionada(e.target.value)}>
              <option value="">Selecciona una ciudad</option>
              {ciudadesDisponibles.map((ciudad, i) => (
                <option key={i} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
            <button onClick={buscarCiudadDelPais}>Buscar ciudad</button>
          </>
        )}

        {resultado && (
          <div className="resultado">
            <h3>{resultado.ciudad}, {resultado.pais}</h3>
            <p><strong>Descripción:</strong> {resultado.descripcion}</p>
            <p><strong>Restaurantes Famosos:</strong> {resultado.comida}</p>
            <p><strong>Playas famosas:</strong> {resultado.playas}</p>
            <p><strong>Hoteles (USD):</strong></p>
            <p><strong>Hoteles (USD):</strong></p>
            <ul>
              {resultado.hoteles.map((hotel, i) => (
                <li key={i}>
                  {hotel.nombre} – ${hotel.precio_noche_usd}
                </li>
              ))}
            </ul>
            <p><strong>Transporte público (USD):</strong> {resultado.transporte}</p>
            <p><strong>Clima:</strong> {resultado.clima}</p>
            <p><strong>Sitios turísticos:</strong></p>
            <ul>
              {resultado.sitios.map((sitio, i) => (
                <li key={i}>
                  {sitio.nombre} – Horarios: {sitio.horarios}
                </li>
              ))}
            </ul>
            <p><strong>Fechas idóneas:</strong> {resultado.fechas}</p>
            <button onClick={guardarBusqueda}>Guardar búsqueda</button>
          </div>
        )}
      </section>

      <section className="historial">
        <h2>Historial de búsquedas</h2>
        <ul>
          {historial.map((item) => (
            <li key={item.id} className="historial-item">
              <div
                onClick={() =>
                  setCiudadExpandida(ciudadExpandida === item.id ? null : item.id)
                }
                style={{ cursor: "pointer", fontWeight: "bold" }}
              >
                {item.ciudad}, {item.pais}
              </div>

              {ciudadExpandida === item.id && (
                <div className="detalle-historial">
                  <p><strong>Descripción:</strong> {item.descripcion}</p>
                  <p><strong>Restaurantes Famosos:</strong> {item.comida}</p>
                  <p><strong>Playas famosas:</strong> {item.playas}</p>
                  <p><strong>Hoteles (USD):</strong></p>
                  <p><strong>Hoteles (USD):</strong></p>
                  <ul>
                    {item.hoteles.map((hotel, i) => (
                      <li key={i}>
                        {hotel.nombre} – ${hotel.precio_noche_usd}
                      </li>
                    ))}
                  </ul>
                  <p><strong>Transporte público (USD):</strong> {item.transporte}</p>
                  <p><strong>Clima:</strong> {item.clima}</p>
                  <p><strong>Sitios turísticos:</strong></p>
                  <p><strong>Sitios turísticos:</strong></p>
                  <ul>
                    {item.sitios.map((sitio, i) => (
                      <li key={i}>
                        {sitio.nombre} – Horarios: {sitio.horarios}
                      </li>
                    ))}
                  </ul>
                  <p><strong>Fechas idóneas:</strong> {item.fechas}</p>
                  <button onClick={() => eliminarCiudad(item.id)}>Eliminar</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Planeador;
