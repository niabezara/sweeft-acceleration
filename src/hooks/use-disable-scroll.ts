import { useEffect } from "react";

export const useDisableBodyScroll = (isOpen: boolean) => {
  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    const originalHeight = window.getComputedStyle(document.body).height;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
    };
  }, [isOpen]);
};
