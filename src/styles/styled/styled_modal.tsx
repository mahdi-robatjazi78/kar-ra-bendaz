import React from "react";
import styled from "styled-components";
import { Modal, Fade, Backdrop, Box } from "@mui/material";

const CustomeStyledModal = styled(Modal)``;

const CustomeStyledModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props: any) =>
    props.dark ? "var(--header)" : "var(--background)"};
  border: 2px solid var(--borders);
  border-radius: 8px;
  outline: none !important;
   width:${(props:any)=> props.dimentions[0]};
   height:${(props:any)=> props.dimentions[1]};
  @media only screen and (max-width: 450px) and (min-height : 750px) {
    height: min(700px);
  }
`;

const Styled_Modal = (props: any) => {


  const dimentions = props.dimentions ? props.dimentions : ["min(60rem , 94%)","min(550px)"] // [width , height]

  return (
    <CustomeStyledModal
      {...props}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={props.open}>
        <CustomeStyledModalBox dimentions={dimentions} dark={props.dark}>
          {props.children}
        </CustomeStyledModalBox>
      </Fade>
    </CustomeStyledModal>
  );
};

export default Styled_Modal;
