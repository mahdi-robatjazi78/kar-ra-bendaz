import React, {useEffect, useState} from "react";
import TodoPageFooter from "./todoListFooter";
import TodoList from "./todoList";
import {Box} from "@mui/material";
import TableListTodo from "./tableListTodo";
import SettingBar from "./settingBar";
import Toast from "@utils/toast";
import EmptyListAnimation from "@utils/emptyList/emptyListAnimation";
import TodoPageDrawer from "./drawer";
import ShowModalNewTodo from "./TodoModals/newTodo";
import {useHotkeys} from "react-hotkeys-hook";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Sidebar from "../sidebar";
import useWindowSize from "@/hooks/useWindowSize";
import {useDispatch, useSelector} from "react-redux";
import {
  AddMouseSelectedItems,
  clearMouseSelectedItems,
  CloseSidebar,
 
  handleChangeMetaItem,
  OpenSidebar,
  SearchModeActive,
  SearchModeDeActive,
  SetActiveWs,
} from "@/redux/features/todoPageConfigSlice";
import {useNavigate} from "react-router-dom";
import {useLazyGetCategoryIndexQuery} from "@/redux/api/categories";
import {
  useChangeBodyMutation,
  useLazyGetTodoIndexQuery,
  useTodoAssignToCategoryMutation,
  useTodoDeleteMutation,
} from "@/redux/api/todos";
import {AppDispatch, RootState} from "@/redux/store";
import {deactiveBlur} from "@/redux/features/settingSlice";
import ShowModalNewCategory from "./TodoModals/newCategory";
import BulkFunction from "./TodoModals/bulkFunction";
import {deselectAllTodos, soundPlay} from "@/util/funcs";
import {setThreeColAll} from "@/redux/features/todoLayoutSlice";
import {useGetActiveWsQuery} from "@/redux/api/workspaces";

const Todos = () => {
  const {todoPageLayout: show} = useSelector(
    (state: RootState) => state.todoLayout
  );

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const {
    active_ws: {id: ActiveWorkspaceID},
    active_category: {id: ActiveCategoryID},
    drawer: {
      item: {_id: DrawerTodoId},
    },
    sidebar_open: open,
    searchMode,
    meta,
    layout_nav_show,
    mouse_selected_items,
  } = useSelector((state: RootState) => state.todoPageConfig);
  const {blur, headerPosition, playSound} = useSelector(
    (state: RootState) => state.settings
  );
  const {
    data: DataGetActiveWsQuery = [],
    isSuccess: iSuccessGetActiveWsQuery,
    isError: isErrorGetActiveWsQuery,
    refetch: RefetchGetActiveWsQuery,
  } = useGetActiveWsQuery({});

  const [todoDeleteRequest, todoDeleteResponse] = useTodoDeleteMutation();
  const [todoAssignRequest, todoAssignResponse] =
    useTodoAssignToCategoryMutation();
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

  const [triggerGetCategoryIndex, categoryResponse] =
    useLazyGetCategoryIndexQuery();
  const [triggerGetTodoIndex, todosResponse] = useLazyGetTodoIndexQuery();
  const [changeBodyRequest, setChangeBodyRequest] = useChangeBodyMutation();
  const [openBulkFunctionModal, setOpenBulkFunctionModal] =
    React.useState(false);
  const UpdateOnlyTodos = (p = null, lmt = null, st = null) => {
    setTodoList([]);

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
            total_items: resp?.meta?.total_items,
            total_pages: resp?.meta?.total_pages,
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
    todoDeleteRequest({id: DrawerTodoId, ws: ActiveWorkspaceID});
    UpdateTodoAndCategories();
    if (playSound) {
      soundPlay("sound1.wav");
    }
    dispatch(deactiveBlur());
  };

  const HandleTodoAssignToCategory = (categoId) => {
    todoAssignRequest({todoId: DrawerTodoId, categoId})
      .then((resp) => {
        if (playSound) {
          soundPlay("sound6.wav");
        }
        Toast(resp.data.msg, true, true);
        UpdateTodoAndCategories();
      })
      .catch((error) => {
      });
  };

  const HandleTodoChangeBody = (todoId: string, todoBody: string) => {
    changeBodyRequest({todoId, todoBody})
      .then((resp) => {
        Toast(resp?.data?.msg, true, true);

        if (playSound) {
          soundPlay("sound4.wav");
        }
        UpdateOnlyTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (ActiveWorkspaceID) {
      UpdateTodoAndCategories();
    } else {
      if (iSuccessGetActiveWsQuery && DataGetActiveWsQuery.activeWorkspace.id) {
        const {id, title} = DataGetActiveWsQuery.activeWorkspace;

        dispatch(SetActiveWs({id, title}));
      }else{
        Toast("Please first active one workspace then go to todo page" , false , true , "⛔")
        navigate("/");
      }
    }
  }, [ActiveWorkspaceID, iSuccessGetActiveWsQuery]);

 

  const handleChangeMeta = (page, perPage) => {
    dispatch(handleChangeMetaItem({page: page, limit: perPage}));
  };

  useHotkeys("alt+n", () => setShowModalAddTodo(true));
  useHotkeys("alt+c", () =>
    setShowAddCategoryModal({show: true, state: "add", prevText: ""})
  );
  useHotkeys("ctrl+shift+f", () => {
    dispatch(SearchModeActive());
  });

  useEffect(() => {
    if (sizeName === "mobile") {
      if (+show[2] > 2) {
        dispatch(setThreeColAll(2));
      }
    } else {
      switch (sizeName) {
        case "tablet":
          if (+show[2] > 3) {
            dispatch(setThreeColAll(3));
          }
          break;
        case "laptop":
          if (+show[2] == 6) {
            dispatch(setThreeColAll(5));
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
    deselectAllTodos();
  };


  useHotkeys("ctrl+a", () => {
    dispatch(AddMouseSelectedItems(
      {
        count: todoList.length,
        entity: "todo",
        items: todoList.map(item => {
          return {boxTodoId: item._id, innerTodoText: item.body}
        })
      }
    ))
  });


  return (
    <DndProvider backend={HTML5Backend}>
      <Box id="todo-page-container">
        <Box
          className={`${
            sizeName === "mobile" || sizeName === "tablet"
              ? "parent-ghost-sidebar"
              : "parent-normal-sidebar"
          }`}
          style={{...(blur.sidebar && {filter: `blur(${blur.size}px)`})}}
        >
          {open && (
            <Sidebar
              categoryList={categoList}
              totalTodoItems={meta?.total_items}
            />
          )}

          {layout_nav_show ? (
            <SettingBar setShowAddCategoryModal={setShowAddCategoryModal}/>
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
                  <EmptyListAnimation text="Empty List 😐"/>
                </Box>
              ) : show[0] === "table" ? (
                <TableListTodo todos={todoList}/>
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
