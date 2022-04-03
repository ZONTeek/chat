import { useEffect } from "react";

export const useBeforeUnload = (value: any) => {
  const handleBeforeUnload = (e: Event) => {
    let returnValue;
    if (typeof value === "function") {
      returnValue = value(e);
    } else {
      returnValue = value;
    }
    if (returnValue) {
      e.preventDefault();
    }
    return returnValue;
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    //eslint-disable-next-line
  }, []);
};
