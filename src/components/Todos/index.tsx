import React, { useContext, useState, useRef, useEffect } from "react";
import TodoPageFooter from "./todoListFooter";
import TodoList from "./todoList";
import { Box } from "@mui/material";
import TableListTodo from "./tableListTodo";
import SettingBar from "./settingBar";
import Axios from "@services/api";
import Toast from "@utils/toast";
import EmptyListAnimation from "@utils/emptyList/emptyListAnimation";
import TodoDrawer from "./TodoDrawer";
import ShowModalNewTodo from "./TodoModals/newTodo";
import { useHotkeys } from "react-hotkeys-hook";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppDataContext } from "@context/appDataContext";
import { TodoContext } from "@context/todoContext";
import ThemeContext from "@context/themeContext";
import Sidebar from "../sidebar";
import { SidebarContext } from "@/context/sidebarContext";
import useWindowSize from "@/hooks/useWindowSize";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchActiveWs,
  GetOutCompleted,
  ITodoPage
} from "@/redux/features/todoPageConfigSlice";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const theme = useContext(ThemeContext);
  const { show } = useContext(TodoContext);
  const {
    updateCategoryOn,
    selected,
    getAllTodos,
    todoList,
    drawerState,
    headerPosition,
    selectedWorkspace,
  } = useContext(AppDataContext);
  // const [todoList, setTodoList] = useState([]);
  const { open, setCloseSidebar } = useContext(SidebarContext);
  const [todoListCopy, setTodoListCopy] = useState([]);
  const dimentions = useWindowSize();
  const [widthBoard, setWidthBoard] = useState(0);
  const [showModalAddTodo, setShowModalAddTodo] = useState(false);
  const [userSelectedCategory, setUserSelectedCategory] = useState({});
  const [showCategoryModalActions, setShowCategoryModalActions] = useState(
    false
  );
  const [showAddCategoryModal, setShowAddCategoryModal] = useState({
    show: false,
    state: "add",
    prevText: "",
  });

  const {
    active_ws: { id: ActiveWorkspaceID, title: ActiveWorkspaceTitle },
    get_out: GetOutFromTodoPage,
} = useSelector((state) => state.todoPageConfig);

  const dispatch = useDispatch();
  const getSelectedCategoryData = async () => {
    try {
      const category = await Axios.get(`/category/getInfo?uuid=${selected}`);
      setUserSelectedCategory(category.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!ActiveWorkspaceID) {
      dispatch(fetchActiveWs());
    }
  }, [ActiveWorkspaceID]);
  useEffect(() => {
    if (GetOutFromTodoPage) {
      dispatch(GetOutCompleted());
      navigate("/");
    }
  }, [GetOutFromTodoPage]);

  useEffect(() => {
    if (show[1] === "all") {
      setTodoListCopy(todoList);
    } else {
      const filteredTodo = todoList.filter((todo) => todo.flag === "isDone");
      setTodoListCopy(filteredTodo);
    }
  }, [show, todoList]);

  useEffect(() => {
    if (selectedWorkspace.id) {
      getAllTodos();
      if (selected === "other") {
        setUserSelectedCategory({});
      } else {
        getSelectedCategoryData();
      }
    }
  }, [selected, selectedWorkspace]);

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
      const response = await Axios.delete(
        `/todos/delete/${todo._id}?ws=${selectedWorkspace.id}`
      );

      getAllTodos();

      Toast(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // for handeling dimentions of todo board
    let wb = dimentions[0];
    if (wb) {
      let b = wb - (open === "show" ? 270 : 40);
      setWidthBoard(b);
    }

    if (wb < 550) {
      if (open === "show") {
        setCloseSidebar();
      }
    }
  }, [dimentions, open]);

  useHotkeys("alt+n", () => setShowModalAddTodo(true));
  useHotkeys("alt+c", () =>
    setShowAddCategoryModal({ show: true, state: "add", prevText: "" })
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Box id="todo-page-container">
        <Box display="flex">
          {open === "show" && <Sidebar />}

          <SettingBar
            userSelectedCategory={userSelectedCategory}
            getSelectedCategoryData={getSelectedCategoryData}
            showCategoryModalActions={showCategoryModalActions}
            setShowCategoryModalActions={setShowCategoryModalActions}
            showAddCategoryModal={showAddCategoryModal}
            setShowAddCategoryModal={setShowAddCategoryModal}
          />
        </Box>

        <Box
          className="board"
          // style={{width:"100%"}}
        >
          <Box
            className="todo-page-box"
            style={
              headerPosition === "top"
                ? { justifyContent: "start" }
                : headerPosition === "bottom"
                ? { justifyContent: "end" }
                : {}
            }
          >
            <Box
              className="todo-list"
              style={
                headerPosition === "top" || headerPosition === "bottom"
                  ? { height: "83%" }
                  : { height: "100%" }
              }
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
            <TodoPageFooter
              userSelectedCategory={userSelectedCategory}
              showModalAddTodo={showModalAddTodo}
              setShowModalAddTodo={setShowModalAddTodo}
            />
          </Box>
        </Box>
      </Box>
      <TodoDrawer />
      {showModalAddTodo ? (
        <ShowModalNewTodo setShowModalAddTodo={setShowModalAddTodo} />
      ) : null}
    </DndProvider>
  );
};

export default Todos;
