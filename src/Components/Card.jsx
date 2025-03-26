import "./Card.css";

const Card = ({ title, description, image }) => {
    return (
      <div className="card">
        <img src={image} alt={title} className="card-image" />
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    );
  };

export default Card;