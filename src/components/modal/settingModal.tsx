import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import Styled_Modal from "@/styles/styled/styled_modal";
import StyledTabs from "@/styles/styled/styled_tabs";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Tab,
} from "@mui/material";
import HeaderPosition from "@/components/mini/headerPosition";
import DarkLight from "@/components/darkLight";
import ThemeContext from "@context/themeContext";
import Text from "@/styles/styled/styled_typography";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RootState } from "@/redux/store";
import { PaginationComponent, PerPageComponent } from "../Todos/paginate";
import {
  handleChangeMetaItem,
  showLayoutNav,
  hideLayoutNav,
} from "@/redux/features/todoPageConfigSlice";
import { GiSoundOn, GiSoundOff } from "react-icons/gi";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FaRegSquare } from "react-icons/fa";
import { FiColumns } from "react-icons/fi";
import { BsTable } from "react-icons/bs";
import { CgList } from "react-icons/cg";
import { MdDoneOutline } from "react-icons/md";
import useWindowSize from "@/hooks/useWindowSize";
import SelectMultiColumn from "../mini/selectMultiColumn";
import SettingButton from "../mini/settingButton";
import ButtonGroupSetting from "../mini/buttonGroupSetting";
import StyledSliderComponent from "@/styles/styled/styled_Slider";
import {
  customBlur,
  handleListenFromOs,
  handlePauseSound,
  handlePlaySound,
} from "@/redux/features/settingSlice";
import useDebounce from "@/hooks/useDebounce";
import { setThreeColAll } from "@/redux/features/todoLayoutSlice";

import { handlePresentAndFilterTodoLayout } from "@utils/funcs";

