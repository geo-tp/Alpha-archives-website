import { Link } from "react-router-dom";

export const LinkCard = ({ image, alt, name, link }) => {
  if (link) {
    return (
      <a href={link} className="link-card">
        <h3>{name}</h3>
        <img src={image} alt={alt} />
      </a>
    );
  }

  return (
    <Link className="link-card" to={`/browse/${name}`}>
      <h3>{name}</h3>
      <img src={image} alt={alt} />
    </Link>
  );
};
