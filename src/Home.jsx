import { useState } from "react";
import Input from "./Components/Input";
import Button from "./Components/Button";
import Card from "./Components/Card";
import "./Home.css";

const Home = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", search);
  };

  return (
    <div className="home">
      <header className="hero">
        <h1>Bienvenido a PlanIT</h1>
        <p>Encuentra el mejor destino para tu próxima aventura</p>
        <form onSubmit={handleSearch} className="search-form">
          <Input
            type="text"
            placeholder="Buscar destino..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <Button text="Buscar" onClick={handleSearch} className="search-button" />
        </form>
      </header>
      <section className="recommended">
        <h2>Destinos Recomendados</h2>
        <div className="card-container">
          <Card
            title="París, Francia"
            description="La ciudad del amor y la luz, con su icónica Torre Eiffel."
            image="/images/paris.jpg"
          />
          <Card
            title="Tokio, Japón"
            description="Una mezcla perfecta de tradición y tecnología."
            image="/images/tokio.jpg"
          />
          <Card
            title="Cusco, Perú"
            description="La puerta de entrada a Machu Picchu y la cultura Inca."
            image="/images/cusco.jpg"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
