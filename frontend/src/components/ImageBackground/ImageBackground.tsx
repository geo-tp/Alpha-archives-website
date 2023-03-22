import bgScreen from "./assets/background.webp";

export const ImageBackground = () => {
  return (
    <img
      className="image-background"
      src={bgScreen}
      alt="A screenshot showing a big ocotupus"
    />
  );
};
