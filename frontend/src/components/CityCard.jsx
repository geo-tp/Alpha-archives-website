import { Link } from "react-router-dom";

export const CityCard = ({ image, alt, name }) => {
  return (
    <Link className="city-card" to={`/browse/${name}`}>
      <h3>{name}</h3>
      <img src={image} alt={alt} />
    </Link>
  );
};
