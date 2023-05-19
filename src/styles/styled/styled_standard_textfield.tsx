import * as React from "react";
import { alpha, styled } from "@mui/material/styles";

import TextField from "@mui/material/TextField";

const CssTextField = styled(TextField)({
  "& input": {
    "-webkit-text-fill-color":
      '${(props: any) =>props.lighter ? "white" : "var(--text1)"}',
    "caret-color": "var(--text2)",
    color: "var(--text1)",
    "letter-spacing": "2px",
    "font-family": "system-ui monospace cursive",
  },
  "& input:-webkit-autofill, input:-webkit-autofill:focus": {
    "-webkit-text-fill-color":
      '${(props: any) =>props.lighter ? "var(--text2)" : "white"}',
    background: "none !important",
    "font-size": "1.2rem",
    transition: "background-color 600000s 0s, green 600000s 0s",
  },
  "& label": {
    color: "var(--disabled)",
  },
  "& label.Mui-focused": {
    color: "var(--borders)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--borders )",
  },
});

export default function Styled_Standard_Textfield(props) {
  return <CssTextField {...props} />;
}
