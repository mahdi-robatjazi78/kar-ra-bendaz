import React from "react";
import { Typography } from "@mui/material";

export default function Text(props:any) {
  return (
    <Typography
      {...props}
      sx={{ color: "var(--text1)", userSelect: props?.selectable ? "text" : "none" }}
    >
      {props.children}
    </Typography>
  );
}
