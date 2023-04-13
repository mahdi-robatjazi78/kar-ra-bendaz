import React from "react";
import styled from "styled-components";
import { Modal, Fade, Backdrop, Box } from "@mui/material";

const CustomeStyledModal = styled(Modal)``;

const CustomeStyledModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--background);
  width: min(35rem, 92%);
  border: 2px solid var(--borders);
  border-radius: 8px;
  height: min(400px);
  outline: none !important;
`;

const Styled_Modal = (props) => {
  return (
    <CustomeStyledModal
      {...props}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={props.open}>
        <CustomeStyledModalBox>{props.children}</CustomeStyledModalBox>
      </Fade>
    </CustomeStyledModal>
  );
};

export default Styled_Modal;
