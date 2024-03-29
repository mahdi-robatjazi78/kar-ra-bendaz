import React, { useRef, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TodoBox from "./todoBox";
import Selecto from "react-selecto";
import useDebounce from "@hooks/useDebounce";
import { useDispatch } from "react-redux";
import {
  AddMouseSelectedItems,
  DrawerOpen,
  clearMouseSelectedItems,
} from "@/redux/features/todoPageConfigSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {franc} from 'franc';


const TodoList = (props: any) => {
  const { todoList, UpdateTodoAndCategories } = props;
  const [todoItems, setTodoItems] = useState([]);
  const { todoPageLayout: show } = useSelector(
    (state: RootState) => state.todoLayout
  );
  const { mouse_selected_items: EntitySelection } = useSelector(
    (state: RootState) => state.todoPageConfig
  );
  const dispatch = useDispatch();
  const filter = show[1];
  const [listState, setListState] = useState([]);

  const todoBoxGridRef = useRef(null);

  useEffect(() => {
    if (filter === "done") {
      let result = todoList.filter((item) => {
        if (item.flag === "isDone") {
          return item;
        }
      });
      setTodoItems(result);
    } else {
      setTodoItems(todoList);
    }
  }, [filter, todoList]);

  useDebounce(
    () => {
      if (listState.length > 0 && listState.length === 1) {
        const x = todoList.filter((item) => {
          if (item?._id === listState[0].boxTodoId) {
            return item;
          }
        });

        dispatch(DrawerOpen({ state: "todo", item: x[0] }));
      } else if (listState.length && listState.length > 1) {
        let data = {
          count: listState.length,
          entity: "todo",
          items: listState,
        };
        AddTodosToReduxStore(data);
      }
    },
    [listState.length],
    600
  );

  const AddTodosToReduxStore = (data) => {
    // add mouse selected todos to redux store
    dispatch(AddMouseSelectedItems(data));
  };

  const clearSelectedTodosList = () => {
    // remove all mouse selected todos from redux store
    dispatch(clearMouseSelectedItems());
  };

  useEffect(() => {
    if (
      EntitySelection.entity === "todo" &&
      EntitySelection.count &&
      todoBoxGridRef.current
    ) {
      const listOfTodoBoxElements =
        todoBoxGridRef.current.getElementsByClassName("todo-box");

      for (const l of listOfTodoBoxElements) {
        const activeBoxElement = l.getAttribute("box-todo-id");

        const result = EntitySelection.items.find(
          (item) =>
            item.boxTodoId === activeBoxElement &&
            !l.classList.contains("mouse-drag-selected")
        );
        if (result?.boxTodoId) {
          l.classList.add("mouse-drag-selected");
        }
      }
    }
  }, [EntitySelection.count, todoBoxGridRef.current]);





  return (
    <Grid container spacing={2} id="todo-grid-list" ref={todoBoxGridRef}>
      {todoItems.map(
        ({ _id, body, flag, categoId, priority }, index: number, array: []) => (
          <TodoBox
            key={_id}
            id={_id}
            body={body}
            priority={priority}
            flag={flag}
            index={index}
            todos={array}
            categoId={categoId}
            UpdateTodoAndCategories={UpdateTodoAndCategories}
          />
        )
      )}

      <Selecto
        // The container to add a selection element
        container={document.body}
        // The area to drag selection element (default: container)
        dragContainer={document.getElementsByClassName("todo-list")[0]}
        // Targets to select. You can register a queryselector or an Element.
        selectableTargets={[".todo-box"]}
        // Whether to select by click (default: true)
        selectByClick={false}
        // Whether to select from the target inside (default: true)
        selectFromInside={false}
        // After the select, whether to select the next target with the selected target (deselected if the target is selected again).
        continueSelect={false}
        // Determines which key to continue selecting the next target via keydown and keyup.
        toggleContinueSelect={"shift"}
        // The container for keydown and keyup events
        keyContainer={window}
        // The rate at which the target overlaps the drag area to be selected. (default: 100)
        hitRate={100}
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.add("mouse-drag-selected");
          });

          if (e.selected.length) {
            const list = e.selected.map((el) => {
              const boxTodoId = el.getAttribute("box-todo-id");
              const spanElement = el.querySelector("span");
              const innerTodoText =
                spanElement?.textContent || spanElement?.innerText || "y";
              return { boxTodoId, innerTodoText };
            });
            setListState(list);
          } else {
            // clearSelectedTodosList();
          }

          // e.removed.forEach((el) => {
          //   el.classList.remove("mouse-drag-selected");
          // });
        }}
      />
    </Grid>
  );
};

export default TodoList;
