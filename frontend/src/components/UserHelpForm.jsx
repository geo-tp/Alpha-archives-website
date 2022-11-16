import { Link } from "react-router-dom";

export const UserHelpForm = ({}) => {
  return (
    <div className="profile__box">
      <h2>
        Help <i className="fa fa-info"></i>
      </h2>
      <p className="profile__infos">
        For questions, you can contact Geo or Grender on{" "}
        <a href="https://discord.gg/RzBMAKU">Discord</a>. For bugs report,
        please post your issue here :{" "}
        <a href="https://github.com/geo-tp/Alpha-archives-website/issues">
          Github project of this website
        </a>
      </p>
      <p className="profile__infos">
        You can only use alpha numeric characters for tag creation, specials
        characters are not allowed. Here is the list of non alpha numeric char
        accepted : space, underscore and minus.
      </p>
      <p className="profile__infos">
        <Link to="/upload">Upload page</Link> filters screenshots to avoid 100%
        exact duplicates. A screenshot with a small difference (watermark for
        example) will be accepted even if it's already into archive. You can
        check in depth with software like
        <a href="https://www.digikam.org/"> DigiKam (Linux)</a> or{" "}
        <a href="https://github.com/ermig1979/AntiDupl">Antidupl (Windows)</a>
      </p>
    </div>
  );
};
