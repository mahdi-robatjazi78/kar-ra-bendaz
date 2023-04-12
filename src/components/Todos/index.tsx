import React, { useContext, useState, useRef, useEffect } from "react";
import TodoPageFooter from "./todoListFooter";
import TodoList from "./todoList";
import { Box } from "@mui/material";
import TableListTodo from "./tableListTodo";
import SettingBar from "./settingBar";
import Toast from "@utils/toast";
import EmptyListAnimation from "@utils/emptyList/emptyListAnimation";
import TodoPageDrawer from "./drawer";
import ShowModalNewTodo from "./TodoModals/newTodo";
import { useHotkeys } from "react-hotkeys-hook";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TodoContext } from "@context/todoContext";
import Sidebar from "../sidebar";
import useWindowSize from "@/hooks/useWindowSize";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchActiveWs,
  GetOutCompleted,
  SearchModeActive,
  SearchModeDeActive,
  CloseSidebar,
  OpenSidebar,
  handleChangeMetaItem,
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
    drawer: {
      item: { _id: DrawerTodoId },
    },
    sidebar_open: open,
    searchMode,
    meta
  } = useSelector((state: RootState) => state.todoPageConfig);
  const { blur, headerPosition } = useSelector(
    (state: RootState) => state.settings
  );

  const [todoDeleteRequest, todoDeleteResponse] = useTodoDeleteMutation();
  const [
    todoAssignRequest,
    todoAssignResponse,
  ] = useTodoAssignToCategoryMutation();
  const [todoList, setTodoList] = useState([]);
  const emptyTodoList = () => {
    setTodoList([]);
  };
  const [categoList, setCategoList] = useState([]);
  const dimentions = useWindowSize().size;
  const [widthBoard, setWidthBoard] = useState(0);
  const [showModalAddTodo, setShowModalAddTodo] = useState(false);

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

  const UpdateOnlyTodos = (p = null, lmt = null, st = null) => {
    triggerGetTodoIndex({
      wsID: ActiveWorkspaceID,
      page: p ? p : meta?.page || 1,
      perPage: lmt ? lmt : meta?.limit || 20,
      searchText: st ? st : "",
    })
      .unwrap()
      .then((resp) => {
        setTodoList(resp?.todos);
        dispatch(handleChangeMetaItem({
          page: + resp?.meta?.page,
          limit: + resp?.meta?.limit,
          total_items: + resp?.meta?.total_items,
          total_pages: + resp?.meta?.total_pages,
        }))
      });
  };
  const UpdateOnlyCategories = () => {
    triggerGetCategoryIndex(ActiveWorkspaceID)
      .unwrap()
      .then((resp) => {
        setCategoList(resp?.list);
      });
  };
  const UpdateTodoAndCategories = () => {
    UpdateOnlyTodos();
    UpdateOnlyCategories();
  };

  useEffect(()=>{

    
    UpdateOnlyTodos(meta?.page,meta?.limit)

  },[meta.page , meta.limit])

  const DeleteTodoOperation = () => {
    todoDeleteRequest({ id: DrawerTodoId, ws: ActiveWorkspaceID });
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
    changeBodyRequest({ todoId, todoBody });
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

  const handleChangeMeta = (page, perPage) => {
    dispatch(handleChangeMetaItem({ page: page, limit: perPage }))
  };

  useEffect(() => {
    // for handeling dimentions of todo board
    let wb = dimentions[0];
    if (wb) {
      let b = wb - (open ? 270 : 40);
      setWidthBoard(b);
    }

    if (wb < 550) {
      if (open) {
        dispatch(CloseSidebar());
      }
    }
  }, [dimentions, open]);

  useHotkeys("alt+n", () => setShowModalAddTodo(true));
  useHotkeys("alt+c", () =>
    setShowAddCategoryModal({ show: true, state: "add", prevText: "" })
  );
  useHotkeys("ctrl+shift+f", () => {
    dispatch(SearchModeActive());
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Box id="todo-page-container">
        <Box
          display="flex"
          className={blur.sidebar ? "filterblur" : "filterblurnone"}
        >
          {open && (
            <Sidebar
              categoryList={categoList}
              totalTodoItems={meta?.total_items}
            />
          )}

          <SettingBar
            showAddCategoryModal={showAddCategoryModal}
            setShowAddCategoryModal={setShowAddCategoryModal}
            UpdateOnlyCategories={UpdateOnlyCategories}
          />
        </Box>

        <Box className="board">
          <Box
            className="todo-page-box"
            style={
              headerPosition === "top" || headerPosition === "bottom"
                ? {
                    justifyContent: "space-between",
                    height: window.innerHeight - 70,
                  }
                : headerPosition === "left" || headerPosition === "right"
                ? {
                    justifyContent: "space-between",
                    height: window.innerHeight,
                  }
                : {
                    justifyContent: "space-between",
                    height: window.innerHeight,
                  }
            }
          >
            <Box className="todo-list">
              {!todoList?.length && !searchMode ? (
                <Box>
                  <EmptyListAnimation text="Empty List 😐" />
                </Box>
              ) : show[0] === "table" ? (
                <TableListTodo todos={todoList} />
              ) : (
                <TodoList
                  todoList={
                    !ActiveCategoryID
                      ? todoList
                      : todoList.filter(
                          (item) => item.categoId === ActiveCategoryID
                        )
                  }
                  UpdateTodoAndCategories={UpdateTodoAndCategories}
                />
              )}
            </Box>
            <TodoPageFooter
              setShowModalAddTodo={setShowModalAddTodo}
              meta={meta}
              handleChangeMeta={handleChangeMeta}
              ActiveCategoryID={ActiveCategoryID}
              emptyTodoList={emptyTodoList}
              UpdateOnlyTodos={UpdateOnlyTodos}
              ActiveWorkspaceID={ActiveWorkspaceID}
              searchMode={searchMode}
              SearchModeActive={SearchModeActive}
              SearchModeDeActive={SearchModeDeActive}
              setCloseSidebar={() => dispatch(CloseSidebar())}
              setOpenSidebar={() => dispatch(OpenSidebar())}
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
          UpdateTodoAndCategories={UpdateTodoAndCategories}
        />
      ) : null}
    </DndProvider>
  );
};

export default Todos;
