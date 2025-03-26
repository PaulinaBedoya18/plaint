import logo from "/public/logo_rectangular.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
        <h3>Home</h3>
        <h3>Buscador</h3>
        <h3>Historial</h3>
        <h3>Login</h3>
        <h3>Registro</h3>
        <h3>Visión y Misión</h3>
      <img src={logo} alt="PlanIT Logo" className="logo" />
    </nav>
  );
};

export default Navbar;