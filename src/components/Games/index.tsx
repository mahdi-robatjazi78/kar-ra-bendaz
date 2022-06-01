import React, { useContext } from "react";
import ThemeContext from "../../context/colorModeContext";

const Games = () => {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ color: theme.text1 }}>
      <h1>Games Index</h1>
    </div>
  );
};

export default Games;
