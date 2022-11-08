import { Component } from "react";
import { useParams } from "react-router-dom";
import Browser from "../components/Browser";

const BrowserPage = () => {
  const { folder } = useParams();
  return (
    <div>
      <Browser folder={folder} />
    </div>
  );
};

export default BrowserPage;
