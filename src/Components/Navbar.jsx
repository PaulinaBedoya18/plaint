import { useNavigate } from "react-router-dom"; 
import logo from "/public/logo_rectangular.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <h3 onClick={() => handleNavigation("/")}>Home</h3>
        <h3 onClick={() => handleNavigation("/vision-mision")}>Sobre Nosotros</h3>
        <h3 onClick={() => handleNavigation("/login")}>Login</h3>
      </div>
      <img src={logo} alt="PlanIT Logo" className="logo" />
    </nav>
  );
};

export default Navbar;

