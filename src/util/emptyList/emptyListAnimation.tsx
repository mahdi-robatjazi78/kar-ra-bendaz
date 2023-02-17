import React from "react";
import { Typography } from "@mui/material";
import "./emptylist.css";

const EmptyListAnimation = ({ text , fontSize="3rem" }) => {
  return (
    <Typography color="red" fontSize={fontSize} className="jt">
      <span className="jt__row">
        <span className="jt__text">{text}</span>
      </span>
      <span className="jt__row jt__row--sibling" aria-hidden="true">
        <span className="jt__text">{text}</span>
      </span>
      <span className="jt__row jt__row--sibling" aria-hidden="true">
        <span className="jt__text">{text}</span>
      </span>
      <span className="jt__row jt__row--sibling" aria-hidden="true">
        <span className="jt__text">{text}</span>
      </span>
    </Typography>
  );
};

export default EmptyListAnimation;
