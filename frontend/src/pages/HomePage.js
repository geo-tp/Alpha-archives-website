import { Component } from "react";

import { fetchRandomScreenshot } from "../api/fetchRandomScreenshot";
import { HomeCards } from "../components/HomeCards";

// IMG FOR CARDS
import sw from "../assets/sw.webp";
import og from "../assets/og.webp";
import tb from "../assets/tb.webp";
import ds from "../assets/ds.webp";
import if_ from "../assets/if.webp";
import uc from "../assets/uc.webp";
import alphacore from "../assets/alphacore.webp";
import db from "../assets/database.webp";
import discord from "../assets/discord.jpeg";
import geo from "../assets/napoleon.webp";
import { HomeBanner } from "../components/HomeBanner";
import { RandomBox } from "../components/RandomBox";

const cityCards = [
  { name: "Stormwind", image: sw, alt: "Stormwind screenshots" },
  { name: "Ironforge", image: if_, alt: "Ironforge screenshots" },
  { name: "Darnassus", image: ds, alt: "Darnassus screenshots" },
  { name: "Orgrimmar", image: og, alt: "Orgrimmar screenshots" },
  { name: "Thunder Bluff", image: tb, alt: "Thunderbluff screenshots" },
  { name: "Undercity", image: uc, alt: "Undercity  screenshots" },
];

const usefullCards = [
  {
    name: "Alpha Core",
    image: alphacore,
    alt: "Alpha core project",
    link: "https://github.com/The-Alpha-Project/alpha-core",
  },
  {
    name: "Discord",
    image: discord,
    alt: "Discord invitation",
    link: "https://discord.gg/RzBMAKU",
  },
  {
    name: "Database",
    image: db,
    alt: "Wow Database 0.5.3",
    link: "https://db.thealphaproject.eu/",
  },
  {
    name: "Geo GitHub",
    image: geo,
    alt: "Geo profile github",
    link: "https://github.com/geo-tp",
  },
];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      infoBoxIsOpen: true,
      rollButtonIsDisabled: false,
    };

    this.getRandomScreenshot();
  }

  async getRandomScreenshot() {
    if (this.state.rollButtonIsDisabled) {
      return;
    }

    this.setState({ rollButtonIsDisabled: true });
    let screenshot = await fetchRandomScreenshot();

    this.setState({
      screenshot: screenshot,
    });

    this.setState({ rollButtonIsDisabled: false });
  }

  handleCloseBoxClick() {
    this.setState({
      infoBoxIsOpen: false,
    });
  }

  render() {
    return (
      <main className="main-home-page main-container">
        <div className="main-home-informations">
          <HomeBanner screenshotNumber={this.state.screenshot?.total_number} />
          <HomeCards cards={cityCards} title="Explore cities screenshots" />)
          <RandomBox
            screenshot={this.state.screenshot}
            getRandomScreenshot={this.getRandomScreenshot}
            buttonIsDisabled={this.state.rollButtonIsDisabled}
          />
          <HomeCards cards={usefullCards} title="Related links" />
        </div>
      </main>
    );
  }
}

export default HomePage;
