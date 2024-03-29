import React, { useContext } from "react";
import StyledButton from "@/styles/styled/styled_button";
import { ButtonGroup } from "@mui/material";
import useWindowSize from "@hooks/useWindowSize";

const ButtonGroupSetting = (props) => {
  const { onClickList, textList, iconList, activeItem } = props;
  const [w, h] = useWindowSize().size
  return (
    <ButtonGroup
      className="t-align-center"
      variant="outlined"
      aria-label="outlined primary button group"
      sx={w < 673 ?{display:"flex" , flexDirection:"column"}:{}}
    >
      {textList.map((txt, idx) => (
        <StyledButton
          onClick={onClickList[idx]}
          className={activeItem === idx ? "active-button" : ""}
          style={{ textTransform: "capitalize" }}
        >
          {iconList[idx]} {txt}
        </StyledButton>
      ))}
    </ButtonGroup>
  );
};

export default ButtonGroupSetting;
