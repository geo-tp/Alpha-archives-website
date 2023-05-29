import { useQuery } from "react-query";
import { fetchRandomScreenshot } from "../../api/getRandomScreenshot";
import { HomeBanner } from "../HomeBanner";
import { CardsLink } from "../../../../components/CardsLink";
import { RandomScreenshot } from "../RandomScreenshot";
import { ScreenshotArticle } from "../ScreenshotArticle";

import sw from "./assets/sw.webp";
import og from "./assets/og.webp";
import tb from "./assets/tb.webp";
import ds from "./assets/ds.webp";
import if_ from "./assets/if.webp";
import uc from "./assets/uc.webp";

import alphacore from "./assets/alphacore.webp";
import db from "./assets/database.webp";
import discord from "./assets/discord.jpeg";
import geo from "./assets/napoleon.webp";
import crawler from "./assets/crawler.webp";
import vanilla from "./assets/vanilla.webp";

const cityCards = [
  { title: "Stormwind", img: sw, alt: "Stormwind screenshots" },
  { title: "Ironforge", img: if_, alt: "Ironforge screenshots" },
  { title: "Darnassus", img: ds, alt: "Darnassus screenshots" },
  { title: "Orgrimmar", img: og, alt: "Orgrimmar screenshots" },
  { title: "Thunder Bluff", img: tb, alt: "Thunderbluff screenshots" },
  { title: "Undercity", img: uc, alt: "Undercity  screenshots" },
];

const relatedCards = [
  {
    title: "Alpha Core",
    img: alphacore,
    alt: "Alpha core project",
    link: "https://github.com/The-Alpha-Project/alpha-core",
  },
  {
    title: "Discord",
    img: discord,
    alt: "Discord invitation",
    link: "https://discord.gg/RzBMAKU",
  },
  {
    title: "Database",
    img: db,
    alt: "Wow Database 0.5.3",
    link: "https://db.thealphaproject.eu/",
  },
  {
    title: "Text Crawler",
    img: crawler,
    alt: "WoW Text Crawler",
    link: "https://crawler.thealphaproject.eu/",
  },
  {
    title: "Vanilla Archive",
    img: vanilla,
    alt: "WoW Vanilla Archive",
    link: "https://vanilla-archive.thealphaproject.eu/",
  },
  {
    title: "Geo GitHub",
    img: geo,
    alt: "Geo profile github",
    link: "https://github.com/geo-tp",
  },
];

export const Home = () => {
  // Random screenshot query
  const { isLoading, isSuccess, data, refetch } = useQuery(
    "random-screenshot",
    fetchRandomScreenshot,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    }
  );

  return (
    <main className="home">
      <HomeBanner screenshotCount={data?.total_number} />
      <CardsLink
        title="Explore Cities Screenshot"
        cards={cityCards}
        alternativeColor={false}
      />
      {isSuccess && (
        <RandomScreenshot
          isLoading={isLoading}
          changeScreenshot={refetch}
          screenshot={data}
        />
      )}
      <ScreenshotArticle />
      <CardsLink
        title="Related Links"
        cards={relatedCards}
        alternativeColor={true}
      />
    </main>
  );
};
