import React, { useContext, useState, useEffect, CSSProperties } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { Card, CardContent, Grid } from "@mui/material";
import { motion } from "framer-motion";
import ThemeContext from "../../context/themeContext";
import Toast from "@utils/toast";
import { useDragDropAssignToCategoryMutation } from "@/redux/api/todos";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setBlurPage } from "@/redux/features/settingSlice";
import { DrawerOpen } from "@/redux/features/todoPageConfigSlice";
import useDebounce from "@hooks/useDebounce";
import { handleCheckPersianAndRemoveHtmlTags, soundPlay } from "@/util/funcs";
import './ckeditor-styles.css'
interface DropResult {
  name: string;
  id: string;
}

const TodoBox = (props: any) => {
  const {
    searchMode,
    searchText,
    mouse_selected_items: EntitySelection,
  } = useSelector((state: RootState) => state.todoPageConfig);
  const { playSound } = useSelector((state: RootState) => state.settings);

  const {
    id,
    categoId,
    flag,
    body,
    todos,
    index,
    UpdateTodoAndCategories,
    priority,
  } = props;

  const [category, setCategory] = useState(categoId ? categoId : "");

  useEffect(() => {
    setCategory(categoId ? categoId : todos[index]?.categoId);
  }, [todos[index].categoId]);

  const theme = useContext(ThemeContext);

  const { todoPageLayout: show } = useSelector(
    (state: RootState) => state.todoLayout
  );
  const dispatch: AppDispatch = useDispatch();
  const [todoBody, setTodoBody] = useState(body);

  const [assignToCategoryRequest, assignToCategoryResponse] =
    useDragDropAssignToCategoryMutation();
  function handleSearchModeShow() {
    if (searchMode && searchText.length > 0) {
      let re = new RegExp(searchText, "gi");

      if (body.indexOf(searchText) === -1) {
        // case sensitive search stuff
        let indexOf = body.toLowerCase().indexOf(searchText.toLowerCase());
        let searchedLength = searchText.length;
        let str = body.substring(indexOf, indexOf + searchedLength);
        const result = body.replace(
          re,
          `<span class="highlighted-todo-text">${str}</span>`
        );
        setTodoBody(result);
      } else {
        const result = body.replace(
          re,
          `<span class="highlighted-todo-text">${searchText}</span>`
        );
        setTodoBody(result);
      }
    } else if (searchMode && !searchText) {
      setTodoBody(body);
    } else if (!searchMode) {
      setTodoBody(body);
    }
  }

  // DeBounce Function
  useDebounce(
    () => {
      if (searchMode) {
        handleSearchModeShow();
      } else {
        setTodoBody(`<span>${body}</span>`);
      }
    },
    [searchMode, searchText],
    600
  );

  const addToCategoryWithDragDrop = (item: any, dropResult: any) => {
    if (category === dropResult.id) {
      Toast("Please drop todo to another category", false, true);
      return;
    }
    if (dropResult?.id == null || dropResult?.id === "other") {
      assignToCategoryRequest({
        todoId: id,
        prevCategoId: category,
        newCategoId: "other",
      })
        .unwrap()
        .then((resp) => {
          if (playSound) {
            soundPlay("sound6.wav");
          }
          Toast(resp.msg, true, true);
          UpdateTodoAndCategories();
        })
        .catch((error) => {});
    } else {
      assignToCategoryRequest({
        todoId: id,
        prevCategoId: category || "",
        newCategoId: dropResult?.id,
      })
        .unwrap()
        .then((resp) => {
          Toast(resp.msg, true, true);
          UpdateTodoAndCategories();
        })
        .catch((error) => {});
    }
  };

  const [{ isDragging }, drag ,preview] = useDrag(
    () => ({
      type: "todo-box",
      item: { todo: category },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        if (item && dropResult) {
          addToCategoryWithDragDrop(item, dropResult);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [category]
  );
  const opacity = isDragging ? 0.4 : 1;

  const getStyle = (isDragging: boolean): CSSProperties => {
    return {
      border: isDragging ? "2px dashed var(--borders)" : "unset",
      opacity,
      background:
        flag === "isDone"
          ? "rgb(175 209 179 / 57%)"
          : isDragging
          ? "gray"
          : theme.isDarkMode
          ? "rgb(55, 66, 109)"
          : "white",
    };
  };

 
  const [isPersian, setIsPersian] = useState(handleCheckPersianAndRemoveHtmlTags(todoBody))
  useEffect(()=>{
    setIsPersian(handleCheckPersianAndRemoveHtmlTags(todoBody))
  } , [todoBody])


  const todoCardDragImageSrc = `${process.env.REACT_APP_BASE_URL}/assets/icons/todo-128.png`
 


  return (
    <Grid
      key={index}
      item
      xs={
        show[0] === "1col"
          ? 12
          : show[2] === 2
          ? 6
          : show[2] === 3
          ? 4
          : show[2] === 4
          ? 3
          : show[2] === 5
          ? 2.4
          : 2
      }
      className="todo-box-grid"
    >
      <DragPreviewImage connect={preview} src={todoCardDragImageSrc} />
      <Card
        dir={isPersian ? "rtl" : "ltr"}
        box-todo-id={id}
        className={`todo-box`}
        data-testid="box"
        style={getStyle(isDragging)}
        ref={drag}
        onClick={() => {
          dispatch(DrawerOpen({ state: "todo", item: todos[index] }));
          dispatch(setBlurPage());
        }}
      >
        <motion.div
          initial={{ x: isPersian ? 30 : -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.7 }}
          className={
            priority === 2
              ? isPersian ? "priority-highlight-high-fa" : "priority-highlight-high"
              : priority === 1
              ? isPersian ? "priority-highlight-medium-fa" :"priority-highlight-medium"
              : isPersian ? "priority-highlight-low-fa" :"priority-highlight-low"
          }
        ></motion.div>

        <CardContent className={`card-content ${theme.isDarkMode ? "card-content-dark" : "card-content-light" }`}>
          <div
            className={
              flag === "isDone"
                ? `todoBoxDone f-f-r-dongle ${isPersian && "todo-box-text-fa"}`
                : `todoBox f-f-r-dongle ${isPersian && "todo-box-text-fa"}`
            }
            dangerouslySetInnerHTML={{
              __html: todoBody,
            }}
          ></div>
        </CardContent>
      </Card>
    {/* </Grid> */}
    </Grid>
  );
};

export default TodoBox;
