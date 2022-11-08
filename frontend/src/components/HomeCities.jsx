import { CityCard } from "./CityCard";
import sw from "../assets/sw.jpg";
import og from "../assets/og.jpg";
import tb from "../assets/tb.jpg";
import ds from "../assets/ds.jpg";
import if_ from "../assets/if.jpg";
import uc from "../assets/uc.jpg";

export const HomeCities = () => {
  return (
    <div className="home-cities">
      <h2 className="home-cities__title">Explore cities screenshots : </h2>
      <div className="home-cities__cards">
        <CityCard
          name="Stormwind"
          image={sw}
          alt={`screenshots from Stormwind`}
        />
        <CityCard
          name="Ironforge"
          image={if_}
          alt={`screenshots from Ironforge`}
        />
        <CityCard
          name="Darnassus"
          image={ds}
          alt={`screenshots from Darnassus`}
        />
        <CityCard
          name="Orgrimmar"
          image={og}
          alt={`screenshots from Orgrimmar`}
        />
        <CityCard
          name="Thunderbluff"
          image={tb}
          alt={`screenshot from Thunderbluff`}
        />
        <CityCard
          name="Undercity"
          image={uc}
          alt={`screenshot from Undercity`}
        />
      </div>
    </div>
  );
};
