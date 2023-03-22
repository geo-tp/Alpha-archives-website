import { CardLinkType } from "../../types";
import { CardLink } from "../CardLink";

type CardsLinkProps = {
  title: string;
  cards: CardLinkType[];
  alternativeColor: boolean;
};

export const CardsLink = (props: CardsLinkProps) => {
  return (
    <div
      className={
        props.alternativeColor
          ? "cards-link cards-link--alternative-color"
          : "cards-link"
      }
    >
      <h2 className="cards-link__title">{props.title} </h2>
      <div className="cards-link__cards">
        {props.cards.map((card) => (
          <CardLink
            key={`cards-link-${card.title}${card.alt}`}
            title={card.title}
            img={card.img}
            alt={card.alt}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
};
