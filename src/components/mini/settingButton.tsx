import React from "react";
import Text from "@/styles/styled/styled_typography";
import { Box, IconButton } from "@mui/material";

const SettingButton = (props) => {
  const { icon, text, active, onClick } = props;

  return (
    <Box
      className={`${active ? "mini-card-active" : "mini-card"} d-flex-around`}
      onClick={onClick}
    >
      <span>{icon}</span>
      <Text>{text}</Text>
    </Box>
  );
};

export default SettingButton;
