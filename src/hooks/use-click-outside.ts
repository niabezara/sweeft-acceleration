import { RefObject, useEffect, useCallback } from "react";

function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  handler: (event: Event) => void
) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    },
    [ref, handler]
  );

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handler(event);
      }
    },
    [handler]
  );

  useEffect(() => {
    const handleClick = (event: MouseEvent) => handleClickOutside(event);
    const handleKey = (event: KeyboardEvent) => handleEscapeKey(event);

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [handleClickOutside, handleEscapeKey]);

  return handleClickOutside;
}

export default useOnClickOutside;
