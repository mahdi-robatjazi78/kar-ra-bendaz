
const SwitchStyles = {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: "#ccc",
        },
        colorSecondary: {
          "&$checked": {
            // Controls checked color for the thumb
            color: "#f2ff00",
          },
        },
        track: {
          // Controls default (unchecked) color for the track
          opacity: 0.2,
          backgroundColor: "#fff",
          "$checked$checked + &": {
            // Controls checked color for the track
            opacity: 0.7,
            backgroundColor: "#fff",
          },
        },
      },
    },
  };
  
  export default SwitchStyles;