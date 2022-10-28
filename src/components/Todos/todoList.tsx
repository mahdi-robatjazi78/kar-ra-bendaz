import React, { useContext, useState, useEffect } from "react";
import "./todos.css";
import ThemeContext from "../../context/themeContext";
import CardIcons from "./cardIcons";
import { 
  Grid,
  Box,
} from "@mui/material";
import useWindowSize from "@hooks/useWindowSize";
import { SidebarContext } from "@context/sidebarContext";
import { TodoContext } from "@context/todoContext";
import { AppDataContext } from "@context/appDataContext";
import TodoBox from './todoBox'



// const getCardStyles = (todo: any) => {
//   return {
//     background:
//       todo.flag === "isDone"
//         ? "rgba( 166, 255, 177, 0.25 );"
//         : "rgba( 255, 255, 255, 0.25 )",
//     boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
//     backdropFilter: "blur( 4px )",
//     WebkitBackdropFilter: "blur( 4px )",
//     borderRadius: "10px",
//     border: "1px solid rgba( 255, 255, 255, 0.18 )",
//     cursor: "pointer",
//     minHeight: "6rem",
//     maxHeight: "6rem",
//   };
// };

const TodoList = (props:any) => {
  const {todoList} = props  
  

  return (
    <Box id="todoList"> 
      <Grid
        container
        spacing={2}
        style={{
          // height: "77vh", 
          padding: "1rem",
        }}
      >
        {todoList.map(({_id  , body , flag}, index:number , todos) => (
          <TodoBox id={_id} body={body} flag={flag} index={index} todos={todos} />
        ))}
      </Grid>
    </Box>
  );
};

export default TodoList;
