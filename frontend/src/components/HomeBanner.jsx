import wowIcon from "../assets/wow-icon-64.webp";
// import banner from "../assets/banner.webp";
// import banner2 from "../assets/banner2.webp";
// import banner3 from "../assets/banner3.webp";
import banner4 from "../assets/banner4.webp";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";

export const HomeBanner = ({ screenshotNumber = null }) => {
  // const backgrounds = [banner, banner2, banner3, banner4];
  // const [backgroundIndex, setBackgroundIndex] = useState(0);
  // const [actualBackground, setActualBackground] = useState(backgrounds[0]);

  // useEffect(() => {
  // setInterval(changeBackground, 6000);
  // }, []);

  // const changeBackground = async () => {
  //   console.log("CHANGEBG");
  //   let newIndex = backgroundIndex + 1;

  //   if (newIndex >= backgrounds.length) {
  //     newIndex = 0;
  //   }

  //   setBackgroundIndex(newIndex);
  //   console.log(newIndex);
  //   setActualBackground(backgrounds[newIndex]);
  // };

  return (
    <div className="home-banner">
      <i className="home-banner__angle fa fa-angle-down"></i>

      <div class="home-banner__version">
        <img
          className="home-banner__icon fa fa-image"
          src={wowIcon}
          alt="wow icon"
        />
        <span> version 0.x to beta 0.12 original screenshots</span>
      </div>
      <h1>Alpha Project Archive</h1>
      <h2>
        Browse World of Warcraft Beta & Alpha screenshots from 2000 to 2004
      </h2>

      <img className="home-banner__cover" src={banner4} alt="home banner"></img>

      <div className="home-banner__description-box">
        <p>
          <a href="https://github.com/The-Alpha-Project/alpha-core">
            Alpha Core
          </a>{" "}
          is an experimental Python emulator for the 0.5.3.3368 version of World
          of Warcraft.
        </p>
        <p>
          In order to build the contents of the emulator, hundreds of original
          alpha and beta screenshots have been found and archived.
        </p>
        <p>
          This website helps people interact with these screenshots that are{" "}
          <a href="https://github.com/The-Alpha-Project/Alpha-Project-Archive">
            stored on GitHub
          </a>{" "}
          without the need to use it.
        </p>
      </div>

      <div className="home-banner__button-box">
        <Link to="/upload/">
          <button className="button-base button-home">
            Upload screenshots
          </button>
        </Link>
        <Link to="/browse/">
          <button className="button-base button-home">Browse Archive</button>
        </Link>
      </div>

      <p className="home-banner__check-sentence">
        <i className="fa fa-check"></i>
        We have{" "}
        <b>{screenshotNumber ? screenshotNumber : "18000"} screenshots</b>
      </p>
    </div>
  );
};

HomeBanner.propTypes = {
  screenshotNumber: PropTypes.bool.isRequired,
};
