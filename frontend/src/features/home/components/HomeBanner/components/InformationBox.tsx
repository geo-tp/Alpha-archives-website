import { Link } from "react-router-dom";
import { ButtonBase } from "../../../../../components/ButtonBase";
import wowIcon from "../assets/wow-icon-64.webp";

export const InformationBox = (props: { screenshotCount: number }) => {
  return (
    <div className="home-banner__information-box">
      <i className="home-banner__information-box__angle fa fa-angle-down"></i>
      <div className="home-banner__information-box__version">
        <img src={wowIcon} alt="wow icon" />
        <span> version 0.x to beta 0.12 original screenshots</span>
      </div>
      <h1>Alpha Project Archive</h1>
      <h2>Browse World of Warcraft Alpha & Beta screenshots</h2>
      <div className="home-banner__information-box__description">
        <p>
          <a href="https://github.com/The-Alpha-Project/alpha-core">
            Alpha Core{" "}
          </a>
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
            {" "}
            stored on GitHub{" "}
          </a>
          without the need to use it.
        </p>
      </div>
      <div className="home-banner__information-box__buttons-box">
        <Link to="/upload/">
          <ButtonBase
            label="Upload screenshots"
            isLoading={false}
            color="primary"
          />
        </Link>
        <Link to="/browse/">
          <ButtonBase
            label="Browse archive"
            isLoading={false}
            color="primary"
          />
        </Link>
      </div>

      <p className="home-banner__information-box__check-sentence">
        <i className="fa fa-check"></i>
        We have <b>{props.screenshotCount} screenshots</b>
      </p>
    </div>
  );
};
