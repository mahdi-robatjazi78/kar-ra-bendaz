import React, { useContext, useState, useEffect } from "react";
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
  clearMouseSelectedItems,
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
import ShowModalNewCategory from "./TodoModals/newCategory";
import BulkFunction from "./TodoModals/bulkFunction";

const Todos = () => {
  const { show, setThreeColAll } = useContext(TodoContext);
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
    meta,
    layout_nav_show,
    mouse_selected_items,
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
  const sizeName = useWindowSize().sizeName;
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
  const [openBulkFunctionModal, setOpenBulkFunctionModal] = React.useState(
    false
  );
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
        dispatch(
          handleChangeMetaItem({
            page: +resp?.meta?.page,
            limit: +resp?.meta?.limit,
            total_items: +resp?.meta?.total_items,
            total_pages: +resp?.meta?.total_pages,
          })
        );
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

  useEffect(() => {
    UpdateOnlyTodos(meta?.page, meta?.limit);
  }, [meta.page, meta.limit]);

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
    dispatch(handleChangeMetaItem({ page: page, limit: perPage }));
  };

  useHotkeys("alt+n", () => setShowModalAddTodo(true));
  useHotkeys("alt+c", () =>
    setShowAddCategoryModal({ show: true, state: "add", prevText: "" })
  );
  useHotkeys("ctrl+shift+f", () => {
    dispatch(SearchModeActive());
  });

  useEffect(() => {
    if (sizeName === "mobile") {
      if (show[2] > 2) {
        setThreeColAll(2);
      }
    } else {
      switch (sizeName) {
        case "tablet":
          if (show[2] > 3) {
            setThreeColAll(3);
          }
          break;
        case "laptop":
          if (show[2] == 6) {
            setThreeColAll(5);
          }
          break;
        case "pc":
          break;
        default:
          break;
      }
    }
  }, [sizeName]);

  const handleCloseBulkFunctionModal = () => {
    setOpenBulkFunctionModal(false);
    dispatch(clearMouseSelectedItems());
    const elements = document.querySelectorAll(".mouse-drag-selected");
    if (elements.length) {
      elements.forEach(function(element) {
        element.classList.remove("mouse-drag-selected");
      });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box id="todo-page-container">
        <Box
          className={`${
            sizeName === "mobile" || sizeName === "tablet"
              ? "parent-ghost-sidebar"
              : "parent-normal-sidebar"
          }`}
          style={{ ...(blur.sidebar && { filter: `blur(${blur.size}px)` }) }}
        >
          {open && (
            <Sidebar
              categoryList={categoList}
              totalTodoItems={meta?.total_items}
            />
          )}

          {layout_nav_show ? (
            <SettingBar setShowAddCategoryModal={setShowAddCategoryModal} />
          ) : null}
        </Box>
        {(sizeName === "mobile" || sizeName === "tablet") &&
          layout_nav_show && (
            <Box className="empty-space">
              {/* empty space for fix layout */}
            </Box>
          )}

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
              setShowAddCategoryModal={() => {
                setShowAddCategoryModal({
                  show: true,
                  state: "add",
                  prevText: "",
                });
              }}
              setOpenBulkFunctionModal={setOpenBulkFunctionModal}
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

      {showAddCategoryModal.show && (
        <ShowModalNewCategory
          setShowAddCategoryModal={setShowAddCategoryModal}
          showAddCategoryModal={showAddCategoryModal}
          UpdateOnlyCategories={UpdateOnlyCategories}
        />
      )}

      {openBulkFunctionModal && (
        <BulkFunction
          open={openBulkFunctionModal}
          onClose={handleCloseBulkFunctionModal}
          data={mouse_selected_items}
          UpdateOnlyTodos={UpdateOnlyTodos}
          UpdateTodoAndCategories={UpdateTodoAndCategories}
          categoList={categoList}
        />
      )}
    </DndProvider>
  );
};

export default Todos;
