import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

// customized styles of mui button
const CButton = styled(Button)`
  background-image: linear-gradient(144deg,var(--borders),#521cf7 40%,var(--background));
    color:white;
    width: 25%;
    height:2rem;
  & .submit-button-text{
    font-size:.7rem; 
    transition:all .5s ease;

    &:hover{
      font-size:.8rem;
      color:var(--hoverSuccess)
    }
  } 
  &:disabled{
    background: rgb(100 150 200 / 22%);
    width: 25%;
    border:1px solid gray;
    & .submit-button-text{
      color:var(--text1);
    }
  }
`;
export default CButton;
