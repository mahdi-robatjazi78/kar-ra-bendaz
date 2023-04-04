import React from "react";
import { Menu, MenuItem } from "@mui/material";

const Styled_Menu = (props) => {
  return (
    <Menu
      {...props}
      PaperProps={{
        elevation: 0,
        sx: {
          background: "var(--background)",
          border: "2px solid var(--borders)",
          "& ul": {
            padding: 0,
          },
        },
      }}
    >
      {props.children}
    </Menu>
  );
};

const Styled_Menu_Item = (props) => {
  return (
    <MenuItem
      {...props}
      sx={{
        ":hover": {
          background: "var(--text3)",
          "& a": { color: "var(--background)" },
          "& .logout": { color: "var(--backgorund) !important" },
        },
        width: "15rem",
        display: "block",
        padding: ".8rem 1.2rem",
        "& a": { color: "var(--text1)" },
        "& .logout": { color: "var(--text1)" },
      }}
    ></MenuItem>
  );
};

export { Styled_Menu, Styled_Menu_Item };
