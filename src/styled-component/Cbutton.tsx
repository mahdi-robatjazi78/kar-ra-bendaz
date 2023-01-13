import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

// customized styles of mui button
const CButton = styled(Button)`
  background-image: linear-gradient(
    144deg,
    var(--borders),
    #521cf7 40%,
    var(--background)
    );
  color:var(--text1);
  width: 25%;


  
  &:disabled{

    background: rgb(100 150 200 / 22%);
    width: 25%;
    border:1px solid gray;
  }

`;
export default CButton;
