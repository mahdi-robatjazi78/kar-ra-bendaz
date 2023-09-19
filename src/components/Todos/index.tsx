import React, { useEffect, useState } from "react";
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
import Sidebar from "../sidebar";
import useWindowSize from "@/hooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import {
  AddMouseSelectedItems,
  clearMouseSelectedItems,
  CloseSidebar,
  handleChangeMetaItem,
  OpenSidebar,
  SearchModeActive,
  SearchModeDeActive,
  SetActiveWs,
  SetNewFilter,
} from "@/redux/features/todoPageConfigSlice";
import { useNavigate } from "react-router-dom";
import { useLazyGetCategoryIndexQuery } from "@/redux/api/categories";
import {
  useChangeBodyMutation,
  useLazyGetTodoIndexQuery,
  useTodoAssignToCategoryMutation,
  useTodoDeleteMutation,
} from "@/redux/api/todos";
import { AppDispatch, RootState } from "@/redux/store";
import { deactiveBlur } from "@/redux/features/settingSlice";
import ShowModalNewCategory from "./TodoModals/newCategory";
import BulkFunction from "./TodoModals/bulkFunction";
import { deselectAllTodos, handlePresentAndFilterTodoLayout, soundPlay } from "@/util/funcs";
import { setOneColAll, setThreeColAll } from "@/redux/features/todoLayoutSlice";
import { useGetActiveWsQuery } from "@/redux/api/workspaces";