const SettingModal = (props) => {
  const [settingItem, setSettingItem] = useState(0);
  const handleChange = (e, newValue) => {
    setSettingItem(newValue);
  };

  const theme = useContext(ThemeContext);

  const { todoPageLayout: show } = useSelector(
    (state: RootState) => state.todoLayout
  );
  const dispatch = useDispatch();
  const {
    meta,
    layout_nav_show,
    active_category: ActiveCategory,
  } = useSelector((state: RootState) => state.todoPageConfig);
  const {
    modal,
    blur,
    theme: OsTheme,
    playSound,
  } = useSelector((state: RootState) => state.settings);
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

  useEffect(() => {
    return () => {
      setSettingItem(0);
      setAccordionExpanded(false);
    };
  }, []);

  const handleChangeListenFromOs = (e) => {
    const listen = e.target.checked;
    dispatch(handleListenFromOs(listen));
  };

  const handleChangeMeta = (page, perPage) => {
    dispatch(handleChangeMetaItem({ page: page, limit: perPage }));
  };

  const sizeName = useWindowSize().sizeName;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleCloseTodoViewCountTooltip = () => {
    setAnchorEl(null);
  };

  const handleOpenTodoViewCountTooltip = (event) => {
    if (sizeName !== "mobile") {
      setAnchorEl(event.currentTarget);
    } else {
      dispatch(setThreeColAll(2));
      handlePresentAndFilterTodoLayout("3col", 2);
    }
  };

  const handleChangeBlurSlider = (newValue: number) => {
    if (typeof newValue === "number") {
      dispatch(
        customBlur({
          head: true,
          body: true,
          sidebar: true,
          size: String(newValue / 10),
        })
      );
    }
  };

  const [blurSliderNewValue, setBlurSliderNewValue] = useState(
    +blur?.size * 10 || 50
  );

  useDebounce(
    () => {
      handleChangeBlurSlider(+blurSliderNewValue);
    },
    [blurSliderNewValue],
    600
  );

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
            aria-label="setting-tabs"
            scrollButtons="auto"
          >
            <Tab tabIndex={1} value={0} label="Overal" />
            <Tab tabIndex={2} value={1} label="Shortcuts" />
            {window.location.pathname === "/todos" && (
              <Tab tabIndex={3} value={2} label="Todo Page" />
            )}
          </StyledTabs>
        </Box>
        <Box className="setting-modal-board">
          {settingItem === 0 ? (
            <Box>
              <Box className="d-flex-around">
                <Box className="box">
                  {" "}
                  <Box className="head">Sound</Box>
                  <Box className="body">
                    <Box className="flex-central">
                      {playSound ? (
                        <GiSoundOff
                          onClick={() => {
                            dispatch(handlePauseSound());
                          }}
                          fontSize={"6rem"}
                          color="var(--text2)"
                        />
                      ) : (
                        <GiSoundOn
                          onClick={() => {
                            dispatch(handlePlaySound());
                          }}
                          fontSize={"6rem"}
                          color="var(--text2)"
                        />
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box className="box">
                  {" "}
                  <Box className="head">Theme</Box>
                  <Box className="body">
                    <Box className="flex-central">
                      <DarkLight />
                    </Box>
                    <Box>
                      <Checkbox
                        checked={OsTheme.listen}
                        onChange={handleChangeListenFromOs}
                      />{" "}
                      <Text
                        variant="caption"
                        selectable={false}
                        style={{ color: "white" }}
                      >
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
                  <Box className="head">Header</Box>
                  <Box className="body">
                    <Box className="flex-central">
                      <HeaderPosition />
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="blurBox">
                <Box className="head">Blur</Box>
                <Box className="body">
                  <StyledSliderComponent
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={blurSliderNewValue || blur?.size || 50}
                    onChange={(event: Event, newValue: number) => {
                      setBlurSliderNewValue(newValue);
                    }}
                  />
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
                tabIndex={4}
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
                  expandIcon={
                    <MdOutlineKeyboardArrowDown color="var(--borders)" />
                  }
                >
                  <Text>Settings</Text>
                </AccordionSummary>
                <AccordionDetails className="background-style2">
                  <SettingButton
                    icon={
                      layout_nav_show ? <HiOutlineEyeOff /> : <HiOutlineEye />
                    }
                    text={
                      layout_nav_show ? "Hide Layout Nav" : "Show Layout Nav"
                    }
                    active={false}
                    onClick={() => {
                      if (layout_nav_show) {
                        dispatch(hideLayoutNav());
                      } else {
                        dispatch(showLayoutNav());
                      }
                    }}
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion
                tabIndex={5}
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
                  expandIcon={
                    <MdOutlineKeyboardArrowDown color="var(--borders)" />
                  }
                >
                  <Text>Layout</Text>
                </AccordionSummary>
                <AccordionDetails
                  className="background-style2"
                  style={{ textAlign: "center" }}
                >
                  <ButtonGroupSetting
                    onClickList={[
                      () => {
                        handlePresentAndFilterTodoLayout("1col", null);
                      },

                      (e) => {
                        handleOpenTodoViewCountTooltip(e);
                      },
                      () => {
                        handlePresentAndFilterTodoLayout("table", null);
                      },
                    ]}
                    textList={["Single Column", "Multi Column", "Table View"]}
                    iconList={[
                      <FaRegSquare style={{ marginRight: "10px" }} />,
                      <FiColumns style={{ marginRight: "10px" }} />,
                      <BsTable style={{ marginRight: "10px" }} />,
                    ]}
                    activeItem={
                      show[0] === "1col" ? 0 : show[0] === "3col" ? 1 : 2
                    }
                  />

                  <SelectMultiColumn
                    handleCloseTodoViewCountTooltip={
                      handleCloseTodoViewCountTooltip
                    }
                    open={open}
                    id={id}
                    anchorEl={anchorEl}
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion
                tabIndex={6}
                expanded={accordionExpanded === "filter"}
                onChange={(e, val) => {
                  if (val) {
                    setAccordionExpanded("filter");
                  } else {
                    setAccordionExpanded(false);
                  }
                }}
              >
                <AccordionSummary
                  sx={{ background: "var(--background)" }}
                  expandIcon={
                    <MdOutlineKeyboardArrowDown color="var(--borders)" />
                  }
                >
                  <Text>Filter</Text>
                </AccordionSummary>
                <AccordionDetails
                  className="background-style2"
                  style={{ textAlign: "center" }}
                >
                  <ButtonGroupSetting
                    onClickList={[
                      () => {
                        handlePresentAndFilterTodoLayout("all", null);
                      },

                      () => {
                        handlePresentAndFilterTodoLayout("done", null);
                      },
                    ]}
                    textList={["All Todos", "Done Todos"]}
                    iconList={[
                      <CgList style={{ marginRight: "10px" }} />,
                      <MdDoneOutline style={{ marginRight: "10px" }} />,
                    ]}
                    activeItem={show[1] === "all" ? 0 : 1}
                  />
                </AccordionDetails>
              </Accordion>

              {!ActiveCategory.id && (
                <Accordion
                  tabIndex={7}
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
                    expandIcon={
                      <MdOutlineKeyboardArrowDown color="var(--borders)" />
                    }
                  >
                    <Text>Pagination</Text>
                  </AccordionSummary>
                  <AccordionDetails className="background-style2">
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
              )}
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
