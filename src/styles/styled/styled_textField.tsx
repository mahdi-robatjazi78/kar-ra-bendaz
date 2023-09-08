import styled from "styled-components";
import { TextField } from "@mui/material";

const StyledTextFieldWhite = styled(TextField)`
  & input {
    -webkit-text-fill-color: ${(props: any) =>
      props.lighter ? "white" : "var(--text1)"};
    caret-color:var(--text2);  
    letter-spacing: 2px;
    font-family: "Space Grotesk";
    text-align:center;
  } 
  
  & input:-webkit-autofill,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: ${(props: any) =>
      props.lighter ? "var(--text2)" : "white"};
    background:"none !important";
    font-size:1.2rem;
    transition: background-color 600000s 0s, green 600000s 0s;
  }
  & label {
    color:${(props: any) =>
      props.valid ? 'var(--hoverSuccess) !important' :props.lighter ? "var(--text2) !important" : "#868686 !important"};
    padding-right: 6px; 
    font-family:Changa;
  }
  
  fieldset {
    border-color: ${(props: any) =>
      props.valid ? 'var(--hoverSuccess) !important' : props.lighter ? "var(--text2) !important" : "var(--text1) !important"};
  }
  & .Mui-disabled {
    color: var(--disabled) !important;
  }
  & .Mui-disabled .MuiOutlinedInput-input {
    -webkit-text-fill-color: var(--disabled) !important;
  }

  & .Mui-error {
    color: var(--errorBorder) !important;
    & fieldset {
      border-color: var(--errorBorder) !important;
    }
  }

  & svg {
    color: ${(props: any) => (props.lighter ? "var(--text2)" : "var(--text2)")};
  };

`;

export default StyledTextFieldWhite;
