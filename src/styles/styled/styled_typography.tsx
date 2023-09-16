import React from "react";
import { Typography } from "@mui/material";

export default function Text(props: any) {
  const { onlyWhite , inline , success , error , center } = props;

  

  return (
    <Typography
      {...props}
      style={{
        display:`${inline ? "inline" : "block"}`,
      }}
      sx={{
        textAlign:`${center ? "center"  :"left"}`,
        color: `${onlyWhite ? "white" : success ? "var(--hoverSuccess)"  : error ? "var(--errorBorder)" : "var(--text1)"}`,
        userSelect: props?.selectable ? "text" : "none",
        fontFamily: props?.fontFamily ? props.fontFamily : "Space Grotesk , Kalameh" ,
      }}
    >
      {props.children}
    </Typography>
  );
}
