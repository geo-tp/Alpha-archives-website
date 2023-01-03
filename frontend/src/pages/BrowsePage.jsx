import { useParams } from "react-router-dom";
import Browser from "../components/Browser";
import bgScreen from "../assets/background.webp";
const BrowserPage = () => {
  const { folder } = useParams();
  return (
    <main className="footer-hidden main-overflow">
      <img
        src={bgScreen}
        alt="wow login screen"
        className="image-background-container"
      />
      <Browser folder={folder} />
    </main>
  );
};

export default BrowserPage;
