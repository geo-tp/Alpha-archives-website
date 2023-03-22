import { CardForm } from "../../../../components/CardForm";

export const CardHelp = () => {
  return (
    <CardForm title="Help" icon="info">
      <p className="card-form__infos">
        For questions, you can contact Geo or Grender on{" "}
        <a href="https://discord.gg/RzBMAKU">Discord</a>. For bugs report,
        please post your issue here :{" "}
        <a href="https://github.com/geo-tp/Alpha-archives-website/issues">
          Github project of this website
        </a>
      </p>
      <p className="card-form__infos">
        You can only use alpha numeric characters for tag creation, specials
        characters are not allowed. Here is the list of non alpha numeric char
        accepted : space, underscore and minus.
      </p>
      <p className="card-form__infos">
        <a href="/upload">Upload page</a> filters screenshots to avoid 100%
        exact duplicates. A screenshot with a small difference (watermark for
        example) will be accepted even if it's already into archive. You can
        check in depth with software like
        <a href="https://www.digikam.org/"> DigiKam (Linux)</a> or{" "}
        <a href="https://github.com/ermig1979/AntiDupl">Antidupl (Windows)</a>
      </p>
    </CardForm>
  );
};
