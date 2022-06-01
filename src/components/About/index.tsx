import React, { useContext } from "react";
import ThemeContext from "../../context/colorModeContext";

const About = () => {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ color: theme.text1 }}>
      <h1>About Index</h1>
    </div>
  );
};

export default About;
