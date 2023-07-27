import React from "react";
import { Checkbox } from "@mui/material";

const Styled_Checkbox = (props) => {
  return (
    <Checkbox
      {...props}
      sx={{
        color: "var(--text2)",
        "&.Mui-checked": {
          color: "var(--hoverSuccess)",
        },
      }}
    />
  );
};
export default Styled_Checkbox;
