import React, { useState, useEffect } from "react";
import "./todos.css";
import { Grid, } from "@mui/material"; 
import TodoBox from "./todoBox";

const TodoList = (props: any) => {
  const { todoList ,UpdateTodoAndCategories } = props; 

  let newList = todoList; 

  return (
    <Grid container spacing={2} id="todo-grid-list">
      {newList.map(({ _id, body, flag , categoId }, index: number , array:[]) => (
        <TodoBox
          key={_id}
          id={_id}
          body={body}
          flag={flag}
          index={index}
          todos={array}
          categoId={categoId}
          UpdateTodoAndCategories={UpdateTodoAndCategories}
        />
      ))}
    </Grid>
  );
};

export default TodoList;
