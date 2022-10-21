import React, { useContext ,useState, useEffect} from "react";
import { useDrag } from "react-dnd";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { TodoContext } from "@context/todoContext";
import { AppDataContext } from "@context/appDataContext";
import ThemeContext from "../../context/themeContext";
import Axios from '@services/api'
import Toast from "@utils/toast";

export interface BoxProps {
  name: string;
}

interface DropResult {
  name: string;
  id: string;
}

const TodoBox = (props: any) => {
  const { id ,flag, body, index, hover , categoId  ,todos} = props;
  const theme = useContext(ThemeContext);
  const { show } = useContext(TodoContext);
  const { blurTrue, todoList, setDrawerState,getAllTodos } = useContext(AppDataContext);
 

  const textShadow = {
    color: "transparent",
    textShadow: " 0 0 8px #000",
    fontSize: 14,
  };

 
  const addToCategoryWithDragDrop = async (item , dropResult) => {
    console.log("drop here TODO ITEM" ,item); 
    console.log("drop  RESULT CATEGORY" ,dropResult);
    
    try{
    if(dropResult?.id == null  || dropResult?.id === "other"){
      const response = await Axios.put("/todos/assign-to-another-category" ,{
        todoId : id , 
        prevCategoId : categoId,  
        newCategoId : "other"
      })

      Toast(response.data.msg)
    }
    else{
      
        const response = await Axios.put("/todos/assign-to-another-category" ,{
          todoId :id , 
          prevCategoId :categoId || "other",   
          newCategoId : dropResult?.id
        })
  
        Toast(response.data.msg)
      }
        
      getAllTodos()   
  }catch(error){
    console.log(error)
  }

  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo-box",
    item: {todo:todos[index]},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        addToCategoryWithDragDrop(item,dropResult)
        
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
      sm={show[0] === "1col" ? 12 : 6}
      md={show[0] === "1col" ? 12 : 6}
      lg={show[0] === "1col" ? 12 : 4}
    >
      <Card
        ref={drag}
        data-testid={`box`}
        style={{
          userSelect: "none",
          opacity,
          background:
            flag === "isDone" ? "#E6FFE9" : "rgba( 255, 255, 255, 0.25 )",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 4px )",
          WebkitBackdropFilter: "blur( 4px )",
          // borderRadius: "1rem",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
          cursor: "pointer",
          minHeight: "6rem",
          maxHeight: "6rem",
          overflowY: hover || hover === 0 ? "hidden" : "scroll",
        }}
        // onMouseLeave={() => setHover(null)}
        // onClick={() => setHover(index)}
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
            sx={
              index === hover
                ? textShadow
                : {
                    fontSize: 14,
                    color: flag === "isDone" ? "black" : theme.text1,
                  }
            }
            gutterBottom
            // className={}
          >
            {body}
          </Typography>
          {/* {index === hover && (
              <span>
                <CardIcons
                  todo={todoList[hover]}
                  getAllTodos={getAllTodos}
                  setSelectedEditTask={setSelectedEditTask}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  setTodoDone={setTodoDone}
                  setOpenDrawer={setOpenDrawer}
                />
              </span>
            )} */}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TodoBox;
