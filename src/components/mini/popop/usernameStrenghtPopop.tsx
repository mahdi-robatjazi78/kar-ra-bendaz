import React from "react";
import { Box, Popover } from "@mui/material";
import Text from "@/styles/styled/styled_typography";
import useWindowSize from "@/hooks/useWindowSize";
import { EmailValidateRegex } from "@/types/types";

const UsernameStrenghtPopop = (props) => {
  const { open, anchorEl, handleClose, id, username } = props;

  const testUsernameIsEmail = EmailValidateRegex.test(username);
  const hasUpperCase = /[A-Z]/.test(username);
  const hasLowerCase = /[a-z]/.test(username);
  let hasAcceptableSeperators = /[-_.]/.test(username);
  let hasAnyNumber = /[0-9]/.test(username);



  let len = username.length;
  
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
      <Box className={!testUsernameIsEmail ? "username-popover-paper-override" : "username-popover-paper-override-near" }>
        {!testUsernameIsEmail && (
          <Box>
            <Text onlyWhite={true} sx={{ p: 2 }}>
              {len >= 6 ? "🟢" : "🔴"} Min : 6
            </Text>
            <Text onlyWhite={true} sx={{ p: 2 }}>
              {len < 36  ? "🟢" : "🔴"} Max : 35
            </Text>
            <Text onlyWhite={true} sx={{ p: 2 }}>
              {hasLowerCase ? "🟢" : "🔴"} Have Lowercase
            </Text>
            <Text onlyWhite={true} sx={{ p: 2 }}>
              {hasUpperCase ? "🟢" : "🔴"} Have Uppercase
            </Text>
            <Text onlyWhite={true} sx={{ p: 2 }}>
              {hasAcceptableSeperators || hasAnyNumber ? "🟢" : "🔴"} Must have Seperators -._ <br />
              &nbsp; &nbsp; &nbsp; or any Number
            </Text>
          </Box>
        )}

        <Text onlyWhite={true} sx={{ p: 2 }}>
          {testUsernameIsEmail ? "🟢" : "🟠"} Can Be Valid Email 
        </Text>
      </Box>
    </Popover>
  );
};

export default UsernameStrenghtPopop;
