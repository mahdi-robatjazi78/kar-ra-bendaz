import React, { useContext, useState, useEffect, CSSProperties } from "react";
import { useDrag } from "react-dnd";
import { Card, CardContent, Grid } from "@mui/material";

import ThemeContext from "../../context/themeContext";
import Toast from "@utils/toast";
import { useDragDropAssignToCategoryMutation } from "@/redux/api/todos";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setBlurPage } from "@/redux/features/settingSlice";
import { DrawerOpen } from "@/redux/features/todoPageConfigSlice";
import useDebounce from "@hooks/useDebounce";
import { soundPlay } from "@/util/funcs";

export interface BoxProps {
  name: string;
}

interface DropResult {
  name: string;
  id: string;
}

const TodoBox = (props: any) => {
  const { searchMode, searchText } = useSelector(
    (state: RootState) => state.todoPageConfig
  );
  const { playSound } = useSelector((state: RootState) => state.settings);

  const { id, categoId, flag, body, todos, index, UpdateTodoAndCategories } =
    props;

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
        .then((resp) => {
          if (playSound) {
            soundPlay("sound6.wav");
          }
          Toast(resp.data.msg, true, true);
          UpdateTodoAndCategories();
        })
        .catch((error) => {});
    } else {
      assignToCategoryRequest({
        todoId: id,
        prevCategoId: category || "",
        newCategoId: dropResult?.id,
      })
        .then((resp) => {
          Toast(resp.data.msg, true, true);
          UpdateTodoAndCategories();
        })
        .catch((error) => {});
    }
  };

  const [{ isDragging }, drag] = useDrag(
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
          ? "rgb(163, 206, 168)"
          : isDragging
          ? "gray"
          : theme.isDarkMode
          ? "rgb(107, 125, 179)"
          : "white",
    };
  };

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
      <Card
        box-todo-id={id}
        className="todo-box"
        data-testid="box"
        style={getStyle(isDragging)}
        ref={drag}
        onClick={() => {
          dispatch(DrawerOpen({ state: "todo", item: todos[index] }));
          dispatch(setBlurPage());
        }}
      >
        <CardContent
          style={{
            position: "relative",
            wordWrap: "break-word",
          }}
        >
          <div
            className={
              flag === "isDone"
                ? `todoBoxDone f-f-r-dongle`
                : "todoBox f-f-r-dongle"
            }
            dangerouslySetInnerHTML={{
              __html: todoBody,
            }}
          ></div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TodoBox;
