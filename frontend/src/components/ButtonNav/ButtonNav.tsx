import { NavLink } from "react-router-dom";

type ButtonNavProps = {
  title: string;
  label: string;
  ariaLabel: string;
  to: string;
  icon: string;
  colored: boolean;
};

export const ButtonNav = (props: ButtonNavProps) => {
  return (
    <NavLink
      title={props.title}
      aria-label={props.ariaLabel}
      className={
        props.colored ? "button-nav button-nav--colored" : "button-nav"
      }
      to={props.to}
    >
      <i className={`fa fa-${props.icon}`}></i>
      {props.label}
    </NavLink>
  );
};
