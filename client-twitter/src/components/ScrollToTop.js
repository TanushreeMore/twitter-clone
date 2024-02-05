import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  // Get the current pathname from the location object
  const { pathname } = useLocation();

  // Scroll to the top of the window when the pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
