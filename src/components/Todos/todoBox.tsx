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
import useDebounce from "@hooks/useDebounce";

export interface BoxProps {
  name: string;
}

interface DropResult {
  name: string;
  id: string;
}

const TodoBox = (props: any) => {
  const {searchMode,searchText} = useSelector((state: RootState) => state.todoPageConfig);
  const { id, categoId ,flag, body,todos,index,UpdateTodoAndCategories} = props;

    const [category , setCategory]=useState(categoId ? categoId : "")

  useEffect(()=>{
    setCategory(categoId ? categoId : todos[index]?.categoId)
  },[todos[index].categoId])

  const theme = useContext(ThemeContext);
  const { show } = useContext(TodoContext); 
  const dispatch : AppDispatch = useDispatch()
  const [todoBody , setTodoBody] = useState(body)
  
  const [assignToCategoryRequest , assignToCategoryResponse] = useDragDropAssignToCategoryMutation()
  function handleSearchModeShow (){
    if(searchMode && searchText.length > 0){
      let re = new RegExp(searchText, "gi");
      
      if(body.indexOf(searchText) === -1){
        // case sensitive search stuff
      let indexOf = body.toLowerCase().indexOf(searchText.toLowerCase())
      let searchedLength = searchText.length;
      let str = body.substring(indexOf , indexOf+searchedLength)
      const result = body.replace( re ,`<span class="highlighted-todo-text">${str}</span>`)
      setTodoBody(result)
      }else{
        const result = body.replace( re ,`<span class="highlighted-todo-text">${searchText}</span>`)
        setTodoBody(result)
      } 
     
    }else if(searchMode && !searchText){
      setTodoBody(body)
    }
    else if(!searchMode){
      setTodoBody(body)
    }
  }
  
  // DeBounce Function
  useDebounce(() => {
    if(searchMode){
      handleSearchModeShow()
    }
  }, [searchMode , searchText], 600
);



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
          <div
            style={{
              fontSize: 14,
              color: flag === "isDone" ? "black" : theme.text1,
            }}

            dangerouslySetInnerHTML={{
              __html:todoBody
            }}

          > 
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TodoBox;
