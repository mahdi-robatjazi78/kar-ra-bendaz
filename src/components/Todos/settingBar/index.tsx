import React from "react";
import { Badge, Box, Tooltip } from "@mui/material";
import { CgList } from "react-icons/cg";
import { MdDoneOutline, MdPriorityHigh } from "react-icons/md";
import { FiColumns } from "react-icons/fi";
import { FaRegSquare, FaRegPlusSquare } from "react-icons/fa";
import { BsTable, BsInfoSquare, BsFolderPlus } from "react-icons/bs";
import "./popoverTodoColumn.css";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import useWindowSize from "@/hooks/useWindowSize";
import { setThreeColAll } from "@/redux/features/todoLayoutSlice";
import SelectMultiColumn from "../../mini/popop/selectMultiColumn";
import { handlePresentAndFilterTodoLayout } from "@utils/funcs";
import {
  SetNoFilter,
  SetNewFilter,
  SearchModeActive,
} from "@/redux/features/todoPageConfigSlice";
import { HiOutlineFilter } from "react-icons/hi";
import { PiSliders } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import {
  handleSettingModalOpen,
  setBlurPage,
} from "@/redux/features/settingSlice";
import PriorityFilterPopup from "@/components/mini/popop/priorityFitlerPopup";
import { IoCloseCircleOutline } from "react-icons/io5";

