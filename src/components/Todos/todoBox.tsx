import React, { useContext, useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { TodoContext } from "@context/todoContext";
import { AppDataContext } from "@context/appDataContext";
import ThemeContext from "../../context/themeContext";
import Axios from "@services/api";
import Toast from "@utils/toast";

export interface BoxProps {
  name: string;
}

interface DropResult {
  name: string;
  id: string;
}

const TodoBox = (props: any) => {
  const { id, flag, body, index, todos } = props;
  const theme = useContext(ThemeContext);
  const { show } = useContext(TodoContext);
  const { blurTrue, todoList, setDrawerState, getAllTodos } = useContext(
    AppDataContext
  );


  const getTodoCategoryId = (todoId) => {
    const result = todoList.filter((item) => item._id === todoId);

    let todo = result[0]; 
    return todo.categoId;
  };

  const addToCategoryWithDragDrop = async (item: any, dropResult: any) => {
 
    try {
      if (dropResult?.id == null || dropResult?.id === "other") {
        const response = await Axios.put("/todos/assign-to-another-category", {
          todoId: id,
          prevCategoId: getTodoCategoryId(id),
          newCategoId: "other",
        });

        Toast(response.data.msg);
      } else {
        const response = await Axios.put("/todos/assign-to-another-category", {
          todoId: id,
          prevCategoId: getTodoCategoryId(id) || "other",
          newCategoId: dropResult?.id,
        });

        Toast(response.data.msg);
      }

      getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo-box",
    item: { todo: todos[index] },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        addToCategoryWithDragDrop(item, dropResult);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;

  return (
    <Grid
      key={index}
      item
      xs={12}

      sm={show[0]=== "1col" ?12 :
        show[2]=== 2 ? 6:
        show[2]=== 3 ? 4:
        show[2]=== 4 ? 3:
        show[2]=== 5 ? 2.4: 2
    }
      className="todo-box-grid"
    >
       
      <Card
        className="todo-box"
        data-testid="box"
        ref={drag}
        sx={{
          opacity,
          background:flag === "isDone" ? "rgb(163, 206, 168)" : "rgba( 255, 255, 255, 0.25 )",
          border:"2px solid gray",
        
        }}
        onClick={() => {
          setDrawerState({
            state: "todo",
            open: true,
            item: todos[index],
          });

          blurTrue();
        }}
      >
        <CardContent
          style={{
            position: "relative",
            wordWrap: "break-word",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: flag === "isDone" ? "black" : theme.text1,
            }}
          >
            {body}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TodoBox;
