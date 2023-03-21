import React, { useContext, useState, useRef, useEffect } from "react";
import TodoPageFooter from "./todoListFooter";
import TodoList from "./todoList";
import { Box } from "@mui/material";
import TableListTodo from "./tableListTodo";
import SettingBar from "./settingBar";
import Axios from "@services/api";
import Toast from "@utils/toast";
import EmptyListAnimation from "@utils/emptyList/emptyListAnimation";
import TodoPageDrawer from "./drawer";
import ShowModalNewTodo from "./TodoModals/newTodo";
import { useHotkeys } from "react-hotkeys-hook";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppDataContext } from "@context/appDataContext";
import { TodoContext } from "@context/todoContext";
import Sidebar from "../sidebar";
import { SidebarContext } from "@/context/sidebarContext";
import useWindowSize from "@/hooks/useWindowSize";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchActiveWs,
  GetOutCompleted,
  DrawerOpen,
  DrawerClose,
} from "@/redux/features/todoPageConfigSlice";
import { useNavigate } from "react-router-dom";
import { useLazyGetCategoryIndexQuery } from "@/redux/api/categories";
import {
  useLazyGetTodoIndexQuery,
  useTodoDeleteMutation,
  useTodoAssignToCategoryMutation,
  useChangeBodyMutation,
} from "@/redux/api/todos";
import { AppDispatch, RootState } from "@/redux/store";
import { deactiveBlur } from "@/redux/features/settingSlice";

const Todos = () => {
  const { show } = useContext(TodoContext);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const {
    active_ws: { id: ActiveWorkspaceID, title: ActiveWorkspaceTitle },
    active_category: { id: ActiveCategoryID, title: ActiveCategoryTitle },
    get_out: GetOutFromTodoPage,
    drawer:{item : {_id : DrawerTodoId}}
  } = useSelector((state: RootState) => state.todoPageConfig);

  const [todoDeleteRequest, todoDeleteResponse] = useTodoDeleteMutation();
  const [
    todoAssignRequest,
    todoAssignResponse,
  ] = useTodoAssignToCategoryMutation();

  const {
    updateCategoryOn,
    selected,
    drawerState,
    headerPosition,
    selectedWorkspace,
  } = useContext(AppDataContext);
  const [todoList, setTodoList] = useState([]);
  const [categoList, setCategoList] = useState([]);
  const { open, setCloseSidebar } = useContext(SidebarContext);
  const [todoListCopy, setTodoListCopy] = useState([]);
  const dimentions = useWindowSize();
  const [widthBoard, setWidthBoard] = useState(0);
  const [showModalAddTodo, setShowModalAddTodo] = useState(false);
  const [showCategoryModalActions, setShowCategoryModalActions] = useState(
    false
  );
  const [showAddCategoryModal, setShowAddCategoryModal] = useState({
    show: false,
    state: "add",
    prevText: "",
  });

  const [
    triggerGetCategoryIndex,
    categoryResponse,
  ] = useLazyGetCategoryIndexQuery();
  const [triggerGetTodoIndex, todosResponse] = useLazyGetTodoIndexQuery();
  const [changeBodyRequest, setChangeBodyRequest] = useChangeBodyMutation();

  const UpdateOnlyTodos = () => {
    triggerGetTodoIndex({
      wsID: ActiveWorkspaceID,
    }).unwrap().then((resp)=>{
      setTodoListCopy(resp?.todos);
    });
  };
  const UpdateOnlyCategories = () => {
    triggerGetCategoryIndex(ActiveWorkspaceID).unwrap().then((resp)=>{
      setCategoList(resp?.list);

    });
  };
  const UpdateTodoAndCategories = () => {
    UpdateOnlyTodos();
    UpdateOnlyCategories();
  };

  const DeleteTodoOperation = () => {
    todoDeleteRequest({ id: DrawerTodoId , ws: ActiveWorkspaceID })
        UpdateTodoAndCategories();
        dispatch(deactiveBlur());
    
  };

  const HandleTodoAssignToCategory = (todoId, categoId) => {
    todoAssignRequest({ todoId, categoId })
      .then((resp) => {
        Toast(resp.data.msg);
        UpdateTodoAndCategories();
      })
      .catch((error) => {});
  };

  const HandleTodoChangeBody = (todoId, todoBody) => {
    changeBodyRequest({ todoId, todoBody })
    UpdateOnlyTodos();
  };

  useEffect(() => {
    if (!ActiveWorkspaceID) {
      dispatch(fetchActiveWs());
    } else {
      UpdateTodoAndCategories();
    }
  }, [ActiveWorkspaceID]);

  useEffect(() => {
    if (GetOutFromTodoPage) {
      dispatch(GetOutCompleted());
      navigate("/");
    }
  }, [GetOutFromTodoPage]);


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
          {open === "show" && <Sidebar categoryList={categoList} />}

          <SettingBar
            showCategoryModalActions={showCategoryModalActions}
            setShowCategoryModalActions={setShowCategoryModalActions}
            showAddCategoryModal={showAddCategoryModal}
            setShowAddCategoryModal={setShowAddCategoryModal}
            UpdateOnlyCategories={UpdateOnlyCategories}
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
                  ? { height: "85%" }
                  : { height: "100%" }
              }
            >
              {!todoListCopy.length ? (
                <Box>
                  <EmptyListAnimation text="Empty List 😐" />
                </Box>
              ) : show[0] === "table" ? (
                <TableListTodo todos={todoListCopy} />
              ) : (
                <TodoList
                  todoList={
                    !ActiveCategoryID
                      ? todoListCopy
                      : todoListCopy.filter(
                          (item) => item.categoId === ActiveCategoryID
                        )
                  }
                  UpdateTodoAndCategories={UpdateTodoAndCategories}
                />
              )}
            </Box>
            <TodoPageFooter
              // userSelectedCategory={userSelectedCategory}
              showModalAddTodo={showModalAddTodo}
              setShowModalAddTodo={setShowModalAddTodo}
            />
          </Box>
        </Box>
      </Box>
      <TodoPageDrawer
        UpdateTodoAndCategories={UpdateTodoAndCategories}
        DeleteTodoOperation={DeleteTodoOperation}
        CategoryList={categoList}
        HandleTodoAssignToCategory={HandleTodoAssignToCategory}
        HandleTodoChangeBody={HandleTodoChangeBody}
        UpdateOnlyTodos={UpdateOnlyTodos}
        UpdateOnlyCategories={UpdateOnlyCategories}
      />
      {showModalAddTodo ? (
        <ShowModalNewTodo
         setShowModalAddTodo={setShowModalAddTodo}
         UpdateTodoAndCategories={UpdateTodoAndCategories} />
         
      ) : null}
    </DndProvider>
  );
};

export default Todos;
