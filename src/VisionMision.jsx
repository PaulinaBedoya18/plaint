import "./VisionMision.css";

const VisionMision = () => {
  return (
    <div>
      <main className="content">
        <section className="sobre-nosotros">
          <h1>Sobre Nosotros</h1>
          <p>
            En PlanIT creemos que cada viaje debe ser una experiencia única. Por eso, desarrollamos una plataforma que combina información útil, recomendaciones y herramientas inteligentes para ayudarte a planear de forma fácil, segura y personalizada.
          </p>
        </section>

        <div className="cards-container">
          <div className="card-horizontal vision">
            <h2>👁️ Nuestra Visión</h2>
            <p>
              Ser la plataforma líder en planificación de viajes, ofreciendo
              información precisa y personalizada para cada usuario.
            </p>
          </div>
          <div className="card-horizontal mision">
            <h2>🗺️ Nuestra Misión</h2>
            <p>
              Facilitar la organización de viajes proporcionando herramientas
              intuitivas y datos confiables sobre destinos turísticos.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VisionMision;
