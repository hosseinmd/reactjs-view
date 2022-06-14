import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    if (typeof document === "undefined") return;

    document.title = title;
  }, [title]);
};
