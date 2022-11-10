import { Component } from "react";
import { useParams } from "react-router-dom";
import Browser from "../components/Browser";
import UploadScreen from "../assets/upload.png";
const BrowserPage = () => {
  const { folder } = useParams();
  return (
    <main class="footer-hidden">
      <img
        src={UploadScreen}
        alt="wow login screen"
        className="image-background-container"
      />
      <Browser folder={folder} />
    </main>
  );
};

export default BrowserPage;
