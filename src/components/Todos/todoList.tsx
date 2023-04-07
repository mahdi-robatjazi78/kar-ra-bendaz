import React, { useContext , useEffect , useState } from "react";
import { Grid, } from "@mui/material"; 
import TodoBox from "./todoBox";
import { TodoContext } from "@context/todoContext";




const TodoList = (props: any) => {
  const { todoList ,UpdateTodoAndCategories } = props;
  const[todoItems , setTodoItems]  = useState([]) 
  const {show} = useContext(TodoContext)
  
  const filter = show[1]

  useEffect(()=>{
    if(filter === "done"){
      let result = todoList.filter((item)=>{
        if(item.flag === "isDone"){
          return item
        }
      })
      setTodoItems(result)
    }else{
      setTodoItems(todoList); 
    }
  },[filter , todoList.length])



  

  return (
    <Grid container spacing={2} id="todo-grid-list">
      {todoItems.map(({ _id, body, flag , categoId }, index: number , array:[]) => (
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
