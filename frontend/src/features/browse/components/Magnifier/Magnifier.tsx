import { useState } from "react";

export const Magnifier = (props: { image: string }) => {
  const [startDragX, setStartDragX] = useState(0);
  const [startDragY, setStartDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [started, setStarted] = useState(false);

  const [imagePosX, setImagePosX] = useState("0px");
  const [imagePosY, setImagePosY] = useState("0px");
  const [imageOriginalWidth, setImageOriginalWidth] = useState("0px");
  const [imageOriginalHeight, setImageOriginalHeight] = useState("0px");

  const [imageWidth, setImageWidth] = useState(window.screen.width / 2 + "px");
  const [imageHeight, setImageHeight] = useState(
    window.screen.height / 2 + "px"
  );
  const [magnification, setMagnification] = useState(1);
  const zoomFactor = 1.1;

  function initialiseImage(e: any) {
    var imageW = e.target.width;
    var imageH = e.target.height;
    var screenW = window.innerWidth;
    var screenH = window.innerHeight;

    var imageTop = (screenH - imageH) / 2;
    var imageLeft = (screenW - imageW) / 2;

    // Initialise image to be centered and use default rendered width
    setImageWidth(imageW);
    setImageHeight(imageH);
    setImageOriginalWidth(parseInt(imageW) / magnification + "px");
    setImageOriginalHeight(parseInt(imageH) / magnification + "px");
    setImagePosX(imageLeft + "px");
    setImagePosY(imageTop - 20 + "px");
    setStarted(true);
  }

  function onMouseMove(e: any) {
    e.preventDefault();

    if (!dragging) return;

    // if button is now up they must have released it outside the container
    if (e.buttons === 0) {
      onMouseUp(e);
      return;
    }

    var offsetX = e.clientX;
    var offsetY = e.clientY;

    // difference between where we started and where we are now
    var imgPosX = parseInt(imagePosX);
    var imgPosY = parseInt(imagePosY);
    var diffX = startDragX - offsetX + imgPosX;
    var diffY = startDragY - offsetY + imgPosY;

    // move it by the difference between where we started and where we are now
    setImagePosX(imgPosX - diffX + "px");
    setImagePosY(imgPosY - diffY + "px");
  }

  // mouse down (start of drag) - remember starting point
  function onMouseDown(e: any) {
    e.preventDefault();
    var offsetX = e.clientX;
    var offsetY = e.clientY;

    setStartDragX(offsetX - parseInt(imagePosX));
    setStartDragY(offsetY - parseInt(imagePosY));
    setDragging(true);
    const target = e.target as HTMLElement;
    target.style.cursor = "grabbing";
  }

  // mouse up (end of drag)
  function onMouseUp(e: any) {
    setDragging(false);
    const target = e.target as HTMLElement;
    target.style.cursor = "unset";
  }

  function onMouseWheel(e: any) {
    e.preventDefault();

    var offsetX = e.clientX - parseInt(imagePosX);
    var offsetY = e.clientY - parseInt(imagePosY);

    // how far through image is mouse assuming no magnification
    // (image may start offscreen)
    var mouseX = offsetX / magnification;
    var mouseY = offsetY / magnification;

    // how far cursor is through container
    var cursorX = offsetX + parseInt(imagePosX);
    var cursorY = offsetY + parseInt(imagePosY);

    let newMagnification = magnification;
    // newMagnification *= e.deltaY > 0 ? 1 / zoomFactor : zoomFactor;
    newMagnification *= e.deltaY > 0 ? 1 / zoomFactor : zoomFactor;

    // constrain to 0.5 to 60 magnification
    newMagnification = Math.min(newMagnification, 60);
    newMagnification = Math.max(newMagnification, 1);

    // adjust image size
    setImageWidth(parseInt(imageOriginalWidth) * newMagnification + "px");
    setImageHeight(parseInt(imageOriginalHeight) * newMagnification + "px");

    // move image so that the place under the cursor is still under it
    setImagePosX(-mouseX * newMagnification + cursorX + "px");
    setImagePosY(-mouseY * newMagnification + cursorY + "px");
    setMagnification(newMagnification);
  }

  return (
    <div
      className="main-image-box__image-container"
      onMouseDown={(e) => onMouseDown(e)}
      onMouseUp={(e) => onMouseUp(e)}
      onMouseMove={(e) => onMouseMove(e)}
      onWheel={(e) => onMouseWheel(e)}
    >
      <img
        style={
          started
            ? {
                width: imageWidth,
                height: imageHeight,
                top: imagePosY,
                left: imagePosX,
                maxHeight: "unset",
                maxWidth: "unset",
                position: "absolute",
              }
            : {}
        }
        onLoad={(e) => initialiseImage(e)}
        title="☟  Zoom & Pan ☟ "
        src={props.image}
        alt="selected screenshot"
      />
    </div>
  );
};
