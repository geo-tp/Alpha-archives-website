import { FormEvent } from "react";
import { useMutation } from "react-query";
import { getLoggedOut } from "../../../../api/getLoggedOut";
import { CardAccountCreation } from "../CardAccountCreation";
import { CardHelp } from "../CardHelp";
import { CardPassword } from "../CardPassword";
import { CardProfile } from "../CardProfile";
import { CardTag } from "../CardTag";

export const Dashboard = () => {
  const logout = useMutation(() => getLoggedOut());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    logout.mutate();
  };

  return (
    <div className="dashboard">
      <div className="dashboard__title">
        <h1>
          <i className="fa fa-user"></i> Dashboard
          <form onSubmit={(e) => handleSubmit(e)}>
            <button className="profile__disconnect" type="submit">
              Logout
            </button>
          </form>
        </h1>
      </div>
      <div className="dashboard__cards">
        <CardProfile />
        <CardPassword />
        <CardTag />
        <CardAccountCreation />
        <CardHelp />
      </div>
    </div>
  );
};
