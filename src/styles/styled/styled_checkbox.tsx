import React, { useContext } from "react";
import { Checkbox } from "@mui/material";
import ThemeContext from "@/context/themeContext";

const Styled_Checkbox = (props) => {

  const theme = useContext(ThemeContext)


  return (
    <Checkbox
      {...props}
      sx={{
        color:theme.isDarkMode ? "var(--text2)" : "var(--header)",
        "&.Mui-checked": {
          color: "var(--hoverSuccess)",
        },
      }}
    />
  );
};
export default Styled_Checkbox;
