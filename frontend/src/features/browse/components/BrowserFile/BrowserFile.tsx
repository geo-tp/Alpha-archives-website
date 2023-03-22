import { MediaType } from "../../../../types";

// Icon for file with no thumbnails
import divers from "./assets/divers.png";
import folder from "./assets/folder.png";

type BrowserFileProps = {
  file: MediaType;
  handleMediaClick: Function;
};

export const BrowserFile = (props: BrowserFileProps) => {
  const handleClick = () => {
    props.handleMediaClick(props.file);
  };

  const getIcon = () => {
    if (props.file.is_folder) {
      return folder;
    }

    let splittedName = props.file.filename.split(".");
    let ext = splittedName.pop()?.toLowerCase();

    switch (ext) {
      case "gif":
      case "jpg":
      case "png":
      case "bmp":
      case "jpeg":
        return props.file.image_thumbnail;

      default:
        return divers;
    }
  };

  return (
    <div className="browser-file" onClick={() => handleClick()}>
      <img src={getIcon() || undefined} alt="thumbnail" loading="lazy" />
      <p>{props.file.filename}</p>
    </div>
  );
};
