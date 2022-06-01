import React, { useContext, useRef, useEffect } from "react";
import ThemeContext from "../../context/colorModeContext";
import Input from "./input";


const Todos = () => {
  const theme = useContext(ThemeContext);
 

  return (
    <div style={{ color: theme.text1 }} className="board">
      <h1>Todos Index</h1>
      <Input />
    </div>
  );
};

export default Todos;
