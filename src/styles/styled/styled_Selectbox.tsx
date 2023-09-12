import React, { useContext } from "react";
import styled from "styled-components";
import { Select } from "@mui/material";
import ThemeContext from "@/context/themeContext";

const StyledSelectWhiteComponent = (props) => {
  const StyledSelectWhite = styled(Select)`
    & .MuiSelect-select {
      color: var(--text1);
    }
    & fieldset {
      border-color: var(--text1) !important;
    }
    & svg {
      color: var(--borders);
    }
  `;

  const theme = useContext(ThemeContext);

  return (
    <StyledSelectWhite
      {...props}
      MenuProps={{
        sx: {
          "& .MuiMenu-paper": {
            background: `${theme.background}`,
            border: `1px solid ${theme.borders}`,
            color: theme.text1,
            borderRadius: "10px",
            "& .Mui-selected": {
              border: `1px solid ${theme.borders}`,
              backgroundColor: theme.header,
              color: "white",
              borderRadius: "12px",
              margin: "3px 3px",
              "& .MuiMenuItem-root:hover": {
                backgroundColor: theme.header,
                color: theme.text1,
              },
            },
          },
        },
      }}
    >
      {props.children}
    </StyledSelectWhite>
  );
};

export default StyledSelectWhiteComponent;
