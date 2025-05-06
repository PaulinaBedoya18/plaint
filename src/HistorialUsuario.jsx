import Card from "./Components/Card";
import "./HistorialUsuario.css";


const HistorialUsuario = () => {
  // Simulación de historial de búsqueda
  const historial = [
    { id: 1, title: "París, Francia", description: "Viaje en diciembre 2024", image: "/paris_francia.jpg" },
    { id: 2, title: "Tokio, Japón", description: "Exploración de cultura y tecnología", image: "/tokio_japon.jpg" },
    { id: 3, title: "Roma, Italia", description: "Vacaciones de verano", image: "roma_italia.jpg" },
  ];

  return (
    <div>
      <main className="historial-container">
        <h2>Historial de Búsqueda</h2>
        <div className="historial-list">
          {historial.map((item) => (
            <Card key={item.id} title={item.title} description={item.description} image={item.image} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HistorialUsuario;