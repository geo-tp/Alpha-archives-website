import { useSelector } from "react-redux";
import { Loader } from "../../../../components/Loader";
import { FileType } from "../../../../types";
import { selectBrowser } from "../../store/selectors";
import { BrowserFile } from "../BrowserFile";

type BrowserBodyProps = {
  isLoading: boolean;
  handleMediaClick: Function;
};

export const BrowserBody = (props: BrowserBodyProps) => {
  const browserState = useSelector(selectBrowser);

  return (
    <div className="browser-body">
      {!props.isLoading &&
        browserState.files?.map((file: FileType) => (
          <BrowserFile
            key={`file-${file.filename}`}
            file={file}
            handleMediaClick={props.handleMediaClick}
          />
        ))}
      {browserState.files?.length === 0 && !props.isLoading && (
        <p className="browser-body__no-results"> "¯\_(ツ)_/¯" No results</p>
      )}
      {props.isLoading && <Loader />}
    </div>
  );
};