const Todos = () => {
  const { todoPageLayout: show } = useSelector(
    (state: RootState) => state.todoLayout
  );

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const {
    filter_by: { filter_name: filterName, filter_data: filterData },
    active_ws: { id: ActiveWorkspaceID },
    drawer: {
      item: { _id: DrawerTodoId },
    },
    sidebar_open: open,
    searchMode,
    meta: Meta,
    layout_nav_show,
    mouse_selected_items,
  } = useSelector((state: RootState) => state.todoPageConfig);
  const { blur, headerPosition, playSound } = useSelector(
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
  const [width,height] = useWindowSize().size;
  const sizeName = useWindowSize().sizeName; 
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
  const UpdateOnlyTodos = () => {
    setTodoList([]);
    console.log("filter : ", filterName, filterData);
    triggerGetTodoIndex({
      wsID: ActiveWorkspaceID,
      filter_by: filterName,
      ...(filterName === "category" && { category: filterData?.id }),
      ...(filterName === "search" && { searchText: filterData?.text }),
      ...(filterName === "priority" && { priority_level: filterData?.priority_level }),
      ...(filterName === "pagination" && {
        page: filterData.page,
        perPage: filterData.limit,
      }),
    })
      .unwrap()
      .then((resp) => {
        setTodoList(resp?.todos);
        if (resp?.meta?.page && resp?.meta?.limit) {
          const obj = {
            page: +resp?.meta?.page,
            limit: +resp?.meta?.limit,
            total_items: resp?.meta?.total_items,
            total_pages: resp?.meta?.total_pages,
          };
          dispatch(handleChangeMetaItem(obj));
          dispatch(
            SetNewFilter({ filter_name: "pagination", filter_data: obj })
          );
        }
        else if(!filterName){
          const obj = {...Meta , total_items : resp?.todos?.length}
          dispatch(handleChangeMetaItem(obj));
          
        }
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
    if (
      filterName === "pagination" &&
      filterData.page == Meta.page &&
      filterData.limit == Meta.limit
    ) {
      return;
    }

    UpdateOnlyTodos();
  }, [filterData]);

  const DeleteTodoOperation = () => {
    todoDeleteRequest({ id: DrawerTodoId, ws: ActiveWorkspaceID }).unwrap().then((resp)=>{
      Toast(resp?.msg , true ,true , "🗑️")
    
      UpdateTodoAndCategories();
      if (playSound) {
        soundPlay("sound1.wav");
      }
      dispatch(deactiveBlur());
    
    });

  };

  const HandleTodoAssignToCategory = (categoId) => {
    todoAssignRequest({ todoId: DrawerTodoId, categoId }).unwrap()
      .then((resp) => {
        if (playSound) {
          soundPlay("sound6.wav");
        }
        Toast(resp.msg, true, true);
        UpdateTodoAndCategories();
      })
      .catch((error) => {});
  };

  const HandleTodoChangeBody = (todoId: string, todoBody: string) => {
    changeBodyRequest({ todoId, todoBody }).unwrap()
      .then((resp) => {
        Toast(resp?.msg, true, true);

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
        const { id, title } = DataGetActiveWsQuery.activeWorkspace;

        dispatch(SetActiveWs({ id, title }));
      } else {
        Toast(
          "Please first active one workspace then go to todo page",
          false,
          true,
          "⛔"
        );
        navigate("/");
      }
    }
  }, [ActiveWorkspaceID, iSuccessGetActiveWsQuery]);

  const handleChangeMeta = (page: number, perPage: number) => { 
    const obj = { ...Meta, page: page, limit: perPage };
    // dispatch(handleChangeMetaItem(obj));
    dispatch(SetNewFilter({ filter_name: "pagination", filter_data: obj }));
  };

  useHotkeys("alt+n", () =>{ setShowModalAddTodo(true)});
  useHotkeys("alt+c", () =>
    setShowAddCategoryModal({ show: true, state: "add", prevText: "" })
  );
  useHotkeys("ctrl+shift+f", () => {
    dispatch(SetNewFilter({ filter_name: "search" }));
    dispatch(SearchModeActive());
  });

  useEffect(() => {
    if(width && width < 350 ){
      dispatch(setOneColAll());
      return
    }
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


  useEffect(()=>{
    // set new settings when todo page shown

    // check blur 

    dispatch(deactiveBlur());
    


  },[])


  const handleCloseBulkFunctionModal = () => {
    setOpenBulkFunctionModal(false);
    dispatch(clearMouseSelectedItems());
    deselectAllTodos();
  };

  useHotkeys("ctrl+a", (e) => {
    e.preventDefault()
    dispatch(
      AddMouseSelectedItems({
        count: todoList.length,
        entity: "todo",
        items: todoList.map((item) => {
          return { boxTodoId: item._id, innerTodoText: item.body };
        }),
      })
    );
  });


  useHotkeys("ctrl+alt+1", (e) => {
    e.preventDefault()
  handlePresentAndFilterTodoLayout("1col");

  });


  useHotkeys("ctrl+alt+2", (e) => {
    e.preventDefault()
  handlePresentAndFilterTodoLayout("3col" , 2);

  });



  useHotkeys("ctrl+alt+3", (e) => {
    e.preventDefault()

    if(sizeName !== "mobile"){
      handlePresentAndFilterTodoLayout("3col", 3);
    } 

  });



  useHotkeys("ctrl+alt+4", (e) => {
    e.preventDefault() 
  if(sizeName !== "tablet" && sizeName !== "mobile"){
    handlePresentAndFilterTodoLayout("3col", 4);
  }
  });


  useHotkeys("ctrl+alt+5", (e) => {
    e.preventDefault()
    if(sizeName !== "tablet" && sizeName !== "mobile"){
      handlePresentAndFilterTodoLayout("3col", 5);
    }

  });

  useHotkeys("ctrl+alt+6", (e) => {
    
    e.preventDefault()
    if(sizeName !== "laptop" &&  sizeName !== "tablet" && sizeName !== "mobile"){
      handlePresentAndFilterTodoLayout("3col", 6);
    }

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
          style={{ ...(blur.sidebar && { filter: `blur(${blur.size}px)` }) }}
        >
          {open && (
            <Sidebar
              categoryList={categoList}
              totalTodoItems={Meta?.total_items}
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
              {!todoList?.length ? (
                <Box>
                  <EmptyListAnimation text="Empty List 😐" />
                </Box>
              ) : show[0] === "table" ? (
                <TableListTodo todos={todoList} />
              ) : (
                <TodoList
                  todoList={todoList}
                  UpdateTodoAndCategories={UpdateTodoAndCategories}
                />
              )}
            </Box>
            <TodoPageFooter
              setShowModalAddTodo={setShowModalAddTodo}
              meta={Meta}
              handleChangeMeta={handleChangeMeta}
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
      {showModalAddTodo && (
        <ShowModalNewTodo
          setShowModalAddTodo={setShowModalAddTodo}
          UpdateTodoAndCategories={UpdateTodoAndCategories}
        />
      )}

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
