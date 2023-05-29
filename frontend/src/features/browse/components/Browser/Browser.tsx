import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTags } from "../../../../api/getTags";
import { ImageBackground } from "../../../../components/ImageBackground";
import { FileType } from "../../../../types";
import { getFiles } from "../../api/getFiles";
import {
  setCurrentPath,
  setLightboxIsOpen,
  setSelectedMedia,
} from "../../store/actions";
import { selectBrowser } from "../../store/selectors";
import { BrowserBody } from "../BrowserBody";
import { BrowserHeader } from "../BrowserHeader/BrowserHeader";
import { Lightbox } from "../Lightbox/Lightbox";

export const Browser = () => {
  const dispatch = useDispatch();
  const browserState = useSelector(selectBrowser);

  const { folder } = useParams();

  const tags = useQuery("tags", getTags);
  const filesMutation = useMutation((folderName: string) =>
    getFiles(folderName)
  );

  // Fetch files at first render
  useEffect(() => {
    filesMutation.mutate(folder ? folder : "root");
    dispatch(setCurrentPath(folder ? [folder] : ["root"]));
    dispatch(setLightboxIsOpen(false));
  }, [dispatch]);

  const goHomeDirectory = () => {
    filesMutation.mutate("root");
    dispatch(setCurrentPath(["root"]));
  };

  const goBackDirectory = () => {
    const dir = browserState.currentPath;

    var parent: string | undefined = "";
    parent = dir[dir.length - 2];
    var newPath = dir.slice(0, -1);

    if (parent === undefined) {
      parent = "root";
    }

    filesMutation.mutate(parent);
    dispatch(setCurrentPath(newPath.length ? newPath : [parent]));
  };

  const handleMediaClick = (file: FileType) => {
    if (file.is_folder) {
      filesMutation.mutate(file.filename);
      dispatch(setCurrentPath([...browserState.currentPath, file.filename]));
    } else {
      dispatch(setSelectedMedia(file));
      dispatch(setLightboxIsOpen(true));
    }
  };

  return (
    <div className="browser">
      <ImageBackground />
      <div className="browser__frame">
        <BrowserHeader
          goBackDirectory={goBackDirectory}
          goHomeDirectory={goHomeDirectory}
          tags={tags.data?.body}
        />
        <BrowserBody
          isLoading={filesMutation.isLoading}
          handleMediaClick={handleMediaClick}
        />
        {browserState.isLightboxOpen && <Lightbox />}
      </div>
    </div>
  );
};
