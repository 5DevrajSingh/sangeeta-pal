import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        const section = document.getElementById(
          decodeURIComponent(hash.slice(1))
        );

        section?.scrollIntoView({ block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}