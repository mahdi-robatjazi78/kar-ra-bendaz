import React from "react";
import { Box, Popover } from "@mui/material";
import Text from "@/styles/styled/styled_typography";
import useWindowSize from "@/hooks/useWindowSize";

const PasswordStrenghtPopop = (props) => {
  const { open, anchorEl, handleClose, id, password } = props;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbole = /[!@#%&]/.test(password);
  let len = password.length;
  const [w, h] = useWindowSize().size;

  return (
    <Popover
      className="password-popover"
      id={id}
      open={open}
      // pass these props to the popover component
      disableAutoFocus={true}
      disableEnforceFocus={true}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={
        w > 800
          ? {
              vertical: "center",
              horizontal: "right",
            }
          : {
              vertical: "bottom",
              horizontal: "center",
            }
      }
      transformOrigin={{ vertical: "center", horizontal: "center" }}
    >
      <Box className="password-popover-paper-override">
        <Text onlyWhite={true} sx={{ p: 2 }}>
          {len > 6 ? "🟢" : "🔴"} Min : 6
        </Text>
        <Text onlyWhite={true} sx={{ p: 2 }}>
          {len < 20 && len > 6 ? "🟢" : "🔴"} Max : 20
        </Text>
        <Text onlyWhite={true} sx={{ p: 2 }}>
          {hasLowerCase ? "🟢" : "🔴"} Has Lowercase
        </Text>
        <Text onlyWhite={true} sx={{ p: 2 }}>
          {hasUpperCase ? "🟢" : "🔴"} Has Uppercase
        </Text>
        <Text onlyWhite={true} sx={{ p: 2 }}>
          {hasNumber ? "🟢" : "🔴"} Has Number
        </Text>
        <Text onlyWhite={true} sx={{ p: 2 }}>
          {hasSymbole ? "🟢" : "🔴"} Has Symbole !@#%&
        </Text>
      </Box>
    </Popover>
  );
};

export default PasswordStrenghtPopop;
