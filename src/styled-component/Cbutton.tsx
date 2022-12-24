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
  color: white;
  &:disabled{
    background-image: linear-gradient(
      144deg,
     #d1d1d1,
      #d1d1d1 40%,
      #d1d1d1
    );
    border:1px solid gray;
  }

`;
export default CButton;
