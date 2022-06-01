import React, { useContext } from "react";
import ThemeContext from "../../context/colorModeContext";

const Calender = () => {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ color: theme.text1 }}>
      <h1>Calender Index</h1>
    </div>
  );
};

export default Calender;
