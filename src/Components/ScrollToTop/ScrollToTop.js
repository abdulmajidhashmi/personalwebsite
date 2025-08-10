import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Detect navigation type
    const navEntries = performance.getEntriesByType("navigation");
    const navigationType = navEntries.length > 0 ? navEntries[0].type : "navigate";

    if (navigationType === "back_forward") {
      // Browser will handle restoring scroll automatically
      return;
    }

    // Forward navigation → scroll to top
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  return null;
};

export default ScrollManager;
