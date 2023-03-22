import { Link } from "react-router-dom";
import { CardLinkType } from "../../types";

export const CardLink = (props: CardLinkType) => {
  if (props.link) {
    return (
      <a href={props.link} className="card-link">
        <h3>{props.title}</h3>
        <img src={props.img} alt={props.alt} />
      </a>
    );
  }

  return (
    <Link className="card-link" to={`/browse/${props.title}`}>
      <h3>{props.title}</h3>
      <img src={props.img} alt={props.alt} />
    </Link>
  );
};
