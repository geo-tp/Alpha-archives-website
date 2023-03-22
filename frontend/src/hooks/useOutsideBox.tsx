import { useEffect } from "react";

export function useOutsideBox(ref: any, setState: Function) {
  useEffect(() => {
    /**
     * if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (!ref?.current) {
        return;
      }

      if (ref.current && !ref.current.contains(event.target)) {
        setState(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setState]);
}
