import React, { useState, useContext } from "react";
import Styled_Modal from "@/styles/styled/styled_modal";
import StyledTabs from "@/styles/styled/styled_tabs";
import { Box, Tab } from "@mui/material";
import HeaderPosition from "@/components/mini/headerPosition";
import DarkLight from "@/components/darkLight";
import ThemeContext from "@context/themeContext";

const SettingModal = (props) => {
  const [settingItem, setSettingItem] = useState(0);
  const handleChange = (e, newValue) => {
    setSettingItem(newValue);
  };

  const theme = useContext(ThemeContext); 
  return (
    <Styled_Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.settingModalOpen}
      onClose={props.handleClose}
    >
      <Box id="setting-modal-main-parent">
        <Box>
          <StyledTabs
            variant="scrollable"
            value={settingItem}
            onChange={handleChange}
            aria-label="setting tabs"
            scrollButtons="auto"
          >
            <Tab value={0} label="Overal" />
            <Tab value={1} label="Manage Shortcut" />
            <Tab value={2} label="Todo Page" />
          </StyledTabs>
        </Box>
        <Box className="setting-modal-board">
          {settingItem === 0 ? (
            <Box className="d-flex-around">
              <Box
                sx={{ backgroundColor: theme.isDarkMode ?  theme.header : theme.sidebar }}
                className="box"
              >
                {" "}
								<Box className="head">
									Theme
								</Box>
								<Box className="body">
								<Box className="flex-central">
									
                <DarkLight />
								</Box>
								</Box>
              </Box>
              <Box
                sx={{ backgroundColor: theme.isDarkMode ?  theme.header : theme.sidebar }}
							
							className="box">
								<Box className="head">
									Header Position
								</Box>
								<Box className="body">
								<Box className="flex-central">
                <HeaderPosition />
								</Box>
								</Box>
							</Box>
            </Box>
          ) : settingItem === 1 ? (
            <Box></Box>
          ) : settingItem === 2 ? (
            <Box></Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Styled_Modal>
  );
};

export default SettingModal;
