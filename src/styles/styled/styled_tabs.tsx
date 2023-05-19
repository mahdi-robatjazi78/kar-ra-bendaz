import React from "react";
import styled from "@emotion/styled";
import { Tabs } from "@mui/material";

const Styled_Tabs = styled(Tabs)`
  & .MuiTab-root {
    padding: 4px 1rem;
    text-transform: capitalize;
    min-height: 30px;
    color: var(--text1) !important;
    font-size: 0.8rem;
    margin: 0.5rem 0.5rem;
    filter: brightness(0.5);
  }

  & .Mui-selected {
    color: var(--borders) !important;
    border-radius: 0 0 10px 10px;
    border: 2px solid var(--borders);
    font-size: 0.8rem;
    border-top: none;
    padding: 4px 8px;
    text-transform: capitalize;
    min-height: 30px;
    filter: brightness(1);
    margin: 0.5rem 0.5rem;
  }
  & .MuiTabs-indicator {
    display: none !important;
  }
`;

export default function StyledTabs(props: any) {
  return <Styled_Tabs {...props}>{props.children}</Styled_Tabs>;
}
