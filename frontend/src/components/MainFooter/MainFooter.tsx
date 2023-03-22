import { useLocation } from "react-router-dom";
import { Logo } from "../Logo";

export const MainFooter = () => {
  const location = useLocation();

  return (
    <footer
      className={
        location.pathname === "/" ? "main-footer" : "main-footer--hidden"
      }
    >
      <Logo />
      <p>
        - Made by <a href="https://github.com/geo-tp">Geo </a> -{" "}
        {new Date().getFullYear()} Alpha Project Archive - Image assets
        copyright{" "}
        <a href="https://www.blizzard.com/en-us/legal/c1ae32ac-7ff9-4ac3-a03b-fc04b8697010/blizzard-legal-faq">
          Blizzard Entertainment, Inc.
        </a>
      </p>
    </footer>
  );
};
