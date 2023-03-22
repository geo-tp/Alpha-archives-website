import { ImageBackground } from "./components/ImageBackground";
import { InformationBox } from "./components/InformationBox";
import banner from "./assets/banner.webp";

export const HomeBanner = (props: { screenshotCount: number }) => {
  return (
    <div className="home-banner">
      <InformationBox screenshotCount={props.screenshotCount} />
      <ImageBackground
        img={banner}
        alt="Hyjal landscape representing an old broken structure with sun flare"
      />
    </div>
  );
};
