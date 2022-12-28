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


  
  &:disabled{
    background-image:linear-gradient(144deg , gray , gray);
    // background-color:gray;
    border:1px solid gray;
    color:black;
  }

`;
export default CButton;
