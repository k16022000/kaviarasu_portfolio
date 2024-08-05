import { useEffect } from 'react';


export default function useScrollToTopOnMount() {
  const tab = window.localStorage.getItem('activeTab');
  useEffect(() => {
    if (!tab) {
      const root = document.getElementById("root");
      root.scrollIntoView({ behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}