import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * ScrollMemoryRouter Component
 * 
 * This component manages scroll positions:
 * - Remembers scroll position when navigating BACK
 * - Scrolls to top when navigating FORWARD or replacing routes
 * 
 * Wrap your routes with this component or use the hook in your layout
 */

// Custom hook for scroll restoration
export const useScrollMemory = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef({});

  useEffect(() => {
    const currentPath = location.pathname + location.search;

    if (navigationType === 'POP') {
      // Going backward - restore saved position
      const savedPosition = scrollPositions.current[currentPath];
      if (savedPosition !== undefined) {
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
          window.scrollTo(0, savedPosition);
        }, 0);
      }
    } else {
      // Going forward or replacing - scroll to top
      window.scrollTo(0, 0);
    }

    // Save scroll position before leaving
    const handleScroll = () => {
      scrollPositions.current[currentPath] = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Save final position when unmounting
      scrollPositions.current[currentPath] = window.scrollY;
    };
  }, [location, navigationType]);
};

// Component wrapper version
const ScrollMemoryRouter = ({ children }) => {
  useScrollMemory();
  return <>{children}</>;
};

export default ScrollMemoryRouter;