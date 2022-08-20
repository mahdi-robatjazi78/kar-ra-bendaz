import React from "react";
import { Typography } from "@mui/material";
import "./emptylist.css";

const EmptyListAnimation = ({ text }) => {
  return (
    <Typography color="red" fontSize="3rem" className="jt">
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
