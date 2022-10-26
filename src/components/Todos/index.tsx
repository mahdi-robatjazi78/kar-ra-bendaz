import React, { useContext, useState, useRef, useEffect } from "react";
import TodoPageFooter from "./todoListFooter";
import TodoList from "./todoList";
import { Box, Grid } from "@mui/material";
import TableListTodo from "./tableListTodo";
import SettingBar from "./settingBar";
import Axios from "@services/api";
import Toast from "@utils/toast";
import EmptyListAnimation from "@utils/emptyList/emptyListAnimation";
import TodoDrawer from "./TodoDrawer";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppDataContext } from "@context/appDataContext";
import { TodoContext } from "@context/todoContext";
import ThemeContext from "@context/themeContext";
import Sidebar from "../sidebar";
import { SidebarContext } from "@/context/sidebarContext";

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
  const {
    updateCategoryOn,
    selected,
    getAllTodos,
    todoList,
    drawerState,
  } = useContext(AppDataContext);
  // const [todoList, setTodoList] = useState([]);
  const { open } = useContext(SidebarContext);
  const [todoListCopy, setTodoListCopy] = useState([]);

  const [userSelectedCategory, setUserSelectedCategory] = useState({});

  const getSelectedCategoryData = async () => {
    try {
      const category = await Axios.get(`/category/getInfo?uuid=${selected}`);
      setUserSelectedCategory(category.data);
    } catch (error) {
      console.log(error.response);
    }
  };

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
    if (selected === "other") {
      setUserSelectedCategory({});
    } else {
      getSelectedCategoryData();
    }
  }, [selected]);

  const setTodoDone = async (todo) => {
    try {
      const response = await Axios.put("/todos/done", { id: todo._id });
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

      getAllTodos();

      Toast(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box display="flex">
        {open === "show" && <Sidebar />}
        <Box style={{ color: theme.text1, display: "flex" ,width:"100%" }} className="board">
          <SettingBar
            userSelectedCategory={userSelectedCategory}
            getSelectedCategoryData={getSelectedCategoryData}
            todoList={todoListCopy}
            getAllTodos={getAllTodos}
          />

           <TodoDrawer /> 
          <Box display="flex" flexDirection="column" style={{width:"100%"}}>
            <Box
              style={{ height:"80vh", overflowY:"auto"}}
             
             >
            {!todoListCopy.length ? (
              <Box>
                <EmptyListAnimation text="Empty List 😐" />
              </Box>
            ) : show[0] === "table" ? (
              <TableListTodo
                todos={todoListCopy}
                getAllTodos={getAllTodos}
                deleteTodo={deleteTodo}
                // editTodo={editTodo}
                setTodoDone={setTodoDone}
              />
            ) : (
              <TodoList
                todoList={todoListCopy}
                getAllTodos={getAllTodos}
                // editTodo={editTodo}
                setTodoDone={setTodoDone}
              />
            )}
            </Box>
            <Box position="relative" 
             >
              <TodoPageFooter
                getAllTodos={getAllTodos}
                userSelectedCategory={userSelectedCategory}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default Todos;
