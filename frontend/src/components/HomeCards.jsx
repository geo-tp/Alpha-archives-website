import { LinkCard } from "./LinkCard";

export const HomeCards = ({ title, cards }) => {
  return (
    <div className="home-cards">
      <h2 className="home-cards__title">{title} </h2>
      <div className="home-cards__cards">
        {cards.map((card) => (
          <LinkCard
            name={card.name}
            image={card.image}
            alt={card.alt}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
};
