import logo from "../assets/logo.png";

export const Footer = () => {
  return (
    <div className="footer">
      <img src={logo} alt="logo" />
      <p>
        - Made by <a href="https://github.com/geo-tp">Geo </a> -{" "}
        {new Date().getFullYear()} Alpha Project Archive Website - Image assets
        copyright{" "}
        <a href="https://www.blizzard.com/en-us/legal/c1ae32ac-7ff9-4ac3-a03b-fc04b8697010/blizzard-legal-faq">
          Blizzard Entertainment, Inc.
        </a>
      </p>
    </div>
  );
};
