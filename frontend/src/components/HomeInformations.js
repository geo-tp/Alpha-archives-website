import { Component } from "react";
import banner from "../assets/banner.webp";
import { Link } from "react-router-dom";
import { fetchRandomScreenshot } from "../api/fetchRandomScreenshot";
import wowIcon from "../assets/wow-icon-64.webp";
import { HomeCards } from "./HomeCards";

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

class HomeInformations extends Component {
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
      <div className="main-home-informations">
        <div className="main-home-informations__home-banner">
          <i className="main-home-informations__home-banner__angle fa fa-angle-down"></i>

          <div class="main-home-informations__home-banner__version">
            <img
              className="main-home-informations__home-banner__icon fa fa-image"
              src={wowIcon}
              alt="wow icon"
            />
            <span> version 0.x to beta 0.12 original screenshots</span>
          </div>
          <h1>Alpha Project Archive</h1>
          <h2>
            Browse World of Warcraft Beta & Alpha screenshots from 2000 to 2004
          </h2>

          <img
            className="main-home-informations__home-banner__cover"
            src={banner}
            alt="home banner"
          ></img>

          <div className="main-home-informations__home-banner__description-box">
            <p>
              <a href="https://github.com/The-Alpha-Project/alpha-core">
                Alpha Core
              </a>{" "}
              is an experimental Python emulator for the 0.5.3.3368 version of
              World of Warcraft.
            </p>
            <p>
              In order to build the contents of the emulator, hundreds of
              original alpha and beta screenshots have been found and archived.
            </p>
            <p>
              This website helps people interact with these screenshots that are{" "}
              <a href="https://github.com/The-Alpha-Project/Alpha-Project-Archive">
                stored on GitHub
              </a>{" "}
              without the need to use it.
            </p>
          </div>

          <div className="main-home-informations__button-box">
            <Link to="/upload/">
              <button className="button-base button-home">
                Upload screenshots
              </button>
            </Link>
            <Link to="/browse/">
              <button className="button-base button-home">
                Browse Archive
              </button>
            </Link>
          </div>

          <p className="main-home-informations__check-sentence">
            <i className="fa fa-check"></i>
            We have{" "}
            <b>
              {this.state.screenshot && this.state.screenshot.total_number}{" "}
              screenshots
            </b>
          </p>
        </div>
        <HomeCards cards={cityCards} title="Explore cities screenshots" />)
        {this.state.screenshot && (
          <div className="random-box">
            <div className="random-box__title">
              <h2>Random Screenshots</h2>
            </div>
            <img
              className="random-box__image"
              alt="random WoW screenshot"
              src={this.state.screenshot.image_raw}
            />
            <div className="random-box__roll-box">
              <p className="random-box__roll">
                You roll {this.state.screenshot.random_number} (1-
                {this.state.screenshot.total_number})
              </p>
              <button
                class="nav-button-base random-box__button"
                disabled={this.state.rollButtonIsDisabled}
                onClick={() => this.getRandomScreenshot()}
              >
                Roll
              </button>
            </div>
          </div>
        )}
        <HomeCards cards={usefullCards} title="Related links" />
      </div>
    );
  }
}

export default HomeInformations;
