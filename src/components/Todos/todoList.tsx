import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TodoBox from "./todoBox";
import { TodoContext } from "@context/todoContext";
import Selecto from "react-selecto";

const TodoList = (props: any) => {
  const { todoList, UpdateTodoAndCategories } = props;
  const [todoItems, setTodoItems] = useState([]);
  const { show } = useContext(TodoContext);

  const filter = show[1];

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

  return (
    <Grid container spacing={2} id="todo-grid-list">
      {todoItems.map(
        ({ _id, body, flag, categoId }, index: number, array: []) => (
          <TodoBox
            key={_id}
            id={_id}
            body={body}
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
        dragContainer={window}
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
          e.removed.forEach((el) => {
            el.classList.remove("mouse-drag-selected");
          });
        }}
      />
    </Grid>
  );
};

export default TodoList;
