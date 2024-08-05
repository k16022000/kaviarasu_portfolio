import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useRestoreScrollPosition = () => {
  const location = useLocation();

  useEffect(() => {
    const restorePosition = () => {
      const savedPosition = JSON.parse(sessionStorage.getItem(location.pathname));
      if (savedPosition) {
        window.scrollTo(savedPosition.x, savedPosition.y);
      }
    };

    window.history.scrollRestoration = 'manual';

    // Restore scroll position after a short delay to ensure content is loaded
    const timeoutId = setTimeout(restorePosition, 100);

    return () => {
      clearTimeout(timeoutId);
      window.history.scrollRestoration = 'auto';
    };
  }, [location]);
};

export default useRestoreScrollPosition;
