import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import {
  MdDoneOutline,
  MdOutlineKeyboardArrowDown,
  MdPriorityHigh,
} from "react-icons/md";
import Text from "@/styles/styled/styled_typography";
import SettingButton from "@compo/mini/settingButton";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineFilter } from "react-icons/hi";
import {
  SearchModeActive,
  SetNewFilter,
  SetNoFilter,
  handleChangeMetaItem,
  hideLayoutNav,
  showLayoutNav,
} from "@/redux/features/todoPageConfigSlice";
import ButtonGroupSetting from "@compo/mini/buttonGroupSetting";
import { handlePresentAndFilterTodoLayout } from "@/util/funcs";
import { FaRegSquare } from "react-icons/fa";
import { FiColumns } from "react-icons/fi";
import { BsTable } from "react-icons/bs";
import SelectMultiColumn from "@/components/mini/popop/selectMultiColumn";
import { CgList } from "react-icons/cg";
import { PaginationComponent, PerPageComponent } from "@compo/Todos/paginate";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setThreeColAll } from "@/redux/features/todoLayoutSlice";
import useWindowSize from "@hooks/useWindowSize";
import {
  deactiveBlur,
  handleSettingModalOpen,
  setBlurPage,
} from "@/redux/features/settingSlice";
import BoxIconsPopup from "@/components/mini/popop/boxIconsPopup";
import { PiSliders } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import { LuFilterX } from "react-icons/lu";
import PriorityFilterPopup from "@/components/mini/popop/priorityFitlerPopup";
const TodoPageSettings = (props) => {
  const { accordionExpanded, setAccordionExpanded, handleCloseModal } = props;

  const {
    meta: Meta,
    filter_by: { filter_name: FilterName, filter_data: FilterData },
    layout_nav_show,
    active_category: ActiveCategory,
  } = useSelector((state: RootState) => state.todoPageConfig);

  const dispatch = useDispatch();
  const sizeName = useWindowSize().sizeName;
  const [width , height] = useWindowSize().size;

  const { todoPageLayout: show } = useSelector(
    (state: RootState) => state.todoLayout
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleCloseTodoViewCountPopup = () => {
    setAnchorEl(null);
  };

  const handleOpenTodoViewPopup = (event) => {
    if (sizeName !== "mobile") {
      setAnchorEl(event.currentTarget);
    } else {
      dispatch(setThreeColAll(2));
      handlePresentAndFilterTodoLayout("3col", 2);
    }
  };

  const handleChangeMeta = (page: number, perPage: number) => {
    const obj = { ...Meta, page: page, limit: perPage };
    // dispatch(handleChangeMetaItem(obj));
    dispatch(SetNewFilter({ filter_name: "pagination", filter_data: obj }));
  };

  // anchor el for filter box icons popup

  const [anchorElFilterBoxIconsPopup, setAnchorElFilterBoxIconsPopup] =
    React.useState<HTMLButtonElement | null>(null);
  const openFilterBoxIconsPopup = Boolean(anchorElFilterBoxIconsPopup);
  const idFilterBoxIconsPopup = openFilterBoxIconsPopup
    ? "Filter-Box-Icons-Popop"
    : undefined;

  const handleCloseFilterBoxIconsPopup = () => {
    dispatch(deactiveBlur());
    setAnchorElFilterBoxIconsPopup(null);
  };

  const handleOpenFilterBoxIconsPopup = (event: any) => {
    dispatch(setBlurPage());
    setAnchorElFilterBoxIconsPopup(event.currentTarget);
  };

  // anchor el for todo priority filter

  const [priorityAnchorEl, setPriorityAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const openPriorityFilterPopup = Boolean(priorityAnchorEl);
  const idPriorityFilterPopup = open
    ? "todo-view-multi-column-popup-id"
    : undefined;

  const handleClosePriorityFilterPopup = () => {
    setPriorityAnchorEl(null);
    handleCloseFilterBoxIconsPopup();
  };

  const handleOpenPriorityFitlerPopup = (event) => {
    setPriorityAnchorEl(event.currentTarget);
  };

  // filter functions

  const handleIsDoneFilter = () => {
    dispatch(
      SetNewFilter({
        filter_name: "done",
        filter_data: { filter: "is_done_todos" },
      })
    );
    handleCloseFilterBoxIconsPopup();
  };
  const handleShowPriorityBox = (event) => {
    handleOpenPriorityFitlerPopup(event);
  };
  const handlePagination = () => {
    dispatch(
      SetNewFilter({
        filter_name: "pagination",
        filter_data: Meta,
      })
    );
    if (sizeName === "mobile" || sizeName === "tablet") {
      dispatch(setBlurPage());
      setAccordionExpanded("pagination");
    }
    handleCloseFilterBoxIconsPopup();
  };
  const handleSearch = () => {
    dispatch(SetNewFilter({ filter_name: "search" }));
    dispatch(SearchModeActive());
    handleCloseFilterBoxIconsPopup();
    handleCloseModal();
  };

  const handleSetNoFilter = () => {
    dispatch(SetNoFilter(""));
  };

  return (
    <Box className="todo-settings-parent">
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
        sx={
          accordionExpanded === "settings" && {
            border: "2px solid var(--borders)",
            borderRadios: 8,
          }
        }
      >
        <AccordionSummary
          sx={{ background: "var(--background)" }}
          expandIcon={<MdOutlineKeyboardArrowDown color="var(--borders)" />}
        >
          <Text>Settings</Text>
        </AccordionSummary>
        <AccordionDetails className="background-style2">
          <Box className="d-flex-one-gap" style={width < 600 ?{flexDirection:"column"}:{}} >
            <SettingButton
              icon={layout_nav_show ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              text={layout_nav_show ? "Hide Layout Nav" : "Show Layout Nav"}
              active={false}
              onClick={() => {
                if (layout_nav_show) {
                  dispatch(hideLayoutNav());
                } else {
                  dispatch(showLayoutNav());
                }
              }}
            />

            <SettingButton
              icon={<HiOutlineFilter />}
              text={
                !FilterName ? `Filter : no filter` : `Filter : ${FilterName}`
              }
              active={false}
              aria-describedby={idFilterBoxIconsPopup}
              onClick={handleOpenFilterBoxIconsPopup}
            />

            {FilterName && (
              <SettingButton
                icon={<LuFilterX />}
                text={"Set no filter"}
                active={false}
                onClick={handleSetNoFilter}
              />
            )}
          </Box>
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
        sx={
          accordionExpanded === "layout" && {
            border: "2px solid var(--borders)",
            borderRadios: 8,
          }
        }
      >
        <AccordionSummary
          sx={{ background: "var(--background)" }}
          expandIcon={<MdOutlineKeyboardArrowDown color="var(--borders)" />}
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
                handleOpenTodoViewPopup(e);
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
            activeItem={show[0] === "1col" ? 0 : show[0] === "3col" ? 1 : 2}
          />

          <SelectMultiColumn
            handleCloseTodoViewCountPopup={handleCloseTodoViewCountPopup}
            open={open}
            id={id}
            anchorEl={anchorEl}
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
          sx={
            accordionExpanded === "pagination" && {
              border: "2px solid var(--borders)",
              borderRadios: 8,
            }
          }
        >
          <AccordionSummary
            sx={{ background: "var(--background)" }}
            expandIcon={<MdOutlineKeyboardArrowDown color="var(--borders)" />}
          >
            <Text>Pagination</Text>
          </AccordionSummary>
          <AccordionDetails className="background-style2">
            <Box className="d-flex-between-wrap">
              <PerPageComponent
                meta={FilterData}
                handleChangeMeta={handleChangeMeta}
                fullWidth={true}
              />
              <Box style={{ margin: "auto" }}>
                <PaginationComponent
                  meta={FilterData}
                  handleChangeMeta={handleChangeMeta}
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
      <BoxIconsPopup
        down={true}
        anchorEl={anchorElFilterBoxIconsPopup}
        open={openFilterBoxIconsPopup}
        id={idFilterBoxIconsPopup}
        handleCloseTodoViewCountPopup={handleCloseFilterBoxIconsPopup}
        iconList={[
          <MdDoneOutline />,
          <MdPriorityHigh />,
          <PiSliders />,
          <BiSearch />,
        ]}
        titleList={["Is Done", "Priority", "Pagination", "Search"]}
        onClickList={[
          handleIsDoneFilter,
          handleShowPriorityBox,
          handlePagination,
          handleSearch,
        ]}
      />
      <PriorityFilterPopup
        open={openPriorityFilterPopup}
        id={idPriorityFilterPopup}
        anchorEl={priorityAnchorEl}
        handleCloseTodoViewCountPopup={handleClosePriorityFilterPopup}
      />
    </Box>
  );
};

export default TodoPageSettings;
