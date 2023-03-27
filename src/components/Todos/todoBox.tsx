import React, { useContext, useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { TodoContext } from "@context/todoContext";
import { AppDataContext } from "@context/appDataContext";
import ThemeContext from "../../context/themeContext";
import Toast from "@utils/toast";
import { useDragDropAssignToCategoryMutation } from "@/redux/api/todos";
import {useDispatch , useSelector} from 'react-redux'
import { RootState , AppDispatch } from "@/redux/store";
import {setBlurPage} from '@/redux/features/settingSlice'
import { DrawerOpen } from "@/redux/features/todoPageConfigSlice";

export interface BoxProps {
  name: string;
}

interface DropResult {
  name: string;
  id: string;
}

const TodoBox = (props: any) => {
  
  const { id, categoId ,flag, body,todos,index,UpdateTodoAndCategories} = props;

    const [category , setCategory]=useState(categoId ? categoId : "")

  useEffect(()=>{
    setCategory(categoId ? categoId : todos[index]?.categoId)
  },[todos[index].categoId])

  const theme = useContext(ThemeContext);
  const { show } = useContext(TodoContext); 
  const dispatch : AppDispatch = useDispatch()

  
  const [assignToCategoryRequest , assignToCategoryResponse] = useDragDropAssignToCategoryMutation()



  const addToCategoryWithDragDrop = (item: any, dropResult: any ) => {

    if(category === dropResult.id){
      Toast("Please drop todo to another category" , false)
      return 
    }

      if (dropResult?.id == null || dropResult?.id === "other") {
        assignToCategoryRequest({
          todoId: id,
          prevCategoId: category,
          newCategoId: "other",
        }).then(resp=>{
          Toast(resp.data.msg);
          UpdateTodoAndCategories()
        }).catch(error=>{

        })
  
      } else { 
        assignToCategoryRequest({
          todoId: id,
          prevCategoId: category || "",
          newCategoId: dropResult?.id,
        }).then(resp=>{
          Toast(resp.data.msg);
          UpdateTodoAndCategories()
        }).catch(error=>{

        })
      }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo-box",
    item: { todo: category },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        console.log("previus" , item , isDragging)
        addToCategoryWithDragDrop(item, dropResult);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  })  , [category]);
  const opacity = isDragging ? 0.4 : 1;

  return (
    <Grid
      key={index}
      item
      xs={12}
      sm={
        show[0] === "1col"
          ? 12
          : show[2] === 2
          ? 6
          : show[2] === 3
          ? 4
          : show[2] === 4
          ? 3
          : show[2] === 5
          ? 2.4
          : 2
      }
      className="todo-box-grid"
    >
      <Card
        className="todo-box"
        data-testid="box"
        ref={drag}
        sx={{
          opacity,
          background:
            flag === "isDone"
              ? "rgb(163, 206, 168)"
              : "rgba( 255, 255, 255, 0.25 )",
          border: "2px solid gray",
        }}
        onClick={() => {
         dispatch(DrawerOpen({state : "todo" ,item:todos[index]}))
          dispatch(setBlurPage())
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
