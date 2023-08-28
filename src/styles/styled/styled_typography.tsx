import React from "react";
import { Typography } from "@mui/material";

export default function Text(props: any) {
  const { onlyWhite } = props;

  return (
    <Typography
      {...props}
      sx={{
        color: `${onlyWhite ? "white" : "var(--text1)"}`,
        userSelect: props?.selectable ? "text" : "none",
        fontFamily: props?.fontFamily ? props.fontFamily :  "Space Grotesk",
      }}
    >
      {props.children}
    </Typography>
  );
}
