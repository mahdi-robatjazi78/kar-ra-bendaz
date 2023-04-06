import React, { useState,useEffect , useContext } from "react";
import Styled_Modal from "@/styles/styled/styled_modal";
import StyledTabs from "@/styles/styled/styled_tabs";
import { Box, Checkbox, Tab, Typography } from "@mui/material";
import HeaderPosition from "@/components/mini/headerPosition";
import DarkLight from "@/components/darkLight";
import ThemeContext from "@context/themeContext";
import Text from "@/styles/styled/styled_typography";

const SettingModal = (props) => {
  const [settingItem, setSettingItem] = useState(0);
  const handleChange = (e, newValue) => {
    setSettingItem(newValue);
  };

  const theme = useContext(ThemeContext);
  

  const [listenFromOs, setListenFromOs] = useState(false);
  const [osTheme , setOsTheme] = useState(false)


  const handleSeeOsDarkMode = ()=>{
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches;
    setOsTheme(isDarkMode)

  }
  
  useEffect(()=>{
    handleSeeOsDarkMode()

  } , [])
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change' , ()=>{handleSeeOsDarkMode()});


  const handleChangeListenFromOs = (e) => {
    const listen = e.target.checked;
    setListenFromOs(listen);
  };

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
            <Tab value={1} label="See Shortcut" />
            <Tab value={2} label="Todo Page" />
          </StyledTabs>
        </Box>
        <Box className="setting-modal-board">
          {settingItem === 0 ? (
            <Box className="d-flex-around">
              <Box
                sx={{
                  backgroundColor: theme.isDarkMode
                    ? theme.header
                    : theme.sidebar,
                }}
                className="box"
              >
                {" "}
                <Box className="head">Theme</Box>
                <Box className="body">
                  <Box className="flex-central">
                    <DarkLight listenFromOs={listenFromOs} osTheme={osTheme} />
                  </Box>
                  <Box>
                    <Checkbox
                      checked={listenFromOs}
                      onChange={handleChangeListenFromOs}
                    />{" "}
                    <Text variant="caption" selectable={false}> Listen to os </Text>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: theme.isDarkMode
                    ? theme.header
                    : theme.sidebar,
                }}
                className="box"
              >
                <Box className="head">Header Position</Box>
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
            <Box>


            <Box><Text variant="caption">Show Todo Page Sidebar</Text></Box>
            <Box><Text variant="caption">Mute / Voice</Text></Box>
            <Box><Text variant="caption">Pagination / Perpage</Text></Box>




            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Styled_Modal>
  );
};

export default SettingModal;
