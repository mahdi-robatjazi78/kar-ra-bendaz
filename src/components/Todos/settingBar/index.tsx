import React, { useState, useEffect, useContext } from "react";
import { Box, Popover, Tooltip } from "@mui/material";
import { CgList } from "react-icons/cg";
import { MdDoneOutline } from "react-icons/md";
import { FiColumns } from "react-icons/fi";
import { FaRegSquare, FaRegPlusSquare } from "react-icons/fa";
import { BsTable, BsInfoSquare } from "react-icons/bs";
import { TodoContext } from "@context/todoContext";
import "./popoverTodoColumn.css";
import ShowModalNewCategory from "../TodoModals/newCategory";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useWindowSize from "@/hooks/useWindowSize";

import SelectMultiColumn from '../../mini/selectMultiColumn'

const SettingBar = (props:any) => {
  const { headerPosition } = useSelector((state: RootState) => state.settings);
  const sizeName = useWindowSize().sizeName;
  const {setShowAddCategoryModal} = props
  const {
    show,
    setThreeColAll,
    handlePresentAndFilterTodoLayout,
  } = useContext(TodoContext);

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
      setThreeColAll(2);
      handlePresentAndFilterTodoLayout("3col", 2);
    }
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
      <Box className="setting-bar-section">
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
            <FaRegPlusSquare className="icon-style" />
          </Box>
        </Tooltip>
      </Box>

      <Box className="setting-bar-section">
        <Tooltip arrow placement="right" title="Single Column">
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={() => handlePresentAndFilterTodoLayout("1col" , null)}
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
              handleOpenTodoViewCountTooltip(e);
            }}
            className={
              show[0] === "3col" ? "selected-setting" : "unselected-setting"
            }
          >
            <FiColumns className="icon-style2" />
          </motion.div>
        </Tooltip>

        <SelectMultiColumn
          handleCloseTodoViewCountTooltip={handleCloseTodoViewCountTooltip}
          open={open}
          id={id}
          anchorEl={anchorEl}
        />
        <Tooltip arrow placement="right" title="Table">
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={() => handlePresentAndFilterTodoLayout("table" , null)}
            className={
              show[0] === "table" ? "selected-setting" : "unselected-setting"
            }
          >
            <BsTable className="icon-style" />
          </motion.div>
        </Tooltip>
      </Box>

      <Box className="setting-bar-section">
        <Tooltip arrow placement="right" title="All">
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={() => handlePresentAndFilterTodoLayout("all" , null)}
            className={
              show[1] === "all" ? "selected-setting" : "unselected-setting"
            }
          >
            <CgList className="icon-style2" />
          </motion.div>
        </Tooltip>
        <Tooltip arrow placement="right" title="Is Done">
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={() => handlePresentAndFilterTodoLayout("done" ,null)}
            className={
              show[1] === "done" ? "selected-setting" : "unselected-setting"
            }
          >
            <MdDoneOutline className="icon-style2" />
          </motion.div>
        </Tooltip>
      </Box>

    
    </Box>
  );
};

export default SettingBar;
