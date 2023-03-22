export const ImageBackground = (props: { img: string; alt: string }) => {
  return (
    <img
      className="home-banner__image-background"
      src={props.img}
      alt={props.alt}
    ></img>
  );
};
