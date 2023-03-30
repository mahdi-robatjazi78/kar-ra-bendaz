import styled from "styled-components";
import { Button } from "@mui/material";


const StyledButton = styled(Button)`
  align-items: center;
  background-color: none; 
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: var(--text3) !important;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  margin: 0;
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  border-color:var(--text3) !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  text-transform:capitalize;
 

  &:hover
  &:focus{
  }
  &:hover{
    transform: translateY(-2px);
    background-color:var(--sidebar) !important;
    border-color:var(--borders) !important;


  }
  &:active{
    background-color:var(--header);
    color:white ;
    border-color:var(--borders);

    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    transform: translateY(0);
  }

  &:disabled{
    filter:brightness(.4);
    color:var(--borders);
    border:1px solid var(--borders);

    & .submit-button-text{
      color:var(--text1);
    }
  }
`;
export default StyledButton;
