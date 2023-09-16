import React, { useContext, useState, useEffect } from "react";
import { Box, Popover, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { SetNewFilter } from "@/redux/features/todoPageConfigSlice";
import { RootState } from "@/redux/store";

const PriorityFilterPopup = (props) => {
  const dispatch = useDispatch();
  const { anchorEl, open, id, handleCloseTodoViewCountPopup } = props;

  const handleClickPriorityFilter = (priority) => {
    dispatch(
      SetNewFilter({
        filter_name: "priority",
        filter_data: { priority_level: priority },
      })
    );
  };

  const {
    filter_by: { filter_data: FilterData },
  } = useSelector((state: RootState) => state.todoPageConfig);

  return (
    <Popover
      className="selected-list-todo-view-column"
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleCloseTodoViewCountPopup}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Box className="selected-list-priority-filter-parent">
        <Box className="d-flex-between-column">
          <Tooltip placement = "right" arrow title="Priority : Low">
            <span
              onClick={() => handleClickPriorityFilter("low")}
              className={
                FilterData?.priority_level === "low"
                  ? "todo-view-item-active"
                  : ""
              }
            >
              <FcLowPriority />
            </span>
          </Tooltip>
          <Tooltip placement = "right" arrow title="Priority : Medium">
            <span
              onClick={() => handleClickPriorityFilter("medium")}
              className={
                FilterData?.priority_level === "medium"
                  ? "todo-view-item-active"
                  : ""
              }
            >
              <FcMediumPriority />
            </span>
          </Tooltip>
          <Tooltip placement = "right" arrow title="Priority : High">
            <span
              onClick={() => handleClickPriorityFilter("high")}
              className={
                FilterData?.priority_level === "high"
                  ? "todo-view-item-active"
                  : ""
              }
            >
              <FcHighPriority />
            </span>
          </Tooltip>
        </Box>
      </Box>
    </Popover>
  );
};

export default PriorityFilterPopup;
