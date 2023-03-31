import styled from "styled-components";
import {TextField} from "@mui/material";

const StyledTextFieldWhite = styled(TextField)`
    & input{
        -webkit-text-fill-color: var(--text1);
        color: var(--hoverSuccess);
        letter-spacing: 1px;
        font-family: cursive;
    }
    & input:-webkit-autofill,
    input:-webkit-autofill:focus { 
        -webkit-text-fill-color: var(--text1);
        transition: background-color 600000s 0s, green 600000s 0s;
    }
    & label {
        color:var(--borders) !important;
    } 
    fieldset {
        border-color: var(--text1) !important;
    } 
    & .Mui-disabled {
        color: var(--foreground) !important
    }
    & .Mui-disabled .MuiOutlinedInput-input {
        -webkit-text-fill-color: var(--foreground) !important;

    }

  & .Mui-error{
     color:var(--errorBorder) !important;
    & fieldset {border-color:var(--errorBorder) !important}
  }

  & svg {
    color: var(--borders);
  }
`;

export default StyledTextFieldWhite