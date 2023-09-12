import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import Styled_Modal from "@/styles/styled/styled_modal";
import StyledTabs from "@/styles/styled/styled_tabs";
import {Box, Tab,} from "@mui/material";
import ThemeContext from "@context/themeContext";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import GeneralSettings from "./general";
import ShortcutsList from "./shortcuts";
import TodoPageSettings from "@compo/modal/setting/todoSettings";

const SettingModal = (props) => {
  const [settingItem, setSettingItem] = useState(0);
  const handleChange = (e, newValue) => {
    setSettingItem(newValue);
  };

  const theme = useContext(ThemeContext);

  const {
    modal : {config : { setting }},
  } = useSelector((state: RootState) => state.settings);

  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(false);

  useLayoutEffect(() => {
    if (setting === "todo-pagination") {
      setTimeout(() => {
        setSettingItem(2);
      }, 400);
      setTimeout(() => {
        setAccordionExpanded("pagination");
      }, 800);
    }
    if (setting === "todo-layout") {
      setTimeout(() => {
        setSettingItem(2);
      }, 400);
      setTimeout(() => {
        setAccordionExpanded("layout");
      }, 800);
    }
  }, [setting]);

  useEffect(() => {
    return () => {
      setSettingItem(0);
      setAccordionExpanded(false);
    };
  }, []);


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
            isDarkMode={theme.isDarkMode}
            variant="scrollable"
            value={settingItem}
            onChange={handleChange}
            aria-label="setting-tabs"
            scrollButtons="auto"
            style={{margin: "2rem 2rem 0 2rem"}}
          >
            <Tab tabIndex={1} value={0} label="Overal"/>
            <Tab tabIndex={2} value={1} label="Shortcuts"/>
            {window.location.pathname === "/todos" && (
              <Tab tabIndex={3} value={2} label="Todo Page"/>
            )}
          </StyledTabs>
        </Box>
        <Box className="setting-modal-board">
          {settingItem === 0 ? (
            <GeneralSettings/>
          ) : settingItem === 1 ? (
            <ShortcutsList/>
          ) : settingItem === 2 ? (
            <TodoPageSettings
              accordionExpanded={accordionExpanded}
              setAccordionExpanded={setAccordionExpanded}
            />
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Styled_Modal>
  );
};

export default SettingModal;
