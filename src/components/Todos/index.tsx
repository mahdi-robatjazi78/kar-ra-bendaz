import React, { useContext, useState, useRef, useEffect } from "react";
import ThemeContext from "../../context/colorModeContext";
import InputNewTask from "./input";
import TodoList from "./todoList";
import axios from "axios";
import { Box } from "@mui/material";
import { TodoContext } from "../../context/todoContext";
import TableListTodo from "./tableListTodo";

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
  const [newTask, setNewTask] = useState<string>("");
  const [todoList, setTodoList] = useState([]);
  const [todoListCopy, setTodoListCopy] = useState([]);
  const [selectedEditTask, setSelectedEditTask] = useState<ITodoStructure>({
    title: "",
    _id: "",
    body: "",
    flag: "",
    date: "",
  });
  const [status, setStatus] = useState("add");

  useEffect(() => {
    setNewTask(selectedEditTask?.body);
  }, [selectedEditTask]);

  useEffect(() => {
    if (todoList.length > 0) {
      if (show[1] === "all") {
        setTodoListCopy(todoList);
      } else {
        const filteredTodo = todoList.filter((todo) => todo.flag === "isDone");
        setTodoListCopy(filteredTodo);
      }
    }
  }, [show, todoList]);

  const getAllTodos = async () => {
    try {
      const result = await axios.get("http://localhost:5000/todos/getAll");
      console.log("****", result);
      setTodoList(result.data.todos.reverse());
    } catch (error) {
      console.log(error.response);
    }
  };

  const AddNewTask = async () => {
    try {
      if (status === "add") {
        console.log("axios here");
        const result = await axios.post("http://localhost:5000/todos/newTodo", {
          todo: newTask,
        });

        console.log(result);
        setNewTask("");
        getAllTodos();
      } else {
        const response = await axios.put(
          "http://localhost:5000/todos/update-body",
          {
            id: selectedEditTask._id,
            body: newTask,
          }
        );
        console.log(response);
        setNewTask("");
        setStatus("add")
        getAllTodos();

      }
    } catch (error) {
      console.log(error.repsonse);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <Box display="flex" alignItems="flex-start" flexDirection="column">
      <Box
        style={{ minHeight: "80vh", maxHeight: "80vh", overflowY: "scroll" }}
      >
        {show[0] === "table" ? (
          <TableListTodo
            todo={todoListCopy}
            getAllTodos={getAllTodos}
            setSelectedEditTask={setSelectedEditTask}
          />
        ) : (
          <TodoList
            todoList={todoListCopy}
            getAllTodos={getAllTodos}
            setSelectedEditTask={setSelectedEditTask}
          />
        )}
      </Box>
      <Box>
        <InputNewTask
          newTask={newTask}
          setNewTask={setNewTask}
          AddNewTask={AddNewTask}
          selectedEditTask={selectedEditTask}
          status={status}
          setStatus={setStatus}
        />
      </Box>
    </Box>
  );
};

export default Todos;
