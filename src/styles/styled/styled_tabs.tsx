import React from "react";
import styled from "@emotion/styled";
import { Tabs } from "@mui/material";

const Styled_Tabs = styled(Tabs)`
  & .MuiTab-root {
    padding: 4px 1rem;
    text-transform: capitalize;
    min-height: 30px;
    color: #e1e1e1;
    font-size: 1rem;
    margin: 0.5rem 0.5rem;
    filter: brightness(0.5);
    font-family:"Changa";
    font-weight: 400; 
  }

  & .Mui-selected {
    color: ${(props:any) =>
      props.isDarkMode ? "var(--borders)!important" : "var(--header) !important"};
    border: ${(props:any) =>
      props.isDarkMode ? "2px solid var(--borders)" : "2px solid var(--header)"};
    border-radius: 0 0 10px 10px;
    font-size: 1rem;
    border-top: none;
    padding: 4px 14px;
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
  const { backLight = false  , isDarkMode} = props;
  return (
    <Styled_Tabs {...props} backLight={backLight} isDarkMode={isDarkMode}>
      {props.children}
    </Styled_Tabs>
  );
}
