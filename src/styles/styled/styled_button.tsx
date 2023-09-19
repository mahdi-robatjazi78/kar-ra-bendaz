import styled from "styled-components";
import { Button } from "@mui/material";

const StyledButton = styled(Button)`
  align-items: center;
  background: ${(props: any) =>
    props.transparent ? "transparent !important" : "transparent !important "};
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: ${(props: any) =>
    props.transparent ? "var(--text2) !important" : "var(--text3) !important"};
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  margin: 0;
  position: relative;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  text-transform:capitalize !important;
  font-family: Changa;


  border:  ${(props: any) =>
    props.transparent
      ? "1px solid var(--text2) !important"
      : "1px solid var(--text3) !important"};
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  > span {
    text-transform:capitalize;
    text-decoration: none; 
  font-family: Changa;
  }
  &:hover &:focus {

    color:${(props: any) =>
      props.transparent ? "black" : "var(--text3) !important"};
  }
  &:hover {
    transform: translateY(-2px);
    background-color: var(--sidebar) !important;
    border-color: var(--borders) !important;

    color:${(props: any) =>
      props.transparent ? "black" : "var(--text3) !important"};



    
  }
  &:active {
    background-color: var(--header);
    color: white;
    border-color: var(--borders);

    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    transform: translateY(0);
  }

  &:disabled {
    filter: brightness(0.4);
    border-color: #dadada4d !important;
    color: #dadada4d !important;

    & .submit-button-text {
      color: var(--text1);
    }
  }
`;
export default StyledButton;
