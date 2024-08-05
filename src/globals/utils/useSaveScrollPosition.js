import React, { useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const ScrollMemory = () => {
  const history = useHistory();
  const location = useLocation();
  const scrollPositions = useRef({});

  console.log(scrollPositions, 'scrollPositions->')

  useEffect(() => {
    // Restore scroll position if it exists
    const key = location.key;
    if (scrollPositions.current[key]) {
      window.scrollTo(0, scrollPositions.current[key]);
    }

    // Listen for page leave and save scroll position
    const unlisten = history.listen((location, action) => {
      if (action === 'PUSH') {
        scrollPositions.current[key] = window.scrollY;
      }
    });

    return () => {
      unlisten();
    };
  }, [history, location]);

  return null;
};

export default ScrollMemory;