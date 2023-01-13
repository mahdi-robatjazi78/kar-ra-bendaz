import React, { useContext, useState, useEffect } from "react";
import "./todos.css";
import ThemeContext from "../../context/themeContext";
import CardIcons from "./cardIcons";
import { Grid, Box } from "@mui/material";
import { SidebarContext } from "@context/sidebarContext";
import { TodoContext } from "@context/todoContext";
import { AppDataContext } from "@context/appDataContext";
import TodoBox from "./todoBox";

const TodoList = (props: any) => {
  const { todoList } = props;

  return (
    <Grid container spacing={2} id="todo-grid-list">
      {todoList.map(({ _id, body, flag }, index: number, todos : []) => (
        <TodoBox
          key={_id}
          id={_id}
          body={body}
          flag={flag}
          index={index}
          todos={todos}
        />
      ))}
    </Grid>
  );
};

export default TodoList;