const SettingBar = (props: any) => {
  const { headerPosition } = useSelector((state: RootState) => state.settings);
  const sizeName = useWindowSize().sizeName;
  const [widht, hegith] = useWindowSize().size;
  const { setShowAddCategoryModal } = props;
  const dispatch = useDispatch();
  const { todoPageLayout: show } = useSelector(
    (state: RootState) => state.todoLayout
  );
  const {
    filter_by: { filter_name: filterName },
    meta: Meta,
  } = useSelector((state: RootState) => state.todoPageConfig);

  // anchor el for todo view multi column popup

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const id = open ? "todo-view-multi-column-popup-id" : undefined;

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

  // anchor el for todo priority filter

  const [priorityAnchorEl, setPriorityAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const openPriorityFilterPopup = Boolean(priorityAnchorEl);
  const idPriorityFilterPopup = open
    ? "todo-view-multi-column-popup-id"
    : undefined;

  const handleClosePriorityFilterPopup = () => {
    setPriorityAnchorEl(null);
  };

  const handleOpenPriorityFitlerPopup = (event) => {
    setPriorityAnchorEl(event.currentTarget);
  };

  return (
    <Box
      id="setting-bar-container"
      style={
        headerPosition === "bottom"
          ? {
              marginTop: "auto",
              height: "calc(100vh - 70px)",
            }
          : {
              height: "100vh",
            }
      }
    >
      <Box className={` ${hegith < 205 ? "d-none" : "setting-bar-section"}`}>
        <Tooltip arrow placement="right" title="New Category">
          <Box
            className="unselected-setting"
            onClick={() => {
              setShowAddCategoryModal({
                prevText: "",
                show: true,
                state: "add",
              });
            }}
          >
            <BsFolderPlus className="icon-style" />
          </Box>
        </Tooltip>
      </Box>

      <Box className={` ${hegith < 365 ? "d-none" : "setting-bar-section"}`}>
        <Tooltip arrow placement="right" title="Single Column">
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={() => handlePresentAndFilterTodoLayout("1col", null)}
            className={
              show[0] === "1col" ? "selected-setting" : "unselected-setting"
            }
          >
            <FaRegSquare className="icon-style" />
          </motion.div>
        </Tooltip>
        <Tooltip arrow placement="right" title="Multi Columns">
          <motion.div
            whileTap={{ scale: 1.2 }}
            aria-describedby={id}
            onClick={(e) => {
              handleOpenTodoViewPopup(e);
            }}
            className={
              show[0] === "3col" ? "selected-setting" : "unselected-setting"
            }
          >
            <FiColumns className="icon-style2" />
          </motion.div>
        </Tooltip>

        <Tooltip arrow placement="right" title="Table">
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={() => handlePresentAndFilterTodoLayout("table", null)}
            className={
              show[0] === "table" ? "selected-setting" : "unselected-setting"
            }
          >
            <BsTable className="icon-style" />
          </motion.div>
        </Tooltip>
      </Box>

      <Box className={` ${hegith < 625 ? "d-none" : "setting-bar-section"}`}>
        <Tooltip arrow placement="right" title="No Filter : (All Todos)">
          <motion.div
            whileTap={{ scale: 1.2 }}
            // onClick={() => handlePresentAndFilterTodoLayout("all", null)}
            onClick={() => {
              dispatch(SetNoFilter(""));
            }}
            className={
              filterName !== "done" &&
              filterName !== "priority" &&
              filterName !== "pagination" &&
              filterName !== "category" &&
              filterName !== "search"
                ? "selected-setting"
                : "unselected-setting"
            }
          >
            <CgList className="icon-style2" />
          </motion.div>
        </Tooltip>
        <Tooltip arrow placement="right" title="Is Done">
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={() => {
              dispatch(
                SetNewFilter({
                  filter_name: "done",
                  filter_data: { filter: "is_done_todos" },
                })
              );
            }}
            className={
              filterName === "done" ? "selected-setting" : "unselected-setting"
            }
          >
            <MdDoneOutline className="icon-style2" />
          </motion.div>
        </Tooltip>

        <Tooltip arrow placement="right" title="Priority">
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={handleOpenPriorityFitlerPopup}
            className={
              filterName === "priority"
                ? "selected-setting"
                : "unselected-setting"
            }
          >
            <MdPriorityHigh className="icon-style2" />
          </motion.div>
        </Tooltip>

        <Tooltip arrow placement="right" title="Pagination">
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={() => {
              dispatch(
                SetNewFilter({
                  filter_name: "pagination",
                  filter_data: Meta,
                })
              );
              if (sizeName === "mobile" || sizeName === "tablet") {
                dispatch(setBlurPage());
                dispatch(
                  handleSettingModalOpen({ setting: "todo-pagination" })
                );
              }
            }}
            className={
              filterName === "pagination"
                ? "selected-setting"
                : "unselected-setting"
            }
          >
            <PiSliders className="icon-style2" />
          </motion.div>
        </Tooltip>

        <Tooltip arrow placement="right" title="Search">
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={() => {
              dispatch(SetNewFilter({ filter_name: "search" }));
              dispatch(SearchModeActive());
            }}
            className={
              filterName === "search"
                ? "selected-setting"
                : "unselected-setting"
            }
          >
            <BiSearch className="icon-style2" />
          </motion.div>
        </Tooltip>
      </Box>
      <Tooltip
        arrow
        placement="right"
        title={filterName !== "" ? `Filter by : ${filterName}` : "No filter"}
      >
        <motion.div
          whileTap={{ scale: 1.2 }}
          className={
            !filterName
              ? "filter-unselected-setting"
              : "filter-selected-setting"
          }
        >
          <Badge
            invisible={!filterName}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(SetNoFilter(""));
                }}
                style={{ transform: "translateY(2px)" }}
              >
                <IoCloseCircleOutline
                 
                />
              </span>
            }
            sx={{
              "& .MuiBadge-badge": {
                background: "var(--header)",
                color: "var(--text2)",
                fontSize: "1.3rem",
                height: 22,
                width: 22,
                border: "1px solid gray",
                borderRadius: "100%",
                transform: "translate(20px , -10px)",
              },
            
            }}
          >
            <HiOutlineFilter className="filter-icon-styles" />
          </Badge>
        </motion.div>
      </Tooltip>

      {/* popop section */}

      <SelectMultiColumn
        open={open}
        id={id}
        anchorEl={anchorEl}
        handleCloseTodoViewCountPopup={handleCloseTodoViewCountPopup}
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

export default SettingBar;
