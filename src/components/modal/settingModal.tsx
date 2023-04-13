import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import Styled_Modal from "@/styles/styled/styled_modal";
import StyledTabs from "@/styles/styled/styled_tabs";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  IconButton,
  Tab,
  Tooltip,
  Typography,
} from "@mui/material";
import HeaderPosition from "@/components/mini/headerPosition";
import DarkLight from "@/components/darkLight";
import ThemeContext from "@context/themeContext";
import Text from "@/styles/styled/styled_typography";
import { useDispatch, useSelector } from "react-redux";
import { GoArrowSmallDown, GoArrowSmallUp } from "react-icons/go";
import { RootState } from "@/redux/store";
import { PaginationComponent, PerPageComponent } from "../Todos/paginate";
import {
  handleChangeMetaItem,
  showLayoutNav,
  hideLayoutNav,
} from "@/redux/features/todoPageConfigSlice";
import { GiSoundOn, GiSoundOff } from "react-icons/gi";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
const SettingModal = (props) => {
  const [settingItem, setSettingItem] = useState(0);
  const handleChange = (e, newValue) => {
    setSettingItem(newValue);
  };

  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { meta, layout_nav_show } = useSelector(
    (state: RootState) => state.todoPageConfig
  );
  const { modal } = useSelector((state: RootState) => state.settings);
  const setting = modal.config?.setting;
  const [accordionExpanded, setAccordionExpanded] = useState<string | false>(
    false
  );

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

  const [listenFromOs, setListenFromOs] = useState(false);
  const [osTheme, setOsTheme] = useState(false);
  const handleSeeOsDarkMode = () => {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme:dark)").matches;
    setOsTheme(isDarkMode);
  };

  useEffect(() => {
    handleSeeOsDarkMode();

    return () => {
      setSettingItem(0);
      setAccordionExpanded(false);
    };
  }, []);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      handleSeeOsDarkMode();
    });

  const handleChangeListenFromOs = (e) => {
    const listen = e.target.checked;
    setListenFromOs(listen);
  };

  const handleChangeMeta = (page, perPage) => {
    dispatch(handleChangeMetaItem({ page: page, limit: perPage }));
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
            <Tab value={1} label="See Shortcuts" />
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
                <Box className="head">Sound</Box>
                <Box className="body">
                  <Box className="flex-central">
                    <GiSoundOn
                      fontSize={"2rem"}
                      style={{
                        color: "var(--text3)",
                      }}
                    />
                    <GiSoundOff
                      fontSize={"2rem"}
                      style={{
                        color: "var(--text3)",
                      }}
                    />
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
                    <Text variant="caption" selectable={false}>
                      {" "}
                      Listen to os{" "}
                    </Text>
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
            <Box sx={{ padding: "1rem 3rem" }}>
              <Box className="d-flex-between" sx={{ m: 2, flexWrap: "nowrap" }}>
                <Text>Home Page </Text>
                <Text>
                  <code>alt</code> <code>ctrl</code> <code>h</code>
                </Text>
              </Box>
              <Box className="d-flex-between" sx={{ m: 2, flexWrap: "nowrap" }}>
                <Text>Todo Page </Text>
                <Text>
                  <code>alt</code> <code>ctrl</code> <code>t</code>
                </Text>
              </Box>
              <Box className="d-flex-between" sx={{ m: 2, flexWrap: "nowrap" }}>
                <Text>Profile Page </Text>
                <Text>
                  <code>alt</code> <code>ctrl</code> <code>p</code>
                </Text>
              </Box>
              <hr />
              <Box className="d-flex-between" sx={{ m: 2, flexWrap: "nowrap" }}>
                <Text>Setting Modal </Text>
                <Text>
                  <code>ctrl</code> <code>shift</code> <code>s</code>
                </Text>
              </Box>
              <Box className="d-flex-between" sx={{ m: 2, flexWrap: "nowrap" }}>
                <Text> Header Position </Text>
                <Text>
                  <code>ctrl</code> <code>shift</code> <code>arrow key</code>
                </Text>
              </Box>
              <Box className="d-flex-between" sx={{ m: 2, flexWrap: "nowrap" }}>
                <Text>Change Theme </Text>
                <Text>
                  <code>alt</code> <code>t</code>
                </Text>
              </Box>
              <hr />

              <Box className="d-flex-between" sx={{ m: 2, flexWrap: "nowrap" }}>
                <Text>New Todo </Text>
                <Text>
                  {" "}
                  <code>alt</code> <code>n</code>
                </Text>
              </Box>
              <Box className="d-flex-between" sx={{ m: 2, flexWrap: "nowrap" }}>
                <Text>New Category </Text>
                <Text>
                  {" "}
                  <code>alt</code> <code>c</code>
                </Text>
              </Box>
              <Box className="d-flex-between" sx={{ m: 2, flexWrap: "nowrap" }}>
                <Text>Search Mode </Text>
                <Text>
                  <code>ctrl</code> <code>shift</code> <code>f</code>
                </Text>
              </Box>
            </Box>
          ) : settingItem === 2 ? (
            <Box>
              <Accordion
                expanded={accordionExpanded === "settings"}
                onChange={(e, val) => {
                  if (val) {
                    setAccordionExpanded("settings");
                  } else {
                    setAccordionExpanded(false);
                  }
                }}
              >
                <AccordionSummary
                  sx={{ background: "var(--background)" }}
                  expandIcon={<GoArrowSmallDown />}
                >
                  <Text>Settings</Text>
                </AccordionSummary>
                <AccordionDetails className="background-style">
                  <Box className="t-align-center">
                    {layout_nav_show ? (
                      <Tooltip title="Hide Layout Nav">
                        <IconButton
                          onClick={() => {
                            dispatch(hideLayoutNav());
                          }}
                        >
                          <HiOutlineEyeOff
                            style={{ color: "var(--text3)" }}
                            fontSize={"1.5rem"}
                          />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="See Layout Nav">
                        <IconButton
                          onClick={() => {
                            dispatch(showLayoutNav());
                          }}
                        >
                          <HiOutlineEye
                            style={{ color: "var(--text3)" }}
                            fontSize={"1.5rem"}
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={accordionExpanded === "layout"}
                onChange={(e, val) => {
                  if (val) {
                    setAccordionExpanded("layout");
                  } else {
                    setAccordionExpanded(false);
                  }
                }}
              >
                <AccordionSummary
                  sx={{ background: "var(--background)" }}
                  expandIcon={<GoArrowSmallDown />}
                >
                  <Text>Layout</Text>
                </AccordionSummary>
                <AccordionDetails className="background-style">
                  <Text variant="caption">Show Todo Page Sidebar</Text>
                  <Text variant="caption">Change Todo Page Layout</Text>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={accordionExpanded === "pagination"}
                onChange={(e, val) => {
                  if (val) {
                    setAccordionExpanded("pagination");
                  } else {
                    setAccordionExpanded(false);
                  }
                }}
              >
                <AccordionSummary
                  sx={{ background: "var(--background)" }}
                  expandIcon={<GoArrowSmallDown />}
                >
                  <Text>Pagination</Text>
                </AccordionSummary>
                <AccordionDetails className="background-style">
                  <Box className="d-flex-between-wrap">
                    <PerPageComponent
                      meta={meta}
                      handleChangeMeta={handleChangeMeta}
                      fullWidth={true}
                    />
                    <Box style={{ margin: "auto" }}>
                      <PaginationComponent
                        meta={meta}
                        handleChangeMeta={handleChangeMeta}
                      />
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
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
