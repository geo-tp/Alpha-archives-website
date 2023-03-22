import { Link } from "react-router-dom";
import { ButtonNav } from "../ButtonNav";
import { Logo } from "../Logo";

export const MainHeader = () => {
  return (
    <header className="main-header">
      <div className="main-header__logo-box">
        <Link
          title="Go to Homepage"
          aria-label="Go to Homepage"
          className="main-header__logo-link"
          to="/"
        >
          <Logo />
        </Link>
      </div>

      <nav className="main-header__button-box">
        <ButtonNav
          title="Upload pre release screenshots"
          ariaLabel="Upload pre release screenshots"
          to="/upload/"
          label="Upload"
          icon="upload"
          colored={false}
        />
        <ButtonNav
          to="/browse/"
          title="Browse pre release screenshots"
          ariaLabel="Browse pre release screenshots"
          label="Browse"
          icon="image"
          colored={false}
        />

        <ButtonNav
          to="/login/"
          title="Login or profile page"
          ariaLabel="Login or profile page"
          label=""
          icon="user"
          colored={true}
        />
      </nav>
    </header>
  );
};
