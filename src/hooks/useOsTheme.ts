import React, { useState, useEffect } from 'react';

// Custom hook that encapsulates the prefers-color-scheme listener logic
function usePrefersColorScheme() {
  const [colorScheme, setColorScheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');


    const colorSchemeListener = (event) => {
      setColorScheme(event.matches ? 'dark' : 'light');
    };

    // Attach the color scheme listener
    mediaQuery.addListener(colorSchemeListener);

    // Detach the color scheme listener when the component unmounts
    return () => {
      mediaQuery.removeListener(colorSchemeListener);
    };
  }, []);

  return colorScheme;
}

export default usePrefersColorScheme