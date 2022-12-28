import React, { useContext, useState, useEffect, useRef } from "react";
import ThemeContext from "@context/themeContext";
import { SidebarContext } from "@context/sidebarContext";
import { AppDataContext } from "@context/appDataContext";
import { HiPlus } from "react-icons/hi";
import { Box, IconButton, Tooltip } from "@mui/material";
import { RiCloseCircleFill } from "react-icons/ri";

const TodoPageFooter = (props) => {
  const { userSelectedCategory ,showModalAddTodo,
    setShowModalAddTodo } = props;

  // const { open } = useContext(SidebarContext);
  const { blurTrue, blurFalse, newCategorySelected, selected } = useContext(
    AppDataContext
  );
  // const InputRef = useRef(null);
  const theme = useContext(ThemeContext);

  return (
    <Box className="todo-list-footer">
      {userSelectedCategory.category && userSelectedCategory.category.title ? (
        <Box className="selected-category-box">
          <h3
             style={{
              color: theme.isDarkMode ? "black" : "white",}}
          >{userSelectedCategory.category.title}</h3>
          <IconButton className="close-category">
            <RiCloseCircleFill
              onClick={() => newCategorySelected()}
              style={{
                fontSize: "1rem",
                color: theme.isDarkMode ? "black" : "white",
              }}
            />
          </IconButton>
        </Box>
      ) : (
        <Box></Box>
      )}

      <Box className="add-new-todo-icon">
        <Tooltip arrow title="Add New Task">
          <Box className="icon-box"  onClick={() => setShowModalAddTodo(true)}>
            <IconButton>
              <HiPlus
                fontSize=".8rem"
                color={theme.isDarkMode ? "black" : "white"}
              />
            </IconButton>
          </Box>
        </Tooltip>
      </Box>

      
    </Box>
  );
};

export default TodoPageFooter;
