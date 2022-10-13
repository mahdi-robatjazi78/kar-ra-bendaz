import React, { useContext, useState, useRef, useEffect } from "react";
import { SelectedCategoryContext} from "@context/selectCategoryContext";
import InputNewTask from "./newTask";
import TodoList from "./todoList";
import { Box, Typography } from "@mui/material";
import TableListTodo from "./tableListTodo";
import SettingBar from "./settingBar";
import Axios from "@services/api";
import Toast from "@utils/toast";
import EmptyListAnimation from "@utils/emptyList/emptyListAnimation"; 
import TodoDrawer from "./TodoDrawer";

import { AppDataContext } from "@context/appDataContext";
import { TodoContext } from "@context/todoContext";
import ThemeContext from "@context/themeContext";

interface ITodoStructure {
  title: string;
  body: string;
  date: string;
  flag: string;
  _id: string;
}

const Todos = () => {
  const theme = useContext(ThemeContext);
  const { show } = useContext(TodoContext);
  const { selected } = useContext(SelectedCategoryContext);
  const { updateCategoryOn } = useContext(AppDataContext);
  const { getAllTodos , todoList } = useContext(AppDataContext);
  // const [todoList, setTodoList] = useState([]);

  const [todoListCopy, setTodoListCopy] = useState([]);
  const [selectedEditTask, setSelectedEditTask] = useState<ITodoStructure>({
    title: "",
    _id: "",
    body: "",
    flag: "",
    date: "",
  });
  const [status, setStatus] = useState("");
  const [userSelectedCategory , setUserSelectedCategory] = useState({})
  // const [showAddTaskModalKeyboard , setShowAddTaskModalKeyboard] = useState(false)
  // const [showAddCategoModalKeyboard , setShowAddCategoModalKeyboard] = useState(false)


  const getSelectedCategoryData = async()=>{
    try{
      
      const category = await Axios.get(`/category/getInfo?uuid=${selected}`)
      setUserSelectedCategory(category.data)

    }catch(error){
      console.log(error.response)
    }
  }

  useEffect(() => {
    
      if (show[1] === "all") {
        setTodoListCopy(todoList);
      } else {
        const filteredTodo = todoList.filter((todo) => todo.flag === "isDone");
        setTodoListCopy(filteredTodo);
      }
    
  }, [show, todoList]);




  useEffect(() => {
    getAllTodos();
    if(selected === "all-todos"){
      setUserSelectedCategory({})
    }else{
      getSelectedCategoryData() 
    }
    
  }, [selected]);

 

  // const getAllTodos = async () => {

  //   console.log("selcted>>>>" , selected)

  //   try {
  //     const result = await Axios.get(`/todos/getAll?category=${selected || "all-task"}`)
  //     setTodoList(result.data.todos.reverse());
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error.response);
  //     // Toast(error.response.msg, false);
  //   }
  // };

  const Submit = async (newTask,modalStatus , intoCategory=false) => {
    try {

      console.log("status ,>>>s" , modalStatus)


      if (modalStatus === "add") {
        const response = await Axios.post("/todos/newTodo", {
          todo: newTask,
          ...(intoCategory && {categoId:selected})
        });
        console.log(response);
        getAllTodos();
        updateCategoryOn()
        Toast(response.data.msg);
      } else {
        const response = await Axios.put("/todos/update-body", {
          id: selectedEditTask._id,
          body: newTask,
        });
        console.log(response);
        // setNewTask("");
        setStatus("add");
        getAllTodos();
     
      }
    } catch (error) {
      console.log(error);
      if(error.response){
        
          console.log(error.response);
        Toast(error.response.msg, false);
      }
    }
  };

  const setTodoDone = async (todo) => {
    try {
      const response = await Axios.put("/todos/done", { id: todo._id });

      console.log(response);
      if (response.status === 200) {
        getAllTodos();

        Toast(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      Toast(error.response.data, false);
    }
  };

  const deleteTodo = async (todo) => {
    try {
      const response = await Axios.delete(`/todos/delete/${todo._id}`);

      console.log(response);

      updateCategoryOn();
      getAllTodos();

      Toast(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = (todo) => {
    setSelectedEditTask(todo);
    setStatus("edit");
  };

  return (
    <Box display="flex">
    
      
      <SettingBar 
      // showAddCategoModalKeyboard={showAddCategoModalKeyboard}
       userSelectedCategory={userSelectedCategory}  
       getSelectedCategoryData={getSelectedCategoryData}
       todoList={todoListCopy}
       getAllTodos={getAllTodos}
      />
      <Box
        className="task-board-screen"
        position="relative"
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        width="100%"
      >
        <Box
          style={{ minHeight: "80vh", maxHeight: "80vh", overflowY: "scroll" }}
        >
          <TodoDrawer />

          {!todoListCopy.length ? (
            <Box>
              <EmptyListAnimation text="Empty List 😐" />
            </Box>
          ) : show[0] === "table" ? (
            <TableListTodo
              todos={todoListCopy}
              getAllTodos={getAllTodos}
              setSelectedEditTask={setSelectedEditTask}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              setTodoDone={setTodoDone}
            />
          ) : (
            <TodoList
              todoList={todoListCopy}
              getAllTodos={getAllTodos}
              setSelectedEditTask={setSelectedEditTask}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              setTodoDone={setTodoDone}
              
            />
          )}
        </Box>
        <Box position="relative" width="100%">
        <InputNewTask
          getAllTodos={getAllTodos}
          userSelectedCategory={userSelectedCategory}
          Submit={Submit}
          selectedEditTask={selectedEditTask}
          status={status}
          setStatus={setStatus}
          // showAddTaskModalKeyboard={showAddTaskModalKeyboard}
        />
        </Box>
      </Box>
    </Box>
  );
};

export default Todos;
